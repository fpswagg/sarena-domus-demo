'use client';

import React, { useState } from 'react';
import { MapPin, Home, DollarSign, User, X, ChevronDown } from 'lucide-react';

export type ListingType = 'all' | 'rental' | 'buy';

export type FilterType = 'location' | 'propertyType' | 'price' | 'agent' | 'custom';

export interface FilterChip {
    id: string;
    type: FilterType;
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface SortOption {
    value: string;
    label: string;
}

export interface SearchRefinementProps {
    listingType?: ListingType;
    onListingTypeChange?: (type: ListingType) => void;
    filters?: FilterChip[];
    onFilterRemove?: (filterId: string) => void;
    sortOptions?: SortOption[];
    selectedSort?: string;
    onSortChange?: (sortValue: string) => void;
    className?: string;
}

const SearchRefinement: React.FC<SearchRefinementProps> = ({
    listingType = 'all',
    onListingTypeChange,
    filters = [],
    onFilterRemove,
    sortOptions = [
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
    ],
    selectedSort,
    onSortChange,
    className = '',
}) => {
    const [isSortOpen, setIsSortOpen] = useState(false);

    const handleListingTypeClick = (type: ListingType) => {
        if (onListingTypeChange) {
            onListingTypeChange(type);
        }
    };

    const handleFilterRemove = (filterId: string) => {
        if (onFilterRemove) {
            onFilterRemove(filterId);
        }
    };

    const handleSortSelect = (value: string) => {
        if (onSortChange) {
            onSortChange(value);
        }
        setIsSortOpen(false);
    };

    const getDefaultIcon = (type: FilterType) => {
        const iconClass = "text-gray-500 shrink-0";
        switch (type) {
            case 'location':
                return <MapPin size={16} className={iconClass} />;
            case 'propertyType':
                return <Home size={16} className={iconClass} />;
            case 'price':
                return <DollarSign size={16} className={iconClass} />;
            case 'agent':
                return <User size={16} className={iconClass} />;
            default:
                return null;
        }
    };

    const selectedSortLabel = sortOptions.find(opt => opt.value === selectedSort)?.label || 'Sort By';

    return (
        <section className={`w-full ${className}`}>
            <div className="flex flex-col gap-4 sm:gap-5">
                {/* First Row: Listing Type and Sort */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                    {/* Segmented Control - Listing Type */}
                    <div className="flex items-center bg-white rounded-xl p-1.5 gap-1.5 border border-gray-200 shadow-sm w-full sm:w-auto">
                        {(['all', 'rental', 'buy'] as ListingType[]).map((type) => (
                            <button
                                key={type}
                                onClick={() => handleListingTypeClick(type)}
                                className={`
                                    flex-1 sm:flex-none px-4 py-2.5 sm:py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap
                                    ${
                                        listingType === type
                                            ? 'bg-slate-800 text-white shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                                    }
                                `}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Sort By Dropdown */}
                    <div className="relative w-full sm:w-auto sm:shrink-0">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="w-full sm:w-auto flex items-center justify-between gap-2 bg-white border border-gray-300 rounded-xl px-4 py-2.5 sm:py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:shadow-sm active:bg-gray-100 transition-all duration-200 cursor-pointer"
                        >
                            <span className="truncate">{selectedSortLabel}</span>
                            <ChevronDown
                                size={16}
                                className={`text-gray-500 shrink-0 transition-transform duration-200 ${isSortOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isSortOpen && (
                            <>
                                <div
                                    className="fixed inset-0 z-10 cursor-pointer"
                                    onClick={() => setIsSortOpen(false)}
                                />
                                <div className="absolute right-0 sm:left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-20 min-w-full sm:min-w-[200px] overflow-hidden">
                                    {sortOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSortSelect(option.value)}
                                            className={`
                                                w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer
                                                ${selectedSort === option.value ? 'bg-slate-50 text-slate-900 font-medium' : ''}
                                            `}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Second Row: Filter Chips */}
                {filters.length > 0 && (
                    <div className="w-full">
                        <div className="flex flex-wrap items-center gap-2">
                            {filters.map((filter) => (
                                <div 
                                    key={filter.id} 
                                    className="relative flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2 hover:border-gray-400 hover:shadow-sm active:border-gray-500 transition-all duration-200 group"
                                >
                                    <div className="shrink-0">
                                        {filter.icon || getDefaultIcon(filter.type)}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                        {filter.label}
                                    </span>
                                    {onFilterRemove && (
                                        <button
                                            onClick={() => handleFilterRemove(filter.id)}
                                            className="ml-1 w-5 h-5 rounded-full bg-gray-100 hover:bg-gray-200 active:bg-gray-300 group-hover:bg-slate-100 flex items-center justify-center transition-all duration-200 cursor-pointer shrink-0"
                                            aria-label={`Remove ${filter.label} filter`}
                                        >
                                            <X size={12} className="text-gray-600 group-hover:text-slate-800" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SearchRefinement;
