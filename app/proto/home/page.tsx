'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  MapPin,
  Building2,
  Home,
  Crown,
  Bed,
  Layers,
  TreePine,
  Store,
  X,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';
import PropertyCard from '@/components/listing/PropertyCard';
import {
  PROPERTIES,
  formatPropertyLocation,
  formatPropertyPrice,
  getPropertyImageUrls,
} from '@/lib/mock-data/properties';

/* ══════════════════════════════════════════════════
   Types
   ══════════════════════════════════════════════════ */

type SuggestionCategory = 'city' | 'neighborhood' | 'property_type' | 'popular';

interface Suggestion {
  id: string;
  label: string;
  category: SuggestionCategory;
  subtitle: string;
  searchUrl: string;
}

/* ══════════════════════════════════════════════════
   Static data — suggestions
   ══════════════════════════════════════════════════ */

const CATEGORY_LABELS: Record<SuggestionCategory, string> = {
  popular: 'Popular searches',
  city: 'Cities',
  neighborhood: 'Neighborhoods',
  property_type: 'Property types',
};

const POPULAR_SUGGESTIONS: Suggestion[] = [
  { id: 'pop-1', label: 'Apartments in Yaoundé', category: 'popular', subtitle: '8 listings', searchUrl: '/search?property_type=apartment&city=Yaound%C3%A9' },
  { id: 'pop-2', label: 'Villas in Douala', category: 'popular', subtitle: '3 listings', searchUrl: '/search?property_type=villa&city=Douala' },
  { id: 'pop-3', label: 'Houses in Yaoundé', category: 'popular', subtitle: '4 listings', searchUrl: '/search?property_type=house&city=Yaound%C3%A9' },
  { id: 'pop-4', label: 'Studios in Douala', category: 'popular', subtitle: '3 listings', searchUrl: '/search?property_type=studio&city=Douala' },
  { id: 'pop-5', label: 'Luxury properties', category: 'popular', subtitle: '6 listings', searchUrl: '/search?q=luxury' },
];

const ALL_SUGGESTIONS: Suggestion[] = [
  /* ── Cities ─────────────────────────────────── */
  { id: 'city-yaounde', label: 'Yaoundé', category: 'city', subtitle: '15 properties', searchUrl: '/search?city=Yaound%C3%A9' },
  { id: 'city-douala', label: 'Douala', category: 'city', subtitle: '10 properties', searchUrl: '/search?city=Douala' },

  /* ── Neighborhoods — Yaoundé ────────────────── */
  { id: 'n-downtown', label: 'Downtown', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Downtown&city=Yaound%C3%A9' },
  { id: 'n-bastos', label: 'Bastos', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Bastos&city=Yaound%C3%A9' },
  { id: 'n-etoa-meki', label: 'Etoa-Meki', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Etoa-Meki&city=Yaound%C3%A9' },
  { id: 'n-nlongkak', label: 'Nlongkak', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Nlongkak&city=Yaound%C3%A9' },
  { id: 'n-essos', label: 'Essos', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Essos&city=Yaound%C3%A9' },
  { id: 'n-mvog-ada', label: 'Mvog-Ada', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Mvog-Ada&city=Yaound%C3%A9' },
  { id: 'n-mendong', label: 'Mendong', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Mendong&city=Yaound%C3%A9' },
  { id: 'n-biyem-assi', label: 'Biyem-Assi', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Biyem-Assi&city=Yaound%C3%A9' },
  { id: 'n-elig-edzoa', label: 'Elig-Edzoa', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Elig-Edzoa&city=Yaound%C3%A9' },
  { id: 'n-odza', label: 'Odza', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Odza&city=Yaound%C3%A9' },
  { id: 'n-nsam', label: 'Nsam', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Nsam&city=Yaound%C3%A9' },
  { id: 'n-ekounou', label: 'Ekounou', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Ekounou&city=Yaound%C3%A9' },
  { id: 'n-mvog-betsi', label: 'Mvog-Betsi', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Mvog-Betsi&city=Yaound%C3%A9' },
  { id: 'n-mvog-mbi', label: 'Mvog-Mbi', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Mvog-Mbi&city=Yaound%C3%A9' },
  { id: 'n-emana', label: 'Emana', category: 'neighborhood', subtitle: 'Yaoundé', searchUrl: '/search?q=Emana&city=Yaound%C3%A9' },

  /* ── Neighborhoods — Douala ─────────────────── */
  { id: 'n-bonanjo', label: 'Bonanjo', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Bonanjo&city=Douala' },
  { id: 'n-akwa', label: 'Akwa', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Akwa&city=Douala' },
  { id: 'n-bonapriso', label: 'Bonapriso', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Bonapriso&city=Douala' },
  { id: 'n-makepe', label: 'Makepe', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Makepe&city=Douala' },
  { id: 'n-deido', label: 'Deido', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Deido&city=Douala' },
  { id: 'n-wouri', label: 'Wouri', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Wouri&city=Douala' },
  { id: 'n-logpom', label: 'Logpom', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Logpom&city=Douala' },
  { id: 'n-kotto', label: 'Kotto', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Kotto&city=Douala' },
  { id: 'n-pk8', label: 'PK8', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=PK8&city=Douala' },
  { id: 'n-bali', label: 'Bali', category: 'neighborhood', subtitle: 'Douala', searchUrl: '/search?q=Bali&city=Douala' },

  /* ── Property types ─────────────────────────── */
  { id: 'type-apartment', label: 'Apartment', category: 'property_type', subtitle: 'Flats & condos', searchUrl: '/search?property_type=apartment' },
  { id: 'type-house', label: 'House', category: 'property_type', subtitle: 'Family homes', searchUrl: '/search?property_type=house' },
  { id: 'type-villa', label: 'Villa', category: 'property_type', subtitle: 'Luxury living', searchUrl: '/search?property_type=villa' },
  { id: 'type-studio', label: 'Studio', category: 'property_type', subtitle: 'Compact spaces', searchUrl: '/search?property_type=studio' },
  { id: 'type-duplex', label: 'Duplex', category: 'property_type', subtitle: 'Two-level homes', searchUrl: '/search?property_type=duplex' },
  { id: 'type-land', label: 'Land', category: 'property_type', subtitle: 'Build your dream', searchUrl: '/search?property_type=land' },
  { id: 'type-commercial', label: 'Commercial', category: 'property_type', subtitle: 'Business spaces', searchUrl: '/search?property_type=commercial' },
];

/* ══════════════════════════════════════════════════
   Static data — property type cards
   ══════════════════════════════════════════════════ */

const PROPERTY_TYPES_UI = [
  { type: 'apartment', label: 'Apartment', subtitle: '12 listings', Icon: Building2, bg: 'bg-blue-50/60', hoverBg: 'hover:bg-blue-50', hoverBorder: 'hover:border-blue-200', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { type: 'house', label: 'House', subtitle: '4 listings', Icon: Home, bg: 'bg-emerald-50/60', hoverBg: 'hover:bg-emerald-50', hoverBorder: 'hover:border-emerald-200', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  { type: 'villa', label: 'Villa', subtitle: '4 listings', Icon: Crown, bg: 'bg-amber-50/60', hoverBg: 'hover:bg-amber-50', hoverBorder: 'hover:border-amber-200', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
  { type: 'studio', label: 'Studio', subtitle: '5 listings', Icon: Bed, bg: 'bg-violet-50/60', hoverBg: 'hover:bg-violet-50', hoverBorder: 'hover:border-violet-200', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
  { type: 'duplex', label: 'Duplex', subtitle: '1 listing', Icon: Layers, bg: 'bg-rose-50/60', hoverBg: 'hover:bg-rose-50', hoverBorder: 'hover:border-rose-200', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
  { type: 'land', label: 'Land', subtitle: 'Coming soon', Icon: TreePine, bg: 'bg-lime-50/60', hoverBg: 'hover:bg-lime-50', hoverBorder: 'hover:border-lime-200', iconBg: 'bg-lime-100', iconColor: 'text-lime-600' },
  { type: 'commercial', label: 'Commercial', subtitle: 'Coming soon', Icon: Store, bg: 'bg-cyan-50/60', hoverBg: 'hover:bg-cyan-50', hoverBorder: 'hover:border-cyan-200', iconBg: 'bg-cyan-100', iconColor: 'text-cyan-600' },
];

/* ══════════════════════════════════════════════════
   Static data — featured properties & cities
   ══════════════════════════════════════════════════ */

const FEATURED_IDS = ['1', '4', '5', '9', '11', '24'];
const FEATURED = PROPERTIES.filter((p) => FEATURED_IDS.includes(p.id));

const RATINGS: Record<string, number> = {
  '1': 4.9, '4': 4.7, '5': 4.8, '9': 4.6, '11': 4.9, '24': 4.8,
};

const CITY_CARDS = [
  {
    name: 'Yaoundé',
    subtitle: '15 properties available',
    href: '/search?city=Yaound%C3%A9',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Douala',
    subtitle: '10 properties available',
    href: '/search?city=Douala',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const QUICK_PILLS = [
  { label: 'Buy', href: '/search?listing_type=sale' },
  { label: 'Rent', href: '/search?listing_type=rent' },
  { label: 'Yaoundé', href: '/search?city=Yaound%C3%A9', hasIcon: true },
  { label: 'Douala', href: '/search?city=Douala', hasIcon: true },
  { label: 'Apartments', href: '/search?property_type=apartment' },
  { label: 'Villas', href: '/search?property_type=villa' },
];

/* ══════════════════════════════════════════════════
   Suggestion icon helper
   ══════════════════════════════════════════════════ */

function SuggestionIcon({ category }: { category: SuggestionCategory }) {
  switch (category) {
    case 'city':
      return <MapPin size={16} className="text-gray-400 shrink-0" />;
    case 'neighborhood':
      return <MapPin size={16} className="text-gray-400 shrink-0" />;
    case 'property_type':
      return <Building2 size={16} className="text-gray-400 shrink-0" />;
    case 'popular':
      return <TrendingUp size={16} className="text-gray-400 shrink-0" />;
  }
}

/* ══════════════════════════════════════════════════
   Page component
   ══════════════════════════════════════════════════ */

export default function ProtoHomePage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  /* ── Filtered & grouped suggestions ─────────── */
  const { groups, flat } = useMemo(() => {
    let suggestions: Suggestion[];

    if (!query.trim()) {
      suggestions = POPULAR_SUGGESTIONS;
    } else {
      const q = query.toLowerCase();
      suggestions = ALL_SUGGESTIONS.filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.subtitle.toLowerCase().includes(q),
      );
    }

    const categoryOrder: SuggestionCategory[] = [
      'popular',
      'city',
      'neighborhood',
      'property_type',
    ];
    const grouped: { category: SuggestionCategory; items: Suggestion[] }[] = [];

    for (const cat of categoryOrder) {
      const items = suggestions.filter((s) => s.category === cat);
      if (items.length > 0) {
        grouped.push({ category: cat, items: items.slice(0, 6) });
      }
    }

    return { groups: grouped, flat: grouped.flatMap((g) => g.items) };
  }, [query]);

  const showDropdown = isFocused && (flat.length > 0 || query.trim().length > 0);

  /* ── Close on outside click ─────────────────── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Reset highlight when suggestions change ── */
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  /* ── Handlers ───────────────────────────────── */
  const handleSelect = useCallback(
    (suggestion: Suggestion) => {
      setQuery(suggestion.label);
      setIsFocused(false);
      router.push(suggestion.searchUrl);
    },
    [router],
  );

  const handleFreeSearch = useCallback(() => {
    if (!query.trim()) return;
    setIsFocused(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }, [query, router]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown) {
        if (e.key === 'Enter') handleFreeSearch();
        return;
      }

      // +1 for the "Search for …" item at the bottom
      const total = flat.length + (query.trim() ? 1 : 0);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev + 1) % total);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev - 1 + total) % total);
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < flat.length) {
            handleSelect(flat[highlightedIndex]);
          } else {
            handleFreeSearch();
          }
          break;
        case 'Escape':
          setIsFocused(false);
          inputRef.current?.blur();
          break;
      }
    },
    [showDropdown, flat, query, highlightedIndex, handleSelect, handleFreeSearch],
  );

  /* ── Scroll highlighted suggestion into view ── */
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll('[data-suggestion]');
      items[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  /* ── Flat index tracker for grouped rendering ─ */
  let flatIdx = 0;

  /* ═══════════════════════════════════════════════
     Render
     ═══════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Mini Header ──────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors">
              Domus
            </div>
            <span className="text-[13px] font-medium text-gray-400 hidden sm:inline">
              Sarena Domus
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block"
            >
              Browse
            </Link>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-slate-800 hover:text-slate-600 transition-colors px-4 py-1.5 rounded-full border border-gray-200 hover:border-gray-300"
            >
              Sign in
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Hero + Search ────────────────────── */}
      <section className="relative min-h-[78vh] md:min-h-[82vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-12">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-50/80 via-white to-white" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgb(100,116,139) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Content — no z-index so dropdown can escape */}
        <div className="relative w-full max-w-2xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-gray-900 tracking-tight leading-tight mb-4 md:mb-5">
            Where would you
            <br />
            <span className="text-slate-500">like to live?</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 mb-8 md:mb-10 max-w-md mx-auto leading-relaxed">
            Search properties across Cameroon by city, neighborhood, or type
          </p>

          {/* Search Container */}
          <div
            ref={containerRef}
            className={`relative w-full ${showDropdown ? 'z-50' : ''}`}
          >
            {/* Input bar */}
            <div
              className={`flex items-center bg-white rounded-full border px-4 sm:px-5 py-3 sm:py-3.5 transition-all duration-200 ${
                isFocused
                  ? 'border-gray-300 shadow-xl ring-1 ring-gray-200'
                  : 'border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300'
              }`}
            >
              <Search size={20} className="text-gray-400 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!isFocused) setIsFocused(true);
                }}
                onFocus={() => setIsFocused(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search by city, neighborhood, or property type…"
                className="flex-1 bg-transparent outline-none text-[15px] text-gray-900 placeholder-gray-400 min-w-0"
                role="combobox"
                aria-expanded={showDropdown}
                aria-haspopup="listbox"
                aria-controls="search-listbox"
                aria-activedescendant={
                  highlightedIndex >= 0
                    ? `suggestion-${highlightedIndex}`
                    : undefined
                }
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    inputRef.current?.focus();
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors shrink-0 mr-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
              <button
                type="button"
                onClick={handleFreeSearch}
                className="bg-slate-800 text-white px-4 sm:px-5 py-2 rounded-full hover:bg-slate-700 transition-colors shrink-0 text-sm font-medium cursor-pointer"
              >
                Search
              </button>
            </div>

            {/* Suggestion dropdown */}
            {showDropdown && (
              <div
                ref={dropdownRef}
                id="search-listbox"
                role="listbox"
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden max-h-[380px] overflow-y-auto"
              >
                {groups.map((group) => (
                  <div key={group.category}>
                    {/* Category header */}
                    <div className="px-4 pt-3 pb-1.5">
                      <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                        {CATEGORY_LABELS[group.category]}
                      </span>
                    </div>

                    {/* Suggestion items */}
                    {group.items.map((suggestion) => {
                      const idx = flatIdx++;
                      return (
                        <button
                          key={suggestion.id}
                          id={`suggestion-${idx}`}
                          data-suggestion=""
                          type="button"
                          role="option"
                          aria-selected={highlightedIndex === idx}
                          onClick={() => handleSelect(suggestion)}
                          onMouseEnter={() => setHighlightedIndex(idx)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors cursor-pointer ${
                            highlightedIndex === idx
                              ? 'bg-slate-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <SuggestionIcon category={suggestion.category} />
                          <span className="flex-1 text-left text-sm text-gray-900">
                            {suggestion.label}
                          </span>
                          <span className="text-xs text-gray-400 shrink-0">
                            {suggestion.subtitle}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="text-gray-300 shrink-0"
                          />
                        </button>
                      );
                    })}
                  </div>
                ))}

                {/* No matches message */}
                {flat.length === 0 && query.trim() && (
                  <div className="px-4 py-4 text-center text-sm text-gray-400">
                    No matching suggestions
                  </div>
                )}

                {/* Free-text search option */}
                {query.trim() && (
                  <button
                    data-suggestion=""
                    type="button"
                    role="option"
                    aria-selected={highlightedIndex === flat.length}
                    onClick={handleFreeSearch}
                    onMouseEnter={() => setHighlightedIndex(flat.length)}
                    className={`w-full flex items-center gap-3 px-4 py-3 border-t border-gray-100 transition-colors cursor-pointer ${
                      highlightedIndex === flat.length
                        ? 'bg-slate-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Search size={16} className="text-slate-600 shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">
                      Search for &ldquo;{query.trim()}&rdquo;
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-gray-400 ml-auto shrink-0"
                    />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Quick filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 sm:mt-8">
            {QUICK_PILLS.map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 transition-all"
              >
                {pill.hasIcon && <MapPin size={13} />}
                {pill.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Explore by City ──────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Explore by city
            </h2>
            <p className="text-sm text-gray-400 mt-1 hidden sm:block">
              Browse properties in Cameroon&apos;s major cities
            </p>
          </div>
          <Link
            href="/search"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors shrink-0"
          >
            All cities
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {CITY_CARDS.map((city) => (
            <Link
              key={city.name}
              href={city.href}
              className="relative rounded-2xl overflow-hidden h-52 sm:h-60 md:h-72 group"
            >
              <Image
                src={city.image}
                alt={`Properties in ${city.name}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-0.5">
                  {city.name}
                </h3>
                <p className="text-sm text-white/75">{city.subtitle}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                <ArrowUpRight size={16} className="text-gray-800" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Browse by Property Type ──────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Browse by property type
            </h2>
            <p className="text-sm text-gray-400 mt-1 hidden sm:block">
              Find the right space for your needs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {PROPERTY_TYPES_UI.map(
            ({
              type,
              label,
              subtitle,
              Icon,
              bg,
              hoverBg,
              hoverBorder,
              iconBg,
              iconColor,
            }) => (
              <Link
                key={type}
                href={`/search?property_type=${type}`}
                className={`flex flex-col items-center gap-2 md:gap-3 p-4 md:p-6 rounded-2xl border border-gray-100 ${bg} ${hoverBg} ${hoverBorder} transition-all duration-200 group`}
              >
                <div
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon size={22} />
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {label}
                </span>
                <span className="text-xs text-gray-400">{subtitle}</span>
              </Link>
            ),
          )}
        </div>
      </section>

      {/* ─── Featured Properties ──────────────── */}
      <section className="py-12 md:py-16 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Popular properties
              </h2>
              <p className="text-sm text-gray-400 mt-1 hidden sm:block">
                Hand-picked listings you might love
              </p>
            </div>
            <Link
              href="/search"
              className="text-sm font-medium text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors shrink-0"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED.map((property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                location={formatPropertyLocation(property)}
                price={formatPropertyPrice(property.price)}
                area={
                  property.area_sqm != null
                    ? `${property.area_sqm} sqm`
                    : '—'
                }
                rating={RATINGS[property.id] ?? 4.5}
                imageUrls={getPropertyImageUrls(property)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Mini Footer ──────────────────────── */}
      <footer className="py-8 md:py-10 border-t border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-slate-800 text-white px-2 py-1 rounded text-xs font-semibold">
              D
            </div>
            <p className="text-sm text-gray-400">
              &copy; 2026 Sarena Domus
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
