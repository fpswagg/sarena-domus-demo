'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Plus, Menu, Home, Search, User, LogIn, X } from 'lucide-react';

const UserMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);


    // Close menu on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMenuOpen]);

    const menuItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/search', label: 'Search', icon: Search },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/sign-in', label: 'Sign In', icon: LogIn },
    ];

    return (
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            {/* Create Listing Button */}
            <button 
                className="p-1.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 rounded-full transition-colors shrink-0" 
                aria-label="Create Listing"
            >
                <Plus size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
            </button>

            {/* Profile Avatar */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 relative rounded-full overflow-hidden border border-gray-200 cursor-pointer hover:border-gray-300 active:border-gray-400 transition-colors shrink-0">
                <div className="w-full h-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-[9px] sm:text-[10px] md:text-xs">
                    User
                </div>
            </div>

            {/* Menu Button with Dropdown */}
            <div className="relative" ref={menuRef}>
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-1.5 sm:p-2 rounded-md transition-colors shrink-0 ${
                        isMenuOpen 
                            ? 'bg-gray-100' 
                            : 'hover:bg-gray-100 active:bg-gray-200'
                    }`}
                    aria-label="Menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <X size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
                    ) : (
                        <Menu size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-700" />
                    )}
                </button>

                {/* Mobile/Tablet: Full-screen overlay menu */}
                {isMenuOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <div 
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        
                        {/* Menu Content */}
                        <div className="fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[85vw] bg-white shadow-xl z-50 md:absolute md:top-auto md:right-0 md:mt-2 md:h-auto md:w-56 md:rounded-lg md:border md:border-gray-200 transform transition-transform duration-300 ease-in-out md:transform-none">
                            {/* Mobile Header */}
                            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 md:hidden">
                                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Menu</h2>
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-1.5 sm:p-2 hover:bg-gray-100 active:bg-gray-200 rounded-md transition-colors"
                                    aria-label="Close menu"
                                >
                                    <X size={18} className="sm:w-5 sm:h-5 text-gray-700" />
                                </button>
                            </div>

                            {/* Desktop Header */}
                            <div className="hidden md:block px-4 py-2 border-b border-gray-100">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Navigation
                                </p>
                            </div>

                            <nav className="py-1 overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-none">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`flex items-center gap-2.5 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 md:px-4 md:py-2.5 text-sm sm:text-base md:text-sm transition-colors active:bg-gray-100 ${
                                                isActive
                                                    ? 'bg-gray-50 text-slate-900 font-medium border-l-4 md:border-l-0 border-slate-900'
                                                    : 'text-gray-700 hover:bg-gray-50 hover:text-slate-900'
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Icon 
                                                size={18} 
                                                className={`sm:w-5 sm:h-5 md:w-[18px] md:h-[18px] shrink-0 ${isActive ? 'text-slate-900' : 'text-gray-500'}`} 
                                            />
                                            <span className="flex-1">{item.label}</span>
                                            {isActive && (
                                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-900 md:block" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserMenu;
