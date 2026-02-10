'use client';

import React from 'react';
import MyListingCard from './MyListingCard';
import { MY_LISTINGS } from '@/lib/mock-data/my-listings';
import { ChevronDown, ChevronRight } from 'lucide-react';

const ListingSection = ({ title, count }: { title: string, count: number }) => (
    <div className="flex items-center justify-between py-6 border-b border-gray-100 mb-6 cursor-pointer group">
        <div className="flex items-center gap-3">
            <h3 className="text-xl font-medium text-gray-800">{title} ({count})</h3>
        </div>
        <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gray-200 transition-colors">
            <ChevronDown size={20} className="text-gray-600" />
        </div>
    </div>
);

const MyListingsTab = () => {
    return (
        <div className="flex flex-col gap-8">
            {/* Active List */}
            <section>
                <ListingSection title="Active List" count={4} />
                <div className="flex flex-col gap-6">
                    {MY_LISTINGS.map((listing) => (
                        <MyListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            </section>

            {/* Disabled List */}
            <section className="opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between py-6 border-b border-gray-100 mb-2 cursor-pointer group">
                    <h3 className="text-xl font-medium text-gray-800">Disabled List (4)</h3>
                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                        <ChevronRight size={20} className="text-gray-600" />
                    </div>
                </div>
            </section>

            {/* Drafts */}
            <section className="opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between py-6 border-b border-gray-100 mb-2 cursor-pointer group">
                    <h3 className="text-xl font-medium text-gray-800">Drafts (4)</h3>
                    <div className="bg-gray-100 p-2 rounded-full group-hover:bg-gray-200 transition-colors">
                        <ChevronRight size={20} className="text-gray-600" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyListingsTab;
