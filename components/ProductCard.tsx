'use client';

import { Product } from '@/data/products';
import { Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const productSlug = `${product.name.toLowerCase().replace(/\s+/g, '-')}/p/${product.id}`;

  return (
    <Link href={`/product/${productSlug}`}>
      <div className="group cursor-pointer">
        {/* Product Image */}
        <div
          className="relative bg-[#f5f5f5] overflow-hidden mb-3 flex items-center justify-center"
          style={{ aspectRatio: '193/240' }}
          onMouseEnter={() => setShowQuickView(true)}
          onMouseLeave={() => setShowQuickView(false)}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Quick View Overlay */}
          {showQuickView && (
            <div className="absolute inset-0 bg-black/20 flex items-end justify-center pb-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className="bg-white text-black font-bold text-sm py-2 px-6 rounded-sm hover:bg-gray-100"
              >
                QUICK VIEW
              </button>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          >
            <Heart
              size={16}
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-[#666666]'}
            />
          </button>
        </div>

        {/* Brand */}
        <div className="text-center text-[13px] text-[#666666] font-normal mb-2">
          {product.brand}
        </div>

        {/* Product Name */}
        <div className="text-center text-[13px] text-[#666666] line-clamp-2 leading-6 mb-2 h-12">
          {product.name}
        </div>

        {/* Pricing */}
        <div className="text-center">
          <div className="text-[14px] font-semibold text-[#222222] mb-1">
            ₹{product.offerPrice}
          </div>
          <div className="text-[13px] text-[#3f9b78]">
            Offer ₹{product.offerPrice}
          </div>
          {product.discount > 0 && (
            <div className="text-[12px] text-[#999999] mt-1">
              {product.discount}% off
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
