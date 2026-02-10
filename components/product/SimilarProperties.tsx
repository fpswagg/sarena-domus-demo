'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { PROPERTIES, formatPropertyLocation, formatPropertyPrice, getPropertyImageUrls } from '@/lib/mock-data/properties';

interface SimilarPropertiesProps {
    title: string;
    currentPropertyId?: string;
}

const SimilarProperties: React.FC<SimilarPropertiesProps> = ({ title, currentPropertyId }) => {
    const similarProperties = PROPERTIES
        .filter((p) => p.id !== currentPropertyId)
        .slice(0, 5);
    return (
        <section className="py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
            <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                <div className="flex gap-4 min-w-max">
                    {similarProperties.map((property) => {
                        const imageUrls = getPropertyImageUrls(property);
                        const mainImage = imageUrls[0];
                        return (
                        <Link
                            key={property.id}
                            href={`/product/${property.id}`}
                            className="shrink-0 w-[280px] cursor-pointer group"
                        >
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-200 mb-3">
                                {mainImage && (
                                <Image
                                    src={mainImage}
                                    alt={property.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-sm text-gray-600 line-clamp-1">{property.title}</p>
                                <p className="text-xs text-gray-500">{formatPropertyLocation(property)}</p>
                                <div className="flex items-center gap-1">
                                    <Star size={14} className="fill-black text-black" />
                                    <span className="text-sm font-bold text-gray-900">—</span>
                                </div>
                                <p className="text-sm font-bold text-gray-900">{property.currency} {formatPropertyPrice(property.price)}</p>
                            </div>
                        </Link>
                        );
                    })}
                </div>
            </div>

            <div className="mt-8 flex justify-center">
                <button className="bg-slate-800 text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-slate-700 hover:cursor-pointer transition-colors">
                    Show more
                </button>
            </div>
        </section>
    );
};

export default SimilarProperties;
