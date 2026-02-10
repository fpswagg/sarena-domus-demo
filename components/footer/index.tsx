'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone } from 'lucide-react';

const BRAND_NAME = 'Sarena Domus';

const Footer = () => {
  const email = process.env.NEXT_PUBLIC_EMAIL ?? '';
  const phone = process.env.NEXT_PUBLIC_PHONE ?? '';
  const facebook = process.env.NEXT_PUBLIC_FACEBOOK ?? '';
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM ?? '';
  const tiktok = process.env.NEXT_PUBLIC_TIKTOK ?? '';

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 sm:py-12 lg:py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-10 lg:pb-14 border-b border-slate-700/80">
          {/* Brand block — no icon */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <Link
              href="/"
              className="font-semibold text-white text-lg w-fit hover:text-slate-200 transition-colors"
            >
              {BRAND_NAME}
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xs">
              Your trusted platform to buy, sell, or rent property. Find your next home with confidence.
            </p>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-sm">Explore</h3>
            <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
              Home
            </Link>
            <Link href="/search" className="text-slate-400 hover:text-white transition-colors text-sm">
              Search properties
            </Link>
            <Link href="/profile" className="text-slate-400 hover:text-white transition-colors text-sm">
              Profile
            </Link>
            <Link href="/sign-in" className="text-slate-400 hover:text-white transition-colors text-sm">
              Sign in
            </Link>
          </div>

          {/* Support & company — links to routes (404 if page missing) */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold text-sm">Support & company</h3>
            <Link href="/help-centre" className="text-slate-400 hover:text-white transition-colors text-sm">
              Help centre
            </Link>
            <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
              About us
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">
              Contact
            </Link>
            <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-sm">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">
              Terms
            </Link>
          </div>
        </div>

        {/* Contact & social — env-driven */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8">
          <div className="flex flex-col gap-2">
            {(email || phone) && (
              <h3 className="text-white font-semibold text-sm">Contact</h3>
            )}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Mail size={16} className="shrink-0" />
                  {email}
                </a>
              ) : null}
              {phone ? (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <Phone size={16} className="shrink-0" />
                  {phone}
                </a>
              ) : null}
              {!email && !phone && (
                <span className="text-slate-500 text-sm">Set NEXT_PUBLIC_EMAIL and NEXT_PUBLIC_PHONE in .env</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {facebook ? (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            ) : null}
            {instagram ? (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            ) : null}
            {tiktok ? (
              <a
                href={tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88 5.36V19.9a7.2 7.2 0 0 0 5.2-2.13v-5.5a6.7 6.7 0 0 0 4.83 2.36V6.69h3.45z" />
                </svg>
              </a>
            ) : null}
            {!facebook && !instagram && !tiktok && (
              <span className="text-slate-500 text-xs">Set NEXT_PUBLIC_FACEBOOK, INSTAGRAM, TIKTOK in .env</span>
            )}
          </div>
        </div>

        {/* Bottom bar — same routes */}
        <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-slate-500">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <Link href="/sitemap" className="text-slate-500 hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
