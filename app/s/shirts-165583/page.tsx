'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';
import ProductToolbar from '@/components/ProductToolbar';
import ActiveFilterChips from '@/components/ActiveFilterChips';
import BenefitsSection from '@/components/BenefitsSection';
import { products } from '@/data/products';

interface FilterChip {
  id: string;
  label: string;
  type: string;
}

export default function ShirtsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [] as string[],
    category: [] as string[],
    priceRanges: [] as string[],
    brands: [] as string[],
  });

  const [sortBy, setSortBy] = useState('Relevance');
  const [gridColumns, setGridColumns] = useState(5);

  // Derive filter chips from selectedFilters
  const filterChips: FilterChip[] = useMemo(() => {
    const chips: FilterChip[] = [];
    
    Object.entries(selectedFilters).forEach(([filterType, values]) => {
      values.forEach((value) => {
        chips.push({
          id: `${filterType}-${value}`,
          label: value,
          type: filterType,
        });
      });
    });
    
    return chips;
  }, [selectedFilters]);

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      const key = filterType as keyof typeof updated;
      const isSelected = updated[key].includes(value);

      if (isSelected) {
        updated[key] = updated[key].filter((item) => item !== value);
      } else {
        updated[key] = [...updated[key], value];
      }

      return updated;
    });
  };

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Gender filter
      if (selectedFilters.gender.length > 0 && !selectedFilters.gender.includes(product.gender)) {
        return false;
      }

      // Category filter
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
        return false;
      }

      // Price filter
      if (selectedFilters.priceRanges.length > 0) {
        const price = product.price;
        const inPriceRange = selectedFilters.priceRanges.some((range) => {
          if (range === 'Below 500') return price < 500;
          if (range === '500-1000') return price >= 500 && price <= 1000;
          if (range === '1000-1500') return price > 1000 && price <= 1500;
          return false;
        });
        if (!inPriceRange) return false;
      }

      // Brands filter
      if (selectedFilters.brands.length > 0 && !selectedFilters.brands.includes(product.brand)) {
        return false;
      }

      return true;
    });
  }, [selectedFilters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === 'Price: Low to High') {
      sorted.sort((a, b) => a.offerPrice - b.offerPrice);
    } else if (sortBy === 'Price: High to Low') {
      sorted.sort((a, b) => b.offerPrice - a.offerPrice);
    } else if (sortBy === 'Newest') {
      sorted.reverse();
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shirts' }]} />

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light text-[#222222]">Shirts</h1>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-8 flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Right Content */}
          <div className="flex-1">
            {/* Active Filter Chips */}
            <ActiveFilterChips
              chips={filterChips}
              onRemoveChip={(chipId) => {
                const [filterType, value] = chipId.split('-', 2);
                handleFilterChange(filterType, value);
              }}
            />

            {/* Toolbar */}
            <ProductToolbar
              itemsCount={sortedProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              gridColumns={gridColumns}
              onGridColumnsChange={setGridColumns}
            />

            {/* Product Grid */}
            <ProductGrid products={sortedProducts} columnsPerRow={gridColumns} />

            {/* Benefits Section */}
            <BenefitsSection />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
