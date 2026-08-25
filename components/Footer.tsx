'use client';

import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back to Top Button */}
      <button
        onClick={handleBackToTop}
        className="fixed bottom-8 right-8 z-40 bg-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow border border-[#d9d9d9]"
      >
        <ChevronUp size={24} className="text-[#222222]" />
      </button>

      {/* Footer */}
      <footer className="mt-20 bg-[#344d5f] text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-4 gap-12 mb-16">
            {/* Column 1 - Shein */}
            <div>
              <h3 className="font-semibold text-sm mb-6 uppercase tracking-wide">Shein</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    About Shein
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 - Help */}
            <div>
              <h3 className="font-semibold text-sm mb-6 uppercase tracking-wide">Help</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Track Your Order
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Shop By */}
            <div>
              <h3 className="font-semibold text-sm mb-6 uppercase tracking-wide">Shop By</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Accessories
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Follow */}
            <div>
              <h3 className="font-semibold text-sm mb-6 uppercase tracking-wide">Follow</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="border-t border-gray-600 pt-8">
            <p className="text-xs text-gray-400 text-center">
              © 2024 SHEIN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
