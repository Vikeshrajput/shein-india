'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { CartItem } from './CartContext';

interface BagOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  latestItem?: CartItem;
}

export default function BagOverlay({ isOpen, onClose, latestItem }: BagOverlayProps) {
  if (!isOpen || !latestItem) return null;

  const { product, selectedColor, selectedSize, quantity } = latestItem;
  const total = product.offerPrice * quantity;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-end">
      {/* Overlay Background */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bag Panel */}
      <div className="relative w-96 bg-white shadow-2xl animate-slide-in-right h-full max-h-screen overflow-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#999999] hover:text-[#222222]"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Title */}
          <h2 className="text-lg font-semibold text-[#222222] mb-8">Item(s) added to your bag</h2>

          {/* Product Summary */}
          <div className="flex gap-4 mb-8 pb-8 border-b border-[#d9d9d9]">
            {/* Thumbnail */}
            <div className="flex-shrink-0">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-24 h-32 object-cover rounded-sm"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#222222] mb-2 line-clamp-2">
                {product.name}
              </p>
              <p className="text-xs text-[#666666] mb-3">
                {product.brand}
              </p>

              {/* Product attributes */}
              <div className="space-y-2 text-xs text-[#666666]">
                <p>
                  <span className="font-semibold">Colour</span> {selectedColor}
                </p>
                <p>
                  <span className="font-semibold">Size</span> {selectedSize}
                </p>
                <p>
                  <span className="font-semibold">Qty</span> {quantity}
                </p>
              </div>

              {/* Price */}
              <p className="text-sm font-semibold text-[#222222] mt-3">
                ₹{product.offerPrice}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="mb-6 pb-6 border-b border-[#d9d9d9]">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#666666]">Total</span>
              <span className="text-lg font-semibold text-[#222222]">₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full bg-[#222222] text-white text-center py-3 font-bold text-sm hover:bg-[#000000] transition-colors rounded-sm"
            >
              PROCEED TO BAG
            </Link>
            <button
              onClick={onClose}
              className="w-full border border-[#d9d9d9] text-[#222222] py-3 font-bold text-sm hover:bg-[#f5f5f5] transition-colors rounded-sm"
            >
              CONTINUE SHOPPING
            </button>
          </div>

          {/* Info text */}
          <p className="text-xs text-[#999999] text-center mt-6">
            Free shipping on orders above ₹999
          </p>
        </div>
      </div>
    </div>
  );
}
