'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, MapPin, Home, X, ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const CITIES = ['Yaoundé', 'Douala'];
const PROPERTY_TYPES = [
    { label: 'All types', value: '' },
    { label: 'Apartment', value: 'apartment' },
    { label: 'House', value: 'house' },
    { label: 'Villa', value: 'villa' },
    { label: 'Studio', value: 'studio' },
    { label: 'Duplex', value: 'duplex' },
    { label: 'Land', value: 'land' },
    { label: 'Commercial', value: 'commercial' },
];

const Search = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initialise from URL when on the search page
    const isSearchPage = pathname === '/search';
    const urlQ = (isSearchPage ? searchParams.get('q') : '') ?? '';
    const urlCity = (isSearchPage ? searchParams.get('city') : '') ?? '';
    const urlPropertyType = (isSearchPage ? searchParams.get('property_type') : '') ?? '';

    const [searchQuery, setSearchQuery] = useState(urlQ);
    const [city, setCity] = useState(urlCity || '');
    const [propertyType, setPropertyType] = useState(urlPropertyType || '');

    // Dropdowns
    const [cityOpen, setCityOpen] = useState(false);
    const [typeOpen, setTypeOpen] = useState(false);

    // Mobile
    const [isExpanded, setIsExpanded] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const desktopInputRef = useRef<HTMLInputElement>(null);

    // Sync from URL when search params change (e.g. back/forward navigation)
    useEffect(() => {
        if (isSearchPage) {
            setSearchQuery(searchParams.get('q') ?? '');
            setCity(searchParams.get('city') ?? '');
            setPropertyType(searchParams.get('property_type') ?? '');
        }
    }, [isSearchPage, searchParams]);

    // Close mobile when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };
        if (isExpanded) {
            document.addEventListener('mousedown', handleClickOutside);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isExpanded]);

    // Close dropdowns and mobile panel on ESC
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setCityOpen(false);
                setTypeOpen(false);
                setIsExpanded(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const close = () => { setCityOpen(false); setTypeOpen(false); };
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[data-dropdown]')) close();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    /** Build the /search URL with current filter state + text */
    function buildSearchUrl(overrides?: { q?: string; city?: string; property_type?: string }) {
        const params = isSearchPage ? new URLSearchParams(searchParams.toString()) : new URLSearchParams();
        const q = overrides?.q ?? searchQuery;
        const c = overrides?.city ?? city;
        const pt = overrides?.property_type ?? propertyType;

        // Set or delete each param
        if (q.trim()) params.set('q', q.trim()); else params.delete('q');
        if (c.trim()) params.set('city', c.trim()); else params.delete('city');
        if (pt.trim()) params.set('property_type', pt.trim()); else params.delete('property_type');

        const qs = params.toString();
        return qs ? `/search?${qs}` : '/search';
    }

    /** Navigate to /search with current filters */
    function navigate(overrides?: { q?: string; city?: string; property_type?: string }) {
        const url = buildSearchUrl(overrides);
        router.push(url);
        setIsExpanded(false);
    }

    const handleDesktopSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate();
    };

    const handleMobileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate();
    };

    const handleCitySelect = (c: string) => {
        setCity(c);
        setCityOpen(false);
        // If on search page, navigate immediately
        if (isSearchPage) navigate({ city: c });
    };

    const handleTypeSelect = (t: string) => {
        setPropertyType(t);
        setTypeOpen(false);
        if (isSearchPage) navigate({ property_type: t });
    };

    const propertyTypeLabel = PROPERTY_TYPES.find(t => t.value === propertyType)?.label ?? 'All types';

    return (
        <>
            {/* Desktop Search Bar */}
            <form
                onSubmit={handleDesktopSubmit}
                className="hidden md:flex items-center bg-gray-100 rounded-full p-1.5 shadow-sm border border-gray-200 w-full max-w-3xl"
            >
                {/* City Dropdown */}
                <div className="relative shrink-0" data-dropdown>
                    <button
                        type="button"
                        onClick={() => { setCityOpen(!cityOpen); setTypeOpen(false); }}
                        className="flex items-center gap-2 px-3 lg:px-4 py-1.5 border-r border-gray-300 cursor-pointer hover:bg-gray-200 rounded-l-full transition-colors"
                    >
                        <MapPin size={16} className="text-gray-500 shrink-0" />
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            {city || 'City'}
                        </span>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {cityOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[160px] overflow-hidden">
                            <button
                                type="button"
                                onClick={() => handleCitySelect('')}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${city === '' ? 'bg-slate-50 text-slate-900 font-medium' : 'text-gray-700'}`}
                            >
                                All cities
                            </button>
                            {CITIES.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => handleCitySelect(c)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${city === c ? 'bg-slate-50 text-slate-900 font-medium' : 'text-gray-700'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Property Type Dropdown */}
                <div className="relative shrink-0" data-dropdown>
                    <button
                        type="button"
                        onClick={() => { setTypeOpen(!typeOpen); setCityOpen(false); }}
                        className="flex items-center gap-2 px-3 lg:px-4 py-1.5 border-r border-gray-300 cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                        <Home size={16} className="text-gray-500 shrink-0" />
                        <span className="text-sm font-medium text-gray-700 whitespace-nowrap hidden xl:inline">
                            {propertyTypeLabel}
                        </span>
                        <span className="text-sm font-medium text-gray-700 xl:hidden">
                            {propertyTypeLabel.split('/')[0].trim()}
                        </span>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${typeOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {typeOpen && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-30 min-w-[180px] overflow-hidden">
                            {PROPERTY_TYPES.map((t) => (
                                <button
                                    key={t.value}
                                    type="button"
                                    onClick={() => handleTypeSelect(t.value)}
                                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors cursor-pointer ${propertyType === t.value ? 'bg-slate-50 text-slate-900 font-medium' : 'text-gray-700'}`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Text Input */}
                <div className="flex-1 min-w-[100px] px-2 lg:px-3">
                    <input
                        ref={desktopInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search properties…"
                        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                </div>

                {/* Clear + Search Buttons */}
                {searchQuery && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery('');
                            desktopInputRef.current?.focus();
                        }}
                        className="p-1.5 hover:bg-gray-200 rounded-full transition-colors shrink-0 mr-1"
                        aria-label="Clear search"
                    >
                        <X size={14} className="text-gray-500" />
                    </button>
                )}
                <button
                    type="submit"
                    className="flex items-center gap-1 lg:gap-2 bg-slate-800 text-white px-3 lg:px-5 py-2 rounded-full hover:bg-slate-700 transition-colors shrink-0"
                >
                    <span className="text-sm font-medium hidden lg:inline">Search</span>
                    <SearchIcon size={16} className="shrink-0" />
                </button>
            </form>

            {/* Mobile Search - Icon Button + Slide-down Panel */}
            <div className="md:hidden relative" ref={searchRef}>
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white rounded-full px-4 py-2 sm:px-5 sm:py-2.5 transition-all duration-200 shadow-md hover:shadow-lg border border-slate-700 hover:border-slate-600 min-w-[100px] sm:min-w-[140px] group"
                    aria-label="Search properties"
                >
                    <SearchIcon size={18} className="sm:w-5 sm:h-5 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-base font-medium hidden min-[375px]:inline">Search</span>
                </button>

                {isExpanded && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/20 z-40"
                            onClick={() => { setIsExpanded(false); }}
                        />
                        <div className="fixed left-0 right-0 top-[60px] sm:top-[64px] md:top-[72px] bg-white border-b border-gray-200 shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
                            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3">
                                {/* Text search */}
                                <form onSubmit={handleMobileSubmit} className="flex items-center gap-2 bg-gray-100 rounded-full p-2 sm:p-2.5 shadow-sm border border-gray-200">
                                    <div className="flex-1 flex items-center gap-2 min-w-0">
                                        <SearchIcon size={18} className="text-gray-500 shrink-0 ml-1" />
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search properties…"
                                            className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 min-w-0"
                                        />
                                    </div>
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => { setSearchQuery(''); inputRef.current?.focus(); }}
                                            className="p-2 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-colors shrink-0"
                                            aria-label="Clear"
                                        >
                                            <X size={16} className="text-gray-500" />
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="bg-slate-800 text-white px-4 py-2 rounded-full hover:bg-slate-700 active:bg-slate-900 transition-colors shrink-0 font-medium text-sm"
                                    >
                                        Search
                                    </button>
                                </form>

                                {/* Quick filters row */}
                                <div className="flex flex-wrap gap-2">
                                    {/* City chips */}
                                    {CITIES.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => { setCity(c === city ? '' : c); }}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${city === c ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                                        >
                                            <MapPin size={14} />
                                            {c}
                                        </button>
                                    ))}
                                    {/* Property type chips */}
                                    {PROPERTY_TYPES.filter(t => t.value).slice(0, 4).map((t) => (
                                        <button
                                            key={t.value}
                                            type="button"
                                            onClick={() => { setPropertyType(t.value === propertyType ? '' : t.value); }}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${propertyType === t.value ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                                        >
                                            <Home size={14} />
                                            {t.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Close */}
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsExpanded(false)}
                                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Search;
