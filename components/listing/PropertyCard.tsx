'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyCardProps {
    id: string;
    title: string;
    location: string;
    price: string;
    area: string;
    rating: number;
    imageUrls: string[];
    showChat?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
    id,
    title,
    location,
    price,
    area,
    rating,
    imageUrls,
    showChat = false,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef<boolean>(false);
    const isDraggingRef = useRef<boolean>(false);
    const wasDraggingRef = useRef<boolean>(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const hasMultipleImages = imageUrls.length > 1;
    
    // Create infinite loop array: [last, ...all, first]
    const carouselImages = hasMultipleImages 
        ? [imageUrls[imageUrls.length - 1], ...imageUrls, imageUrls[0]]
        : imageUrls;

    // Calculate real index from carousel index (accounting for duplicates)
    const getRealIndex = useCallback((carouselIndex: number): number => {
        if (!hasMultipleImages) return 0;
        if (carouselIndex === 0) return imageUrls.length - 1; // Duplicate last -> real last
        if (carouselIndex === carouselImages.length - 1) return 0; // Duplicate first -> real first
        return carouselIndex - 1; // Normal images
    }, [hasMultipleImages, imageUrls.length, carouselImages.length]);

    // Get current real index from scroll position
    const getCurrentRealIndex = useCallback((): number => {
        if (!scrollContainerRef.current || !hasMultipleImages) return 0;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const imageWidth = container.offsetWidth;
        const carouselIndex = Math.round(scrollLeft / imageWidth);
        return getRealIndex(carouselIndex);
    }, [hasMultipleImages, getRealIndex]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Initialize scroll position to first real image (index 1 in carousel)
    useEffect(() => {
        if (scrollContainerRef.current && hasMultipleImages) {
            const imageWidth = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollLeft = imageWidth; // Start at first real image
        }
    }, [hasMultipleImages]);

    // Core infinite-loop jump: snap to real image when at duplicate (no drag handling)
    const applyInfiniteLoopJump = useCallback(() => {
        if (!scrollContainerRef.current || !hasMultipleImages || isScrollingRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const imageWidth = container.offsetWidth;
        const carouselIndex = Math.round(scrollLeft / imageWidth);

        if (carouselIndex === 0) {
            isScrollingRef.current = true;
            container.scrollLeft = (carouselImages.length - 2) * imageWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 10);
        } else if (carouselIndex === carouselImages.length - 1) {
            isScrollingRef.current = true;
            container.scrollLeft = imageWidth;
            setTimeout(() => { isScrollingRef.current = false; }, 10);
        }
    }, [hasMultipleImages, carouselImages.length]);

    // Handle infinite loop: defer to applyInfiniteLoopJump, with drag guard and retry after drag
    const handleInfiniteLoop = useCallback(() => {
        if (!scrollContainerRef.current || !hasMultipleImages || isScrollingRef.current) return;
        if (isDraggingRef.current) {
            wasDraggingRef.current = true;
            return;
        }
        if (wasDraggingRef.current) {
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                wasDraggingRef.current = false;
                applyInfiniteLoopJump();
            }, 100);
            return;
        }
        applyInfiniteLoopJump();
    }, [hasMultipleImages, applyInfiniteLoopJump]);

    // Update current index from scroll
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || !hasMultipleImages) return;

        const handleScroll = () => {
            if (isScrollingRef.current) return;
            const realIndex = getCurrentRealIndex();
            setCurrentImageIndex(realIndex);
            
            // Check for infinite loop after scroll settles
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                handleInfiniteLoop();
            }, 50);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, [hasMultipleImages, getCurrentRealIndex, handleInfiniteLoop]);

    // Navigate to next/previous with smooth scroll
    const navigate = useCallback((direction: 'next' | 'prev') => {
        if (!scrollContainerRef.current || !hasMultipleImages) return;
        
        const container = scrollContainerRef.current;
        const imageWidth = container.offsetWidth;
        const currentScroll = container.scrollLeft;
        const currentCarouselIndex = Math.round(currentScroll / imageWidth);
        
        isScrollingRef.current = true;
        
        if (direction === 'next') {
            container.scrollTo({
                left: (currentCarouselIndex + 1) * imageWidth,
                behavior: 'smooth'
            });
        } else {
            container.scrollTo({
                left: (currentCarouselIndex - 1) * imageWidth,
                behavior: 'smooth'
            });
        }
        
        setTimeout(() => {
            isScrollingRef.current = false;
            handleInfiniteLoop();
        }, 300);
    }, [hasMultipleImages, handleInfiniteLoop]);

    // Go to specific image index
    const goToImage = useCallback((index: number) => {
        if (!scrollContainerRef.current || !hasMultipleImages) return;
        
        const container = scrollContainerRef.current;
        const imageWidth = container.offsetWidth;
        const carouselIndex = index + 1; // +1 because first image is duplicate
        
        isScrollingRef.current = true;
        container.scrollTo({
            left: carouselIndex * imageWidth,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            isScrollingRef.current = false;
        }, 300);
    }, [hasMultipleImages]);

    // Simple drag handlers - let native scroll handle it
    const handlePointerDown = () => {
        if (!hasMultipleImages) return;
        isDraggingRef.current = true;
        wasDraggingRef.current = false;
        setIsDragging(true);
    };

    const handlePointerUp = () => {
        isDraggingRef.current = false;
        setIsDragging(false);
        // After drag ends, wait a bit then check for infinite loop
        setTimeout(() => {
            wasDraggingRef.current = false;
            handleInfiniteLoop();
        }, 150);
    };

    return (
        <Link href={`/product/${id}`} className="flex flex-col group cursor-pointer relative gap-3">
            {/* Image Container - Scrollable on mobile */}
            <div 
                ref={scrollContainerRef}
                className={`relative aspect-4/3 w-full rounded-xl bg-gray-200 ${
                    hasMultipleImages 
                        ? 'overflow-x-auto scrollbar-hide md:overflow-hidden' 
                        : 'overflow-hidden'
                } ${hasMultipleImages ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-pointer'}`}
                style={{
                    scrollSnapType: hasMultipleImages ? 'x mandatory' : 'none',
                    WebkitOverflowScrolling: 'touch',
                }}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                <div 
                    className="flex h-full"
                    style={{
                        width: hasMultipleImages ? `${carouselImages.length * 100}%` : '100%',
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    {carouselImages.map((url, index) => (
                        <div
                            key={`${index}-${url}`}
                            className="relative w-full h-full shrink-0"
                            style={{
                                width: hasMultipleImages ? `${100 / carouselImages.length}%` : '100%',
                                scrollSnapAlign: 'start',
                            }}
                        >
                            <Image
                                src={url}
                                alt={`${title} - Image ${getRealIndex(index) + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows - Desktop only */}
                {hasMultipleImages && (
                    <>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate('prev');
                            }}
                            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-110 cursor-pointer"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={18} className="text-gray-800" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate('next');
                            }}
                            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 hover:scale-110 cursor-pointer"
                            aria-label="Next image"
                        >
                            <ChevronRight size={18} className="text-gray-800" />
                        </button>
                    </>
                )}

                {/* Overlay Icons (Top Right) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="bg-white/80 backdrop-blur-xs p-1.5 rounded-full hover:bg-white transition-colors text-red-500"
                        aria-label="Add to favorites"
                    >
                        <Heart size={16} fill="currentColor" />
                    </button>
                    <button 
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="bg-white/80 backdrop-blur-xs p-1.5 rounded-full hover:bg-white transition-colors text-gray-700"
                        aria-label="Share property"
                    >
                        <Share2 size={16} />
                    </button>
                </div>

                {/* Image Counter - Top Left */}
                {hasMultipleImages && (
                    <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full z-10">
                        {currentImageIndex + 1} / {imageUrls.length}
                    </div>
                )}
            </div>

            {/* Carousel Indicators - Below image container */}
            {hasMultipleImages && (
                <div className="flex items-center justify-center gap-2 mt-2">
                    {/* Previous Arrow - Large screens only */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate('prev');
                        }}
                        className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 hover:text-gray-900 cursor-pointer"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    
                    {/* Indicator Dots */}
                    <div className="flex items-center gap-1.5">
                        {imageUrls.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    goToImage(index);
                                }}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${
                                    currentImageIndex === index
                                        ? 'w-2.5 h-2.5 bg-slate-800 shadow-md scale-110'
                                        : 'w-2 h-2 bg-gray-300 hover:bg-gray-400 shadow-sm'
                                }`}
                                aria-label={`Go to image ${index + 1} of ${imageUrls.length}`}
                            />
                        ))}
                    </div>
                    
                    {/* Next Arrow - Large screens only */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigate('next');
                        }}
                        className="hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700 hover:text-gray-900 cursor-pointer"
                        aria-label="Next image"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            )}

            {/* Content Container */}
            <div className={`flex flex-col gap-1 cursor-pointer ${hasMultipleImages ? 'mt-3' : ''}`}>
                {/* Title and Rating */}
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 line-clamp-1">{title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                        <Star size={14} className="fill-black text-black" />
                        <span className="text-sm font-bold text-gray-900">{rating}</span>
                    </div>
                </div>

                {/* Location */}
                <p className="text-sm text-gray-500 truncate">{location}</p>

                {/* Price and Area Row */}
                <div className="flex justify-between items-center mt-1">
                    <div className="text-sm">
                        <span className="font-bold text-gray-900">XAF {price}</span>
                        <span className="text-gray-500 text-xs"> onwards</span>
                        <span className="text-gray-300 mx-1">|</span>
                        <span className="text-gray-500 text-xs">{area}</span>
                    </div>

                    {/* Chat Button (Conditional) */}
                    {showChat && (
                        <button className="bg-slate-800 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-slate-700 transition-colors">
                            <MessageSquare size={12} />
                            <span className="text-xs font-medium">Chat</span>
                        </button>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
