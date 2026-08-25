'use client';

import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Headphones } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#d9d9d9]">
      {/* Main header container */}
      <div className="h-24 px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <div className="text-3xl font-black tracking-widest text-[#222222]" style={{ letterSpacing: '6px' }}>
            SHEIN
          </div>
        </Link>

        {/* Navigation - center */}
        <nav className="flex items-center gap-12 flex-1 justify-center">
          <Link href="/" className="text-xs font-light tracking-wider text-[#666666] uppercase hover:text-[#222222]">
            Women
          </Link>
          <Link href="/" className="text-xs font-light tracking-wider text-[#666666] uppercase hover:text-[#222222]">
            Men
          </Link>
          <div className="relative">
            <Link href="/" className="text-xs font-light tracking-wider text-[#666666] uppercase hover:text-[#222222]">
              Trending
            </Link>
            <div className="absolute -top-3 -right-6 bg-yellow-300 text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
              HOT
            </div>
          </div>
        </nav>

        {/* Search bar */}
        <div className="shrink-0 mr-8 flex items-center">
          <div className="flex items-center bg-white border border-[#666666] rounded-3xl overflow-hidden" style={{ width: '270px', height: '38px' }}>
            <input
              type="text"
              placeholder="Search SHEIN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 text-sm placeholder-[#999999] outline-none bg-white"
            />
            <button className="bg-[#222222] text-white px-3 flex items-center justify-center" style={{ width: '38px', height: '38px' }}>
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-6">
          <button className="text-[#222222] hover:opacity-70 transition-opacity">
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <Link href="/cart" className="text-[#222222] hover:opacity-70 transition-opacity relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#3f9b78] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="text-[#222222] hover:opacity-70 transition-opacity">
            <User size={20} strokeWidth={1.5} />
          </button>
          <button className="text-[#222222] hover:opacity-70 transition-opacity">
            <Headphones size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>
  );
}
