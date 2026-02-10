'use client';

import { useCallback, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ListingGrid from '@/components/listing/ListingGrid';
import SearchRefinement, { FilterChip, ListingType } from '@/components/search/SearchRefinement';
import { searchParamsToQuery, queryToSearchParams, type MockSearchQuery } from '@/lib/mock-data/search';
import { useSearchResults } from '@/lib/hooks/useSearchResults';

const SORT_TO_API: Record<string, { sort_by: MockSearchQuery['sort_by']; sort_order: MockSearchQuery['sort_order'] }> = {
  'price-asc': { sort_by: 'price', sort_order: 'asc' },
  'price-desc': { sort_by: 'price', sort_order: 'desc' },
  'newest': { sort_by: 'created_at', sort_order: 'desc' },
  'oldest': { sort_by: 'created_at', sort_order: 'asc' },
};

const API_TO_SORT = (sort_by?: string, sort_order?: string): string => {
  if (sort_by === 'price' && sort_order === 'asc') return 'price-asc';
  if (sort_by === 'price' && sort_order === 'desc') return 'price-desc';
  if (sort_by === 'created_at' && sort_order === 'desc') return 'newest';
  if (sort_by === 'created_at' && sort_order === 'asc') return 'oldest';
  return '';
};

/** Map URL listing_type to UI ListingType */
function urlListingTypeToListingType(listing_type?: 'sale' | 'rent'): ListingType {
  if (listing_type === 'sale') return 'buy';
  if (listing_type === 'rent') return 'rental';
  return 'all';
}

function listingTypeToUrl(listingType: ListingType): 'sale' | 'rent' | undefined {
  if (listingType === 'buy') return 'sale';
  if (listingType === 'rental') return 'rent';
  return undefined;
}

/** Build filter chips from current query for display */
function queryToFilterChips(query: MockSearchQuery): FilterChip[] {
  const chips: FilterChip[] = [];
  let id = 1;
  if (query.q?.trim()) {
    chips.push({ id: 'q', type: 'custom', label: `"${query.q.trim()}"`, value: query.q.trim() });
  }
  if (query.city) {
    chips.push({ id: String(id++), type: 'location', label: query.city, value: query.city });
  }
  if (query.property_type) {
    const label = query.property_type.charAt(0).toUpperCase() + query.property_type.slice(1);
    chips.push({ id: String(id++), type: 'propertyType', label, value: query.property_type });
  }
  if (query.min_price != null || query.max_price != null) {
    const min = query.min_price != null ? `${(query.min_price / 1000).toFixed(0)}k` : '';
    const max = query.max_price != null ? `${(query.max_price / 1000).toFixed(0)}k` : '';
    const label = [min, max].filter(Boolean).join(' - ');
    chips.push({ id: 'price', type: 'price', label, value: `${query.min_price ?? ''}-${query.max_price ?? ''}` });
  }
  return chips;
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const query = useMemo(() => searchParamsToQuery(searchParams), [searchParams]);
  const listingType = useMemo(() => urlListingTypeToListingType(query.listing_type), [query.listing_type]);
  const selectedSort = useMemo(() => API_TO_SORT(query.sort_by, query.sort_order), [query.sort_by, query.sort_order]);
  const filters = useMemo(() => queryToFilterChips(query), [query]);

  const { result, isLoading: isSearchLoading, error: searchError } = useSearchResults(query);

  const updateUrl = useCallback(
    (nextQuery: MockSearchQuery) => {
      const p = queryToSearchParams(nextQuery);
      const s = p.toString();
      const url = s ? `/search?${s}` : '/search';
      startTransition(() => {
        router.replace(url, { scroll: false });
      });
    },
    [router]
  );

  const onListingTypeChange = useCallback(
    (type: ListingType) => {
      const listing_type = listingTypeToUrl(type);
      const next = { ...query };
      if (listing_type) next.listing_type = listing_type;
      else delete next.listing_type;
      updateUrl(next);
    },
    [query, updateUrl]
  );

  const onSortChange = useCallback(
    (sortValue: string) => {
      const api = SORT_TO_API[sortValue];
      const next = { ...query };
      if (api) {
        next.sort_by = api.sort_by;
        next.sort_order = api.sort_order;
      } else {
        delete next.sort_by;
        delete next.sort_order;
      }
      updateUrl(next);
    },
    [query, updateUrl]
  );

  const onFilterRemove = useCallback(
    (filterId: string) => {
      const chip = filters.find((f) => f.id === filterId);
      if (!chip) return;
      const next = { ...query };
      if (filterId === 'q' || chip.type === 'custom') delete next.q;
      if (chip.type === 'location') delete next.city;
      if (chip.type === 'propertyType') delete next.property_type;
      if (chip.type === 'price') {
        delete next.min_price;
        delete next.max_price;
      }
      updateUrl(next);
    },
    [filters, query, updateUrl]
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center">
      <main className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <SearchRefinement
          listingType={listingType}
          onListingTypeChange={onListingTypeChange}
          filters={filters}
          onFilterRemove={onFilterRemove}
          selectedSort={selectedSort}
          onSortChange={onSortChange}
        />

        {(isPending || isSearchLoading) && (
          <div className="py-4 text-sm text-gray-500">Updating…</div>
        )}

        {searchError && (
          <div className="py-4 text-sm text-red-600">
            {searchError.message}
          </div>
        )}

        {result && (
          <>
            <ListingGrid
              title={result.pagination.total === 0 ? 'No properties match your search' : undefined}
              properties={result.data}
              showMore={result.pagination.page < result.pagination.totalPages}
              onShowMore={() => {
                updateUrl({ ...query, page: (query.page ?? 1) + 1 });
              }}
            />
            {result.pagination.total > 0 && (
              <p className="mt-4 text-sm text-gray-500">
                Showing {result.data.length} of {result.pagination.total} properties
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
