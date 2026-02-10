'use client';

import React from 'react';
import { MapPin, Plus, Minus, Users } from 'lucide-react';
import type { PropertyWithImages } from '@/lib/api';
import { formatPropertyLocation } from '@/lib/mock-data/properties';

interface PropertyMapProps {
    property: PropertyWithImages;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property }) => {
    const location = formatPropertyLocation(property);
    return (
        <section className="py-8">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Location on Map</h2>
                    <p className="text-sm text-gray-600">{property.address ?? location}</p>
                </div>
                
                {/* Map Container */}
                <div className="relative w-full h-[500px] bg-gray-100">
                    {/* Placeholder for map - In production, use Google Maps, Mapbox, etc. */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <MapPin size={48} className="text-slate-800 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">Map View</p>
                            <p className="text-sm text-gray-500 mt-2">Interactive map would be displayed here</p>
                        </div>
                    </div>
                    
                    {/* Map Controls - Top Right */}
                    <div className="absolute top-4 right-4 bg-white rounded-lg border border-gray-200 p-3 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <Users size={16} className="text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Public Transport</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                                <Plus size={16} className="text-gray-600" />
                            </button>
                            <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 transition-colors cursor-pointer">
                                <Minus size={16} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertyMap;
