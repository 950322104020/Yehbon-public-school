'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Admissions', href: '/admissions' },
    { name: 'Notice Board', href: '/notices' },
    { name: 'Events Portal', href: '/events' },
    { name: 'Campus Gallery', href: '/gallery' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* School Brand Identity */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-blue-900">YEHBON</span>
              <span className="text-xs font-semibold tracking-widest text-amber-500 uppercase">Public School</span>
            </Link>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-gray-700 hover:text-blue-900 font-medium transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/admissions" 
              className="bg-blue-950 text-white px-5 py-2.5 rounded-md hover:bg-amber-500 transition-colors shadow text-sm font-semibold uppercase tracking-wider"
            >
              Apply Online
            </Link>
          </div>

          {/* Mobile Hamburger Layout Activation Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Mobile Responsive Drawer Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-slate-50 border-t border-gray-100 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:bg-blue-900 hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link
                href="/admissions"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-amber-500 text-white px-4 py-3 rounded-md font-semibold"
              >
                Apply Online
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}