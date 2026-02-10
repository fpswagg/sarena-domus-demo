'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center pt-4 pb-8 sm:py-12 lg:py-16 px-4 sm:px-6">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-10">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                            Sign In
                        </h1>
                        <p className="text-sm text-gray-500">
                            Welcome back to Sarena Domus
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
                        {/* Email/Mobile Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                E-mail / Mobile Number
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="+00 456456452345"
                                className="w-full px-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-slate-800 text-gray-900 placeholder-gray-400 transition-all text-sm"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-slate-800 text-gray-900 placeholder-gray-400 transition-all text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link 
                                href="#" 
                                className="text-sm text-slate-800 hover:text-slate-600 transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-lg transition-colors text-sm"
                        >
                            Sign In
                        </button>

                        {/* Divider */}
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-all text-sm font-medium text-gray-700"
                            >
                                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="hidden sm:inline text-gray-700">Google</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100 transition-all text-sm font-medium text-gray-700"
                            >
                                <svg className="w-5 h-5 shrink-0" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="hidden sm:inline text-gray-700">Facebook</span>
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-sm text-gray-500 text-center pt-4">
                            Don&apos;t have an account?{' '}
                            <Link href="/sign-up" className="text-slate-800 hover:text-slate-600 font-medium transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-6">
                    By signing in, you agree to our{' '}
                    <Link href="#" className="text-slate-800 hover:text-slate-600 underline transition-colors">
                        Terms and Conditions
                    </Link>
                </p>
            </div>
        </div>
    );
}
