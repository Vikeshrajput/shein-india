'use client';

import { Grid3x3, Grid2x2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ProductToolbarProps {
  itemsCount: number;
  sortBy?: string;
  onSortChange?: (sort: string) => void;
  gridColumns?: number;
  onGridColumnsChange?: (columns: number) => void;
}

export default function ProductToolbar({
  itemsCount,
  sortBy = 'Relevance',
  onSortChange,
  gridColumns = 5,
  onGridColumnsChange,
}: ProductToolbarProps) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = ['Relevance', 'Newest', 'Price: Low to High', 'Price: High to Low'];

  return (
    <div className="flex items-center justify-between mb-8 py-4 border-b border-[#d9d9d9]">
      {/* Left - Items Found */}
      <div className="text-sm font-semibold text-[#222222]">
        {itemsCount} Items Found
      </div>

      {/* Center - Grid View Options */}
      <div className="flex items-center gap-3">
        <span className="text-xs uppercase text-[#666666] font-medium">Grid</span>
        <button
          onClick={() => onGridColumnsChange?.(4)}
          className={`p-1.5 border-2 transition-colors ${
            gridColumns === 4
              ? 'border-[#222222] bg-[#f5f5f5]'
              : 'border-[#d9d9d9] hover:border-[#999999]'
          }`}
        >
          <Grid2x2 size={18} className="text-[#666666]" />
        </button>
        <button
          onClick={() => onGridColumnsChange?.(5)}
          className={`p-1.5 border-2 transition-colors ${
            gridColumns === 5
              ? 'border-[#222222] bg-[#f5f5f5]'
              : 'border-[#d9d9d9] hover:border-[#999999]'
          }`}
        >
          <Grid3x3 size={18} className="text-[#666666]" />
        </button>
      </div>

      {/* Right - Sort Dropdown */}
      <div className="flex items-center gap-3 relative">
        <span className="text-xs uppercase text-[#666666] font-medium">Sort By</span>
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className="border border-[#d9d9d9] bg-white rounded text-sm text-[#222222] px-4 py-2 flex items-center gap-2 hover:border-[#999999] transition-colors"
          style={{ minWidth: '145px', height: '30px' }}
        >
          <span className="truncate">{sortBy}</span>
          <ChevronDown size={16} />
        </button>

        {/* Sort Dropdown Menu */}
        {showSortDropdown && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-[#d9d9d9] rounded shadow-md z-10 min-w-max">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onSortChange?.(option);
                  setShowSortDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-[#222222] hover:bg-[#f5f5f5] transition-colors first:rounded-t last:rounded-b"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
