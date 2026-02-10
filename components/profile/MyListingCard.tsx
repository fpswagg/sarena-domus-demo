'use client';

import React from 'react';
import Image from 'next/image';
import { Share2, Settings, Play, DollarSign, Star, Eye, Bookmark } from 'lucide-react';
import type { PropertyWithImages } from '@/lib/api';
import { getPropertyImageUrls, formatPropertyPrice } from '@/lib/mock-data/properties';

interface MyListingCardProps {
    listing: PropertyWithImages;
}

const MyListingCard: React.FC<MyListingCardProps> = ({ listing }) => {
    const images = getPropertyImageUrls(listing);
    const postedDate = listing.published_at
        ? new Date(listing.published_at).toLocaleDateString()
        : new Date(listing.created_at).toLocaleDateString();
    const area = listing.area_sqm != null ? `${listing.area_sqm} sqm` : '—';
    const description = listing.description ?? listing.title;
    const rating = 0;
    const reviews = 0;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-6">
            <div className="flex gap-2 w-full md:w-[400px] shrink-0 h-[220px]">
                <div className="relative w-2/3 h-full rounded-xl overflow-hidden group cursor-pointer">
                    {images[0] && (
                    <Image
                        src={images[0]}
                        alt={listing.title}
                        fill
                        className="object-cover"
                    />
                    )}
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50">
                            <Play size={20} className="fill-white text-white ml-1" />
                        </div>
                    </div>
                </div>

                <div className="w-1/3 flex flex-col gap-2 h-full">
                    {images[1] && (
                    <div className="relative h-1/2 w-full rounded-xl overflow-hidden">
                        <Image src={images[1]} alt="Interior" fill className="object-cover" />
                    </div>
                    )}
                    {images[2] && (
                    <div className="relative h-1/2 w-full rounded-xl overflow-hidden">
                        <Image src={images[2]} alt="Detail" fill className="object-cover" />
                    </div>
                    )}
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-6">{listing.title}</h3>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                <DollarSign size={20} className="text-gray-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{listing.currency} {formatPropertyPrice(listing.price, listing.currency)}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                <Eye size={20} className="text-gray-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-700">{description}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                <Star size={20} className="text-gray-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{rating} ({reviews} Reviews)</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                                <Bookmark size={20} className="text-gray-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{listing.listing_type === 'sale' ? 'Sale' : 'Rent'} / {area}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                    <p className="text-xs text-gray-500 font-medium">Posted on {postedDate}</p>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 bg-[#1a1f2e] text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors">
                            <Share2 size={14} />
                            Share
                        </button>
                        <button className="flex items-center gap-2 bg-[#1a1f2e] text-white px-5 py-2 rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors">
                            <Settings size={14} />
                            Modify / Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyListingCard;
