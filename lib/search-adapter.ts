/**
 * Adapter to use the real listProperties API for search.
 * Returns the same shape as mock (PropertyWithImages[]) so ListingGrid and URL logic stay unchanged.
 *
 * Usage: In useSearchResults, replace fetchListProperties with fetchSearchResultsFromApi.
 */

import { listProperties } from "@/lib/api";
import type { Property, PropertyWithImages, PropertyImage } from "@/lib/api";
import type { PropertiesQuery } from "@/lib/api";
import type { MockSearchQuery, MockListPropertiesResponse } from "@/lib/mock-data/search";

/** Strip mock-only params (e.g. q) before calling the API. Add q to API when your backend supports it. */
function toApiQuery(query: MockSearchQuery): PropertiesQuery {
  const { q: _q, ...rest } = query;
  return rest;
}

/** Map API Property (has main_image_url, no images[]) to PropertyWithImages for the grid */
function toPropertyWithImages(p: Property): PropertyWithImages {
  const images: PropertyImage[] = p.main_image_url
    ? [
        {
          id: `img-${p.id}`,
          property_id: p.id,
          image_url: p.main_image_url,
          created_at: p.created_at,
        },
      ]
    : [];
  return { ...p, images };
}

/**
 * Fetch search results from the real API. Async; use in useSearchResults.
 * Text search (q) is omitted from the API call until the backend supports it.
 */
export async function fetchSearchResultsFromApi(
  query: MockSearchQuery
): Promise<MockListPropertiesResponse> {
  const apiQuery = toApiQuery(query);
  const res = await listProperties(apiQuery);
  return {
    success: true,
    data: res.data.map(toPropertyWithImages),
    pagination: res.pagination,
  };
}
