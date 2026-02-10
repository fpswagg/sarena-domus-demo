'use client';

import React from 'react';
import PropertyCard from './PropertyCard';
import {
  PROPERTIES,
  formatPropertyLocation,
  formatPropertyPrice,
  getPropertyImageUrls,
} from '@/lib/mock-data/properties';
import type { PropertyWithImages } from '@/lib/api';

export type ListingGridProps = {
  /** Section heading */
  title?: string;
  /**
   * When provided, only these properties are shown (e.g. search/filter results).
   * When omitted, all mock PROPERTIES are shown (default).
   */
  properties?: PropertyWithImages[];
  /** Show "Show more" button (e.g. when paginated). Omit or false to hide. */
  showMore?: boolean;
  onShowMore?: () => void;
};

const ListingGrid = ({
  title = 'Properties',
  properties,
  showMore = false,
  onShowMore,
}: ListingGridProps) => {
  const list = properties ?? PROPERTIES;

  return (
    <section className="py-8">
      {title && (
        <h2 className="text-gray-900 text-2xl font-semibold mb-6">{title}</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {list.map((property) => (
          <PropertyCard
            key={property.id}
            id={property.id}
            title={property.title}
            location={formatPropertyLocation(property)}
            price={formatPropertyPrice(property.price)}
            area={property.area_sqm != null ? `${property.area_sqm} sqm` : '—'}
            rating={0}
            imageUrls={getPropertyImageUrls(property)}
          />
        ))}
      </div>

      {showMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={onShowMore}
            className="bg-slate-900 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-slate-800 hover:cursor-pointer transition-colors"
          >
            Show more
          </button>
        </div>
      )}
    </section>
  );
};

export default ListingGrid;
