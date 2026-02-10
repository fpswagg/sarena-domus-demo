'use client';

import React, { useState } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import LikedPropertiesTab from '@/components/profile/LikedPropertiesTab';
import MyListingsTab from '@/components/profile/MyListingsTab';

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState<'liked' | 'listings'>('liked');

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <ProfileHeader />

                <div className="border-t border-gray-200 my-8"></div>

                <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="mt-8">
                    {activeTab === 'liked' ? <LikedPropertiesTab /> : <MyListingsTab />}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
