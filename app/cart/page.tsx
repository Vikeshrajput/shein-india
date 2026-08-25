'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Truck, CreditCard, Plus, Minus, X } from 'lucide-react';
import Footer from '@/components/Footer';
import BenefitsSection from '@/components/BenefitsSection';
import { useCart } from '@/components/CartContext';

export default function CartPage() {
  const cart = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Calculate total
  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.offerPrice * item.quantity;
  }, 0);

  const handleQuantityChange = (
    productId: string,
    size: string,
    color: string,
    change: number
  ) => {
    const key = `${productId}-${size}-${color}`;
    const item = cart.items.find(
      (i) => i.product.id === productId && i.selectedSize === size && i.selectedColor === color
    );
    if (item) {
      cart.updateQuantity(productId, size, color, item.quantity + change);
    }
  };

  const handleRemoveItem = (productId: string, size: string, color: string) => {
    cart.removeItem(productId, size, color);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Simplified Cart Header */}
      <header className="border-b border-[#d9d9d9] py-6 px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <div className="text-3xl font-black tracking-widest text-[#222222]" style={{ letterSpacing: '6px' }}>
              SHEIN
            </div>
          </Link>

          {/* Progress Steps */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#222222] text-white flex items-center justify-center text-sm font-bold mb-1">
                <ShoppingBag size={16} />
              </div>
              <span className="text-xs text-[#222222] font-semibold">Bag</span>
            </div>

            <div className="text-[#d9d9d9] text-2xl">−</div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#d9d9d9] text-[#999999] flex items-center justify-center text-sm font-bold mb-1">
                <Truck size={16} />
              </div>
              <span className="text-xs text-[#999999]">Delivery Details</span>
            </div>

            <div className="text-[#d9d9d9] text-2xl">−</div>

            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-[#d9d9d9] text-[#999999] flex items-center justify-center text-sm font-bold mb-1">
                <CreditCard size={16} />
              </div>
              <span className="text-xs text-[#999999]">Payment</span>
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-6">
            <button className="text-[#222222] hover:opacity-70">
              {/* Account icon placeholder */}
              👤
            </button>
            <button className="text-[#222222] hover:opacity-70">
              {/* Support icon placeholder */}
              🎧
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-3 gap-12">
            {/* Cart Items - Left */}
            <div className="col-span-2">
              {cart.items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="text-[#d9d9d9] mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-[#222222] mb-2">Your bag is empty</h2>
                  <p className="text-sm text-[#666666] mb-6">Add items to your bag to checkout</p>
                  <Link
                    href="/s/shirts-165583"
                    className="inline-block bg-[#222222] text-white px-6 py-2 font-bold text-sm hover:bg-[#000000] transition-colors rounded-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 pb-6 border-b border-[#d9d9d9] last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-24 h-32 object-cover rounded-sm"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-[#222222] mb-2 line-clamp-2">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-[#666666] mb-3">{item.product.brand}</p>

                        {/* Attributes */}
                        <div className="space-y-1 text-xs text-[#666666] mb-4">
                          <p>
                            <span className="font-semibold">Colour:</span> {item.selectedColor}
                          </p>
                          <p>
                            <span className="font-semibold">Size:</span> {item.selectedSize}
                          </p>
                        </div>

                        {/* Price */}
                        <p className="text-sm font-semibold text-[#222222] mb-4">
                          ₹{item.product.offerPrice}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                -1
                              )
                            }
                            disabled={item.quantity === 1}
                            className="p-1 border border-[#d9d9d9] rounded hover:bg-[#f5f5f5] disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                1
                              )
                            }
                            className="p-1 border border-[#d9d9d9] rounded hover:bg-[#f5f5f5]"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() =>
                              handleRemoveItem(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor
                              )
                            }
                            className="ml-auto text-[#666666] hover:text-[#222222]"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right">
                        <p className="text-sm font-semibold text-[#222222]">
                          ₹{(item.product.offerPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Return Policy */}
              <div className="border border-[#d9d9d9] p-6 rounded-sm">
                <h3 className="font-semibold text-sm text-[#222222] mb-3">Return/Refund policy</h3>
                <p className="text-xs text-[#666666] mb-3 leading-5">
                  In case of return, we ensure quick refunds.
                </p>
                <p className="text-xs text-[#666666] mb-4 leading-5">
                  Full amount will be refunded excluding Convenience Fee
                </p>
                <a href="#" className="text-xs text-[#4c8fa3] font-semibold hover:underline">
                  Read Policy
                </a>
              </div>

              {/* Cart Benefits */}
              <div className="space-y-3 text-center text-xs">
                <div>
                  <span className="text-[#222222] font-semibold">✓</span> Secure Payments
                </div>
                <div>
                  <span className="text-[#222222] font-semibold">💳</span> Cash on Delivery
                </div>
                <div>
                  <span className="text-[#222222] font-semibold">✓</span> Assured Quality
                </div>
                <div>
                  <span className="text-[#222222] font-semibold">↩</span> Easy Returns
                </div>
              </div>

              {/* Order Summary */}
              {cart.items.length > 0 && (
                <div className="bg-[#f9f9f9] p-6 rounded-sm space-y-4">
                  <div className="space-y-2 pb-4 border-b border-[#d9d9d9]">
                    <div className="flex justify-between text-xs text-[#666666]">
                      <span>Subtotal</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#666666]">
                      <span>Shipping</span>
                      <span className="text-[#3f9b78]">Free</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-[#222222]">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  <button className="w-full bg-[#222222] text-white font-bold uppercase text-sm py-3 hover:bg-[#000000] transition-colors rounded-sm">
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <BenefitsSection />
      </main>

      <Footer />
    </div>
  );
}
