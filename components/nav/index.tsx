import React, { Suspense } from 'react';
import Link from 'next/link';
import Search from './Search';
import UserMenu from './UserMenu';

const Navbar = () => {
    return (
        <nav className="w-full bg-white border-b border-gray-100 fixed top-0 left-0 z-50">
            <div className="w-full bg-white py-2.5 px-2.5 sm:py-3 sm:px-4 md:py-4 md:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
                    {/* Logo Section */}
                    <Link href="/" className="shrink-0 z-10">
                        <div className="bg-slate-800 text-white px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm lg:text-lg font-medium whitespace-nowrap hover:bg-slate-700 transition-colors">
                            Domus
                        </div>
                    </Link>

                    {/* Search Section (Center) - Desktop */}
                    <div className="hidden md:flex flex-1 justify-center max-w-3xl min-w-0">
                        <Suspense fallback={<div className="w-full max-w-3xl h-10 rounded-full bg-gray-100 animate-pulse" />}>
                            <Search />
                        </Suspense>
                    </div>

                    {/* Mobile Search - Centered */}
                    <div className="md:hidden flex-1 flex justify-center">
                        <Suspense fallback={<div className="w-24 h-9 rounded-full bg-gray-100 animate-pulse" />}>
                            <Search />
                        </Suspense>
                    </div>

                    {/* User Actions Section (Right) */}
                    <div className="shrink-0 flex items-center justify-end gap-1.5 sm:gap-2 md:gap-3 z-10">
                        <UserMenu />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
