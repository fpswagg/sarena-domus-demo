'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Home } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[560px] md:min-h-[600px] flex items-center rounded-2xl md:rounded-3xl overflow-hidden my-6">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Modern property — Sarena Domus"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-r from-slate-900/85 via-slate-900/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[560px] md:min-h-[600px] py-12 md:py-0">
        {/* Left: Headline + CTA */}
        <div className="flex flex-col justify-center text-white">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm">
              <Home className="w-5 h-5 text-white" aria-hidden />
            </span>
            <span className="text-sm font-medium text-slate-200 tracking-wide uppercase">
              Sarena Domus
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
            Find your
            <br />
            <span className="text-white">dream property</span>
          </h1>
          <p className="text-base md:text-lg text-slate-200 mb-6 md:mb-8 max-w-lg">
            Buy, sell, or rent with confidence. Explore listings across Cameroon and find the right home or investment.
          </p>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-medium w-fit hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Explore properties
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 text-white">
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
            </span>
          </Link>

          {/* Stats */}
          <div className="mt-10 md:mt-12 grid grid-cols-3 gap-6 md:gap-8">
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">200+</p>
              <p className="text-xs sm:text-sm text-slate-300">Properties</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">70+</p>
              <p className="text-xs sm:text-sm text-slate-300">Agents</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">100k+</p>
              <p className="text-xs sm:text-sm text-slate-300">Transactions</p>
            </div>
          </div>
        </div>

        {/* Right: Optional visual — featured agents pill (desktop) */}
        <div className="hidden md:flex flex-col justify-end items-end pb-10">
          <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-full py-2 pl-2 pr-5 shadow-lg border border-white/20">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white overflow-hidden bg-slate-200"
                >
                  <Image
                    src={`https://i.pravatar.cc/80?img=${i + 10}`}
                    alt=""
                    width={36}
                    height={36}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-900">Featured agents</span>
              <span className="text-[10px] text-slate-500">Trusted by thousands</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
