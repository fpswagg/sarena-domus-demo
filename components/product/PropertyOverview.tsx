'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, MapPin, Star, Heart, Share2, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PropertyWithImages } from '@/lib/api';
import { formatPropertyLocation, formatPropertyPrice, getPropertyImageUrls } from '@/lib/mock-data/properties';

interface PropertyOverviewProps {
    property: PropertyWithImages;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const images = getPropertyImageUrls(property);
    const location = formatPropertyLocation(property);
    const priceStr = formatPropertyPrice(property.price, property.currency);
    
    const goToPrevious = () => {
        setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };
    
    const goToNext = () => {
        setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-8">
            {/* Title, Status, Rating Section */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        {property.currency} {priceStr} - {property.title}
                    </h1>
                    <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Check size={18} className="text-slate-800" />
                            <span className="text-sm font-medium">{property.listing_type === 'sale' ? 'Buy' : 'Rent'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin size={18} className="text-slate-800" />
                            <span className="text-sm font-medium">{location}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                            <Star size={18} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-lg font-bold text-gray-900">—</span>
                            <span className="text-sm text-gray-500">(37 Reviews)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                <Image
                                    src="https://i.pravatar.cc/100?img=12"
                                    alt="Agent"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-700">James Webb</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="mb-6">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Image */}
                    <div className="relative aspect-4/3 w-full lg:flex-3 overflow-hidden rounded-xl bg-gray-200 group">
                        <Image
                            src={images[selectedImage]}
                            alt={`${property.title} - Image ${selectedImage + 1}`}
                            fill
                            className="object-cover"
                        />
                        
                        {/* Navigation Arrows - Desktop only */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={goToPrevious}
                                    className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 cursor-pointer"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft size={20} className="text-gray-800" />
                                </button>
                                <button
                                    onClick={goToNext}
                                    className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 hover:scale-110 cursor-pointer"
                                    aria-label="Next image"
                                >
                                    <ChevronRight size={20} className="text-gray-800" />
                                </button>
                            </>
                        )}
                        
                        {/* Image Counter */}
                        {images.length > 1 && (
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm font-medium px-3 py-1.5 rounded-full z-10">
                                {selectedImage + 1} / {images.length}
                            </div>
                        )}
                    </div>

                    {/* Thumbnail Gallery - Side on large screens, horizontal on mobile */}
                    {images.length > 1 && (
                        <div className="lg:w-48 lg:shrink-0">
                            {/* Mobile: Horizontal Scrollable */}
                            <div className="lg:hidden overflow-x-auto p-2 scrollbar-hide">
                                <div className="flex gap-3 min-w-max">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative shrink-0 w-24 h-24 overflow-hidden rounded-lg border-2 transition-all ${
                                                selectedImage === index 
                                                    ? 'border-slate-800 shadow-md scale-105' 
                                                    : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`${property.title} - Thumbnail ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Desktop: Vertical Stack */}
                            <div className="hidden lg:flex flex-col gap-3 h-full max-h-[600px] overflow-y-auto scrollbar-hide p-2">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
                                            selectedImage === index 
                                                ? 'border-slate-800 shadow-md ring-2 ring-slate-800 ring-offset-2' 
                                                : 'border-gray-200 hover:border-gray-400'
                                        }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${property.title} - Thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                {/* Contact Owner Button - Below Main Image */}
                <button className="bg-slate-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-2">
                    <MessageCircle size={18} />
                    Contact Owner
                </button>
                
                {/* Save and Share Buttons - Below Thumbnails */}
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
                        <Heart size={20} />
                        <span className="text-sm font-medium">Save</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer">
                        <Share2 size={20} />
                        <span className="text-sm font-medium">Share</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PropertyOverview;
