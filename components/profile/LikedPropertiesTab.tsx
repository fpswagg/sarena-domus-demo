'use client';

import React from 'react';
import PropertyCard from '@/components/listing/PropertyCard';
import {
  PROPERTIES,
  formatPropertyLocation,
  formatPropertyPrice,
  getPropertyImageUrls,
} from '@/lib/mock-data/properties';
import { List, LayoutGrid } from 'lucide-react';

const LikedPropertiesTab = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium text-gray-800">{PROPERTIES.length} Entries</h2>

                <div className="flex gap-2 text-gray-400">
                    <button className="hover:text-gray-800 transition-colors p-1">
                        <List size={24} />
                    </button>
                    <button className="text-gray-800 transition-colors p-1">
                        <LayoutGrid size={24} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {PROPERTIES.map((property) => (
                    <PropertyCard
                        key={property.id}
                        id={property.id}
                        title={property.title}
                        location={formatPropertyLocation(property)}
                        price={formatPropertyPrice(property.price, property.currency)}
                        area={property.area_sqm != null ? `${property.area_sqm} sqm` : '—'}
                        rating={0}
                        imageUrls={getPropertyImageUrls(property)}
                        showChat={true}
                    />
                ))}
            </div>
        </div>
    );
};

export default LikedPropertiesTab;
