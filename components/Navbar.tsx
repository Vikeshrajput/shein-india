'use client';

import { useState } from "react";
import {
  Headphones,
  Heart,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

const navItems = {
  WOMEN: [
    "NEW IN",
    "CLOTHING",
    "DRESSES",
    "TOPS",
    "BOTTOMS",
    "SHOES",
    "ACCESSORIES",
  ],
  MEN: [
    "NEW IN",
    "T-SHIRTS",
    "SHIRTS",
    "HOODIES",
    "PANTS",
    "SHOES",
    "ACCESSORIES",
  ],
  TRENDING: [
    "TRENDING NOW",
    "BEST SELLERS",
    "VIRAL PICKS",
    "NEW ARRIVALS",
    "SALE",
  ],
};

export default function Navbar() {
  const [activePopup, setActivePopup] = useState<"wishlist" | "cart" | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [mobile, setMobile] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startPhoneLogin = async () => {
    setIsSubmitting(true);
    setLoginMessage("");
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
      const response = await fetch(`${apiBaseUrl}/auth/phone/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to continue");
      setLoginMessage("Verification request created. OTP delivery can be connected next.");
    } catch (error) {
      setLoginMessage(error instanceof Error ? error.message : "Unable to continue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <header className="relative z-50 w-full border-t-3 border-[#2d283a] bg-white">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-7 lg:px-10 xl:px-[4%] 2xl:px-[5%]">
        
        {/* Main Navbar */}
        <div className="flex h-[86px] items-center">

          {/* Logo */}
          <div className="shrink-0 select-none text-[29px] font-black tracking-[0.16em] text-black">
            SHEIN
          </div>

          {/* Right Side */}
          <div className="ml-auto pr-[140px] flex h-full items-center">

            {/* Navigation */}
            <nav className="hidden h-full items-center md:flex">
              {Object.keys(navItems).map((item) => (
                <div
                  key={item}
                  className="group relative flex h-full items-center"
                >
                  {/* Navigation Item */}
                  <a
                    href="#"
                    className="relative flex h-full items-center px-[15px] text-[13px] font-medium tracking-[0.07em] text-neutral-700 transition-colors hover:text-black"
                  >
                    {/* Blue hover line */}
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] origin-center scale-x-0 bg-blue-500 transition-transform duration-200 group-hover:scale-x-100" />

                    <span className="text-sm">{item}</span>

                    {/* HOT */}
                    {item === "TRENDING" && (
                      <span className="absolute left-1/2 top-[16px] -translate-x-1/2 rounded-full bg-[#ffb72b] px-[5px] py-[1px] text-[6px] leading-[10px] tracking-normal text-black">
                        HOT
                      </span>
                    )}
                  </a>

                  {/* Mega Menu */}
                  <div className="invisible absolute left-1/2 top-full w-[620px] -translate-x-1/2 translate-y-2 border-t border-neutral-200 bg-white px-8 py-7 opacity-0 shadow-[0_8px_25px_rgba(0,0,0,0.08)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    
                    <div className="grid grid-cols-4 gap-x-8 gap-y-4">
                      {navItems[item as keyof typeof navItems].map(
                        (subItem, index) => (
                          <a
                            key={subItem}
                            href="#"
                            className={`text-[12px] tracking-wide transition-colors hover:text-blue-600 ${
                              index === 0
                                ? "font-semibold text-black"
                                : "text-neutral-500"
                            }`}
                          >
                            {subItem}
                          </a>
                        )
                      )}
                    </div>

                    {/* Bottom link */}
                    <div className="mt-6 border-t border-neutral-100 pt-5">
                      <a
                        href="#"
                        className="text-[11px] font-semibold uppercase tracking-[0.12em] text-black hover:text-blue-600"
                      >
                        View All {item} →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </nav>

            {/* Search */}
            <div className="ml-[22px] hidden h-[32px] w-[255px] overflow-hidden rounded-full border border-neutral-700 bg-white lg:flex">
              <input
                type="text"
                placeholder="Search SHEIN"
                className="h-full min-w-0 flex-1 bg-transparent px-3.5 text-[13px] font-normal text-neutral-800 outline-none placeholder:text-neutral-500"
              />

              <button
                type="button"
                aria-label="Search"
                className="flex h-full w-[36px] shrink-0 items-center justify-center bg-[#171717] text-white transition-colors hover:bg-black"
              >
                <Search className="h-[17px] w-[17px] stroke-[2]" />
              </button>
            </div>

            {/* Icons */}
            <div className="ml-[30px] flex items-center gap-[21px] pr-2 text-black xl:pr-4">
              
              <button
                type="button"
                aria-label="Favorites"
                onClick={() => { setActivePopup(activePopup === "wishlist" ? null : "wishlist"); setShowLogin(false); }}
                className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
              >
                <Heart className="h-[19px] w-[19px] stroke-[1.8]" />
              </button>

              <button
                type="button"
                aria-label="Cart"
                onClick={() => { setActivePopup(activePopup === "cart" ? null : "cart"); setShowLogin(false); }}
                className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
              >
                <ShoppingCart className="h-[19px] w-[19px] stroke-[1.8]" />
              </button>

              <div className="group relative flex h-full items-center">
                <button
                  type="button"
                  aria-label="Account menu"
                  onClick={() => { setShowLogin(true); setActivePopup(null); }}
                  className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
                >
                  <User className="h-[19px] w-[19px] stroke-[1.8]" />
                </button>

                <div className="invisible absolute right-0 top-full w-44 translate-y-2 border border-neutral-200 bg-white p-2 opacity-0 shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <Link
                    href="/login"
                    className="block px-3 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/login?mode=signup"
                    className="block px-3 py-2.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
                  >
                    Create account
                  </Link>
                </div>
              </div>

              <button
                type="button"
                aria-label="Support"
                className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
              >
                <Headphones className="h-[19px] w-[19px] stroke-[1.8]" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </header>
    {activePopup === "wishlist" && (
      <div className="fixed right-24 top-[74px] z-[200] w-[215px] bg-white px-5 py-5 text-center shadow-[0_5px_20px_rgba(0,0,0,0.12)]">
        <button type="button" aria-label="Close wishlist" onClick={() => setActivePopup(null)} className="absolute right-2 top-2 text-neutral-400 hover:text-black"><X className="h-3.5 w-3.5" /></button>
        <button type="button" onClick={() => setShowLogin(true)} className="mb-5 mt-1 h-[39px] w-full border border-black text-[13px] font-medium hover:bg-neutral-100">SIGN IN</button>
        <p className="text-[12px] leading-[18px] text-neutral-500">To add or view items in your wishlist</p>
      </div>
    )}
    {activePopup === "cart" && (
      <div className="fixed right-16 top-[74px] z-[200] w-[230px] bg-white px-5 py-5 shadow-[0_5px_20px_rgba(0,0,0,0.12)]">
        <p className="text-[17px] font-medium text-neutral-700">Your Bag Is Empty</p>
        <p className="mt-1 text-[17px] font-medium text-neutral-700">Start Filling It Up!</p>
        <div className="mt-5 border-t border-neutral-100 pt-4 text-[10px] leading-4 text-neutral-400">Free Shipping & Returns | 100% Handpicked | Assured Quality</div>
      </div>
    )}
    {showLogin && (
      <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 px-5" onClick={() => setShowLogin(false)}>
        <div className="relative w-full max-w-[450px] bg-white px-7 py-10 shadow-2xl" onClick={(event) => event.stopPropagation()}>
          <button type="button" aria-label="Close login" onClick={() => setShowLogin(false)} className="absolute right-4 top-4 text-neutral-600 hover:text-black"><X className="h-5 w-5" /></button>
          <h2 className="text-[25px] font-normal text-neutral-800">Welcome to SHEIN</h2>
          <label className="mt-8 block text-[14px] text-[#31536a]">Enter Mobile Number *<input type="tel" value={mobile} onChange={(event) => setMobile(event.target.value)} placeholder="10-digit mobile number" className="mt-2 h-[43px] w-full border-b border-neutral-400 bg-transparent text-neutral-900 outline-none focus:border-black" /></label>
          {loginMessage && <p className="mt-4 text-sm text-neutral-600" role="status">{loginMessage}</p>}
          <button type="button" disabled={isSubmitting} onClick={startPhoneLogin} className="mt-9 h-[45px] w-full bg-[#242424] text-[14px] font-medium tracking-[0.1em] text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "PLEASE WAIT" : "CONTINUE"}</button>
          <p className="mt-6 text-[12px] leading-5 text-neutral-500">By Signing Up, I agree to <a href="#" className="text-[#16749b]">Terms &amp; Conditions</a> and <a href="#" className="text-[#16749b]">Privacy Policy</a></p>
        </div>
      </div>
    )}
    </>
  );
}