'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import ProductGallery from '@/components/ProductGallery';
import ColorSelector from '@/components/ColorSelector';
import SizeSelector from '@/components/SizeSelector';
import DeliveryInfo from '@/components/DeliveryInfo';
import BagOverlay from '@/components/BagOverlay';
import BenefitsSection from '@/components/BenefitsSection';
import { products, Product } from '@/data/products';
import { useCart, CartItem } from '@/components/CartContext';

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const cart = useCart();
  
  // Parse slug to get product ID (last part after last /)
  const productId = params.slug.split('/').pop() || '';
  const product = products.find((p) => p.id === productId);

  const [selectedColor, setSelectedColor] = useState(product?.color || 'Yellow');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showBagOverlay, setShowBagOverlay] = useState(false);
  const [latestItem, setLatestItem] = useState<CartItem | undefined>();

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[#222222] mb-4">Product not found</h1>
            <Link href="/s/shirts-165583" className="text-[#4c8fa3] hover:underline">
              Back to listings
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    cart.addItem(product, selectedColor, selectedSize, quantity);
    
    // Find the item that was just added to show in overlay
    const addedItem = cart.items.find(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    if (addedItem) {
      setLatestItem(addedItem);
      setShowBagOverlay(true);
    }
  };

  const colorOptions = ['Yellow', 'Coral'];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Women', href: '/' },
            { label: 'Western Wear', href: '/' },
            { label: 'Shirts', href: '/s/shirts-165583' },
            { label: product.name },
          ]}
        />

        {/* Product Detail Content */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-2 gap-16">
            {/* Left - Gallery */}
            <div>
              <ProductGallery product={product} />
            </div>

            {/* Right - Product Info */}
            <div>
              {/* Title */}
              <h1 className="text-2xl font-semibold text-[#222222] mb-6">
                {product.name}
              </h1>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-semibold text-[#222222]">₹{product.price}</span>
                  <span className="text-sm text-[#999999]">MRP</span>
                </div>
                <div className="text-[#3f9b78] text-sm font-medium mb-3">
                  Extra 799.80 SHEIN Points
                </div>
                <p className="text-xs text-[#999999]">Price inclusive of all taxes</p>
              </div>

              {/* Offer Box */}
              <div className="bg-[#f9f9f9] border border-[#d9d9d9] p-4 mb-8 rounded-sm">
                <div className="mb-2">
                  <span className="inline-block bg-[#3f9b78] text-white text-xs px-2 py-1 rounded mr-2">
                    WELCOME15
                  </span>
                  <span className="text-sm text-[#222222] font-semibold">
                    Get it for ₹{Math.round(product.price * 0.85)}
                  </span>
                </div>
                <p className="text-xs text-[#666666] mt-2">
                  15% off on cart value of INR 599 & above upto INR 100
                </p>
                <a href="#" className="text-xs text-[#4c8fa3] hover:underline mt-2 inline-block">
                  T&C
                </a>
              </div>

              {/* Color Selector */}
              <ColorSelector
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                colors={colorOptions}
              />

              {/* Size Selector */}
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />

              {/* Size Chart */}
              <div className="flex items-center gap-2 justify-center mb-6 text-[#4c8fa3] cursor-pointer hover:opacity-70">
                <span className="text-sm">📏</span>
                <a href="#" className="text-sm hover:underline">
                  Check Size Chart
                </a>
              </div>

              {/* Delivery Info */}
              <DeliveryInfo selectedSize={selectedSize} />

              {/* Add to Bag Button */}
              <button
                onClick={handleAddToBag}
                className="w-full bg-[#222222] text-white font-bold uppercase text-sm py-3 px-4 mb-3 hover:bg-[#000000] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} />
                ADD TO BAG
              </button>

              <div className="text-xs text-[#999999] text-center mb-6 uppercase tracking-wide">
                HANDPICKED STYLES | ASSURED QUALITY
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full border-2 border-[#222222] text-[#222222] font-bold uppercase text-sm py-3 px-4 hover:bg-[#f5f5f5] transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <Heart
                  size={18}
                  className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
                />
                SAVE TO WISHLIST
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <BenefitsSection />
      </main>

      {/* Bag Overlay */}
      <BagOverlay
        isOpen={showBagOverlay}
        onClose={() => setShowBagOverlay(false)}
        latestItem={latestItem}
      />

      <Footer />
    </div>
  );
}
