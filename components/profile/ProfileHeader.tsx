'use client';

import React from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';

const ProfileHeader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            {/* Avatar Section */}
            <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                    <Image
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Profile Picture"
                        fill
                        className="object-cover"
                    />
                </div>
                {/* Edit Icon */}
                <button className="absolute bottom-1 right-1 bg-[#1a1f2e] text-white p-2 rounded-full border-2 border-white cursor-pointer hover:bg-black transition-colors">
                    <Pencil size={14} />
                </button>
            </div>

            {/* User Info */}
            <div className="text-center mb-8">
                <h1 className="text-xl font-bold text-gray-900">Johannes Gutenberg</h1>
                <p className="text-gray-500 text-sm">Berlin, Germany</p>
                <a href="#" className="text-gray-400 text-xs hover:text-blue-500">thisismylink.com</a>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button className="bg-[#595959] text-white py-2 px-6 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors">
                    Copy My Link
                </button>
                <button className="bg-[#404040] text-white py-2 px-6 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors">
                    Create a Listing
                </button>
                <button className="bg-[#595959] text-white py-2 px-6 rounded-full text-sm font-medium hover:bg-gray-600 transition-colors">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default ProfileHeader;
