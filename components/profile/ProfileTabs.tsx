'use client';

import React from 'react';

interface ProfileTabsProps {
    activeTab: 'liked' | 'listings';
    onTabChange: (tab: 'liked' | 'listings') => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                <button
                    onClick={() => onTabChange('liked')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'liked'
                            ? 'bg-[#1a1f2e] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Liked Properties
                </button>
                <button
                    onClick={() => onTabChange('listings')}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'listings'
                            ? 'bg-[#1a1f2e] text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    My Listings
                </button>
            </div>
        </div>
    );
};

export default ProfileTabs;
