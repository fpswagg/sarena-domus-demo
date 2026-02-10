'use client';

import React from 'react';

const EmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-2xl bg-gray-200 aspect-video rounded-2xl flex items-center justify-center mb-6">
                <span className="text-gray-500 font-bold text-lg tracking-widest">M A S C O T</span>
            </div>
            <p className="text-gray-600 text-lg">
                Looks Empty, Finds some properties you like below / Slogan
            </p>
        </div>
    );
};

export default EmptyState;
