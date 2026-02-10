'use client';

import React from 'react';
import { Bath, Home, Car, Bed, ArrowRight } from 'lucide-react';
import type { PropertyWithImages } from '@/lib/api';
import { formatPropertyLocation, formatPropertyPrice } from '@/lib/mock-data/properties';

interface PropertySpecificationsProps {
    property: PropertyWithImages;
}

const PropertySpecifications: React.FC<PropertySpecificationsProps> = ({ property }) => {
    const location = formatPropertyLocation(property);
    const features = [
        { icon: Bath, label: '2 Baths' },
        { icon: Home, label: '1 Balcony' },
        { icon: Car, label: '1 Covered Parking' },
        { icon: Bed, label: '2 Beds' },
    ];

    return (
        <section className="py-8">
            {/* Short Descriptions */}
            <div className="mb-6">
                <p className="text-gray-700 font-medium mb-2">{property.title}</p>
                <p className="text-gray-600 text-sm">{location}</p>
            </div>

            {/* Key Features Bar */}
            <div className="flex items-center gap-6 py-4 border-y border-gray-200 mb-6">
                {features.map((feature, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && <div className="w-px h-8 bg-gray-200" />}
                        <div className="flex items-center gap-2">
                            <feature.icon size={20} className="text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Detailed Specifications - Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Left Column */}
                <div className="space-y-4">
                    <div>
                        <span className="text-sm text-gray-600">Carpet Area</span>
                        <p className="text-gray-900 font-medium">450 sqft <span className="text-gray-500">($122/sqft)</span></p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Status</span>
                        <p className="text-gray-900 font-medium">Ready to Move</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Car Parking</span>
                        <p className="text-gray-900 font-medium">1 Covered</p>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div>
                        <span className="text-sm text-gray-600">Floor</span>
                        <p className="text-gray-900 font-medium">3 (Out of 4 Floors)</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Lift</span>
                        <p className="text-gray-900 font-medium">1</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Type of Ownership</span>
                        <p className="text-gray-900 font-medium">Freehold</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Transaction Type</span>
                        <p className="text-gray-900 font-medium">New Property</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Furnished Status</span>
                        <p className="text-gray-900 font-medium">Semi-Furnished</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Age of Construction</span>
                        <p className="text-gray-900 font-medium">New Construction</p>
                    </div>
                </div>
            </div>

            {/* More Details Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <span className="text-sm text-gray-600">Price</span>
                        <p className="text-gray-900 font-medium">{property.currency} {formatPropertyPrice(property.price, property.currency)}</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Area</span>
                        <p className="text-gray-900 font-medium">{property.area_sqm != null ? `${property.area_sqm} sqm` : '—'}</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Address</span>
                        <p className="text-gray-900 font-medium">{property.address ?? location}</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Landmarks</span>
                        <p className="text-gray-900 font-medium">Some Landmark</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Furnishing</span>
                        <p className="text-gray-900 font-medium">Semi-Furnished</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Flooring</span>
                        <p className="text-gray-900 font-medium">Vitrified, Marble</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Type of Ownership</span>
                        <p className="text-gray-900 font-medium">Freehold</p>
                    </div>
                </div>
                <button className="mt-6 flex items-center gap-2 text-slate-800 font-medium hover:text-slate-900 transition-colors cursor-pointer">
                    View All Details
                    <ArrowRight size={18} />
                </button>
            </div>
        </section>
    );
};

export default PropertySpecifications;
