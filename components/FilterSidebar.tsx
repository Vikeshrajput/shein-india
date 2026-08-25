'use client';

import { ChevronUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FilterSidebarProps {
  selectedFilters: {
    gender: string[];
    category: string[];
    priceRanges: string[];
    brands: string[];
  };
  onFilterChange: (filterType: string, value: string) => void;
}

export default function FilterSidebar({ selectedFilters, onFilterChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    gender: true,
    category: true,
    price: true,
    brands: false,
    occasion: false,
    discount: false,
    colors: false,
    sizefit: false,
    morefilters: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (filterType: string, value: string) => {
    onFilterChange(filterType, value);
  };

  return (
    <aside className="w-56 border-r border-[#d9d9d9] pr-6">
      {/* Refine By Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[#222222]">Refine By</h2>
        <ChevronUp size={18} className="text-[#666666]" />
      </div>

      {/* Gender Filter */}
      <div className="mb-6 pb-6 border-b border-[#d9d9d9]">
        <button
          onClick={() => toggleSection('gender')}
          className="flex items-center justify-between w-full mb-4 text-sm font-normal text-[#222222] hover:text-[#666666]"
        >
          <span>
            <span className="mr-2">−</span>Gender
          </span>
          {expandedSections.gender ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSections.gender && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.gender.includes('Women')}
                onChange={() => handleCheckboxChange('gender', 'Women')}
                className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
              />
              <span className="ml-3 text-sm text-[#666666]">
                Women <span className="text-[#999999]">(431)</span>
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.gender.includes('Men')}
                onChange={() => handleCheckboxChange('gender', 'Men')}
                className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
              />
              <span className="ml-3 text-sm text-[#666666]">
                Men <span className="text-[#999999]">(156)</span>
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="mb-6 pb-6 border-b border-[#d9d9d9]">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full mb-4 text-sm font-normal text-[#222222] hover:text-[#666666]"
        >
          <span>
            <span className="mr-2">−</span>Category
          </span>
          {expandedSections.category ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>

        {expandedSections.category && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.category.includes('Shirts')}
                onChange={() => handleCheckboxChange('category', 'Shirts')}
                className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
              />
              <span className="ml-3 text-sm text-[#666666]">
                Shirts <span className="text-[#999999]">(431)</span>
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6 pb-6 border-b border-[#d9d9d9]">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center text-sm font-normal text-[#222222] hover:text-[#666666]"
          >
            <span className="mr-2">−</span>Price
          </button>
          <div className="flex gap-2 text-[11px] text-[#4c8fa3] cursor-pointer">
            <span>Select All</span>
            <span>|</span>
            <span>Clear All</span>
          </div>
        </div>

        {expandedSections.price && (
          <div className="space-y-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.priceRanges.includes('Below 500')}
                onChange={() => handleCheckboxChange('priceRanges', 'Below 500')}
                className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
              />
              <span className="ml-3 text-sm text-[#666666]">
                Below Rs.500 <span className="text-[#999999]">(17)</span>
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.priceRanges.includes('500-1000')}
                onChange={() => handleCheckboxChange('priceRanges', '500-1000')}
                className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
              />
              <span className="ml-3 text-sm text-[#666666]">
                Rs.500-1000 <span className="text-[#999999]">(413)</span>
              </span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.priceRanges.includes('1000-1500')}
                onChange={() => handleCheckboxChange('priceRanges', '1000-1500')}
                className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
              />
              <span className="ml-3 text-sm text-[#666666]">
                Rs.1001-1500 <span className="text-[#999999]">(1)</span>
              </span>
            </label>
            <div className="text-[11px] text-[#999999] mt-4 pt-4 border-t border-[#d9d9d9]">
              <div className="mb-2 text-[#4c8fa3] cursor-pointer">Enter Price Range</div>
              <div className="text-[#4c8fa3] cursor-pointer">Clear</div>
            </div>
          </div>
        )}
      </div>

      {/* Brands Filter */}
      <div className="mb-6 pb-6 border-b border-[#d9d9d9]">
        <button
          onClick={() => toggleSection('brands')}
          className="flex items-center justify-between w-full text-sm font-normal text-[#222222] hover:text-[#666666]"
        >
          <span>
            <span className="mr-2">{expandedSections.brands ? '−' : '+'}</span>Brands
          </span>
        </button>

        {expandedSections.brands && (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-[11px] text-[#4c8fa3] cursor-pointer mb-3">
              <span>Select All</span>
              <span>Clear All</span>
            </div>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFilters.brands.includes('Shein')}
                onChange={() => handleCheckboxChange('brands', 'Shein')}
                className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
              />
              <span className="ml-3 text-sm text-[#666666]">
                Shein <span className="text-[#999999]">(431)</span>
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Collapsed sections */}
      <div className="space-y-3">
        {[
          { key: 'occasion', label: 'Occasion' },
          { key: 'discount', label: 'Discount' },
          { key: 'colors', label: 'Colors' },
          { key: 'sizefit', label: 'Size & Fit' },
        ].map((section) => (
          <div key={section.key} className="pb-6 border-b border-[#d9d9d9] last:border-b-0">
            <button
              onClick={() => toggleSection(section.key)}
              className="flex items-center justify-between w-full text-sm font-normal text-[#222222] hover:text-[#666666]"
            >
              <span>
                <span className="mr-2">{expandedSections[section.key] ? '−' : '+'}</span>
                {section.label}
              </span>
            </button>

            {expandedSections[section.key] && (
              <div className="mt-4 space-y-3">
                {section.key === 'occasion' && (
                  <>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        Casual <span className="text-[#999999]">(324)</span>
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        Formal <span className="text-[#999999]">(107)</span>
                      </span>
                    </label>
                  </>
                )}

                {section.key === 'discount' && (
                  <>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        20% - 30% Off <span className="text-[#999999]">(152)</span>
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        30% - 50% Off <span className="text-[#999999]">(279)</span>
                      </span>
                    </label>
                  </>
                )}

                {section.key === 'colors' && (
                  <>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        White <span className="text-[#999999]">(86)</span>
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        Black <span className="text-[#999999]">(64)</span>
                      </span>
                    </label>
                  </>
                )}

                {section.key === 'sizefit' && (
                  <>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        Regular Fit <span className="text-[#999999]">(208)</span>
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border border-[#d9d9d9] rounded accent-[#222222]"
                      />
                      <span className="ml-3 text-sm text-[#666666]">
                        Slim Fit <span className="text-[#999999]">(127)</span>
                      </span>
                    </label>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* More Filters */}
      <div className="mt-8 pt-6 border-t border-[#d9d9d9]">
        <button
          onClick={() => toggleSection('morefilters')}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="text-sm font-normal text-[#222222]">More Filters</span>
          {expandedSections['morefilters'] ? (
            <ChevronUp size={16} className="text-[#666666]" />
          ) : (
            <ChevronDown size={16} className="text-[#666666]" />
          )}
        </button>
        {expandedSections['morefilters'] && (
          <div>
            <p className="text-[11px] text-[#999999] mb-3">
              Please select up to 3 categories to view more filters
            </p>
            <button className="text-[11px] text-[#4c8fa3] font-semibold uppercase tracking-wide">
              SELECT CATEGORY
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
