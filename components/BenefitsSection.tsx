'use client';

import { ShieldCheck, Package, Truck } from 'lucide-react';

export default function BenefitsSection() {
  return (
    <div className="bg-white py-16 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-12 text-center">
          {/* Assured Quality */}
          <div>
            <div className="flex justify-center mb-6">
              <ShieldCheck size={48} className="text-[#222222]" strokeWidth={1} />
            </div>
            <h3 className="text-sm font-semibold text-[#222222] uppercase tracking-wide">
              Assured Quality
            </h3>
            <p className="text-xs text-[#666666] mt-2">
              We ensure all products meet quality standards
            </p>
          </div>

          {/* Easy Returns */}
          <div>
            <div className="flex justify-center mb-6">
              <Package size={48} className="text-[#222222]" strokeWidth={1} />
            </div>
            <h3 className="text-sm font-semibold text-[#222222] uppercase tracking-wide">
              Easy Returns
            </h3>
            <p className="text-xs text-[#666666] mt-2">
              Hassle-free returns within 30 days
            </p>
          </div>

          {/* Free Shipping */}
          <div>
            <div className="flex justify-center mb-6">
              <Truck size={48} className="text-[#222222]" strokeWidth={1} />
            </div>
            <h3 className="text-sm font-semibold text-[#222222] uppercase tracking-wide">
              Free Shipping
            </h3>
            <p className="text-xs text-[#666666] mt-2">
              Free shipping on orders above Rs.999
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
