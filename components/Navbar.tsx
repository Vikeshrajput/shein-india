'use client';

import { useState } from "react";
import {
  Headphones,
  Heart,
  Home as HomeIcon,
  List,
  Search,
  ShoppingCart,
  Sparkles,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

type NavItem = "WOMEN" | "MEN" | "TRENDING";
type MenuSection = { title: string; items: string[]; badge?: "NEW" | "HOT" };
type MenuColumn = MenuSection[];

const slugify = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const navItems: Record<NavItem, MenuColumn[]> = {
  WOMEN: [
    [{ title: "DRESSES", items: ["A-Line Dresses", "Mini Dresses", "Midi Dresses", "Maxi Dresses", "Asymmetrical"] }, { title: "SETS", items: ["Bodysuits", "Co-Ord Sets", "Track Suits"] }, { title: "ACTIVEWEAR", items: ["Bottomwear", "Sets", "Topwear"] }, { title: "FOOTWEAR", items: ["Casual Shoes", "Flats", "Sneakers"] }],
    [{ title: "TOPWEAR", items: ["Shirts", "Tanks & Camis", "Tops", "T-Shirts"] }, { title: "BOTTOMWEAR", items: ["Capris", "Cargos", "Leggings", "Palazzos", "Shorts", "Skirts", "Track Pants", "Trousers"] }, { title: "BEACHWEAR", items: ["Swimwear"] }],
    [{ title: "DENIM", items: ["Dress", "Jeans", "Shorts", "Skirts", "Tops"] }, { title: "LINGERIE", items: ["Bras", "Lingerie Sets", "Panties", "Shapewear"] }, { title: "LOUNGEWEAR", items: ["Night & Lounge Sets", "Nightshirts & Nighties", "Pyjamas & Lounge Shorts"] }],
    [{ title: "OUTERWEAR", items: ["Hoodies", "Jackets", "Shrugs", "Sweaters", "Sweatshirt"] }, { title: "JEWELLERY", badge: "NEW", items: ["Brooches & Pins", "Bangles & Bracelets", "Earrings", "Hair Accessories", "Jewellery Sets", "Necklaces & Pendants", "Rings"] }, { title: "CLOTHING ACCESSORIES", items: ["Socks & Stockings"] }, { title: "OFFERS", badge: "HOT", items: [] }],
  ],
  MEN: [
    [{ title: "T-SHIRTS", items: ["Mock Neck T-Shirts", "Polo Collar T-Shirts", "V-Neck T-Shirts", "Oversized T-Shirts", "Graphic T-Shirts"] }, { title: "SHIRTS", items: ["Shackets Shirts", "Crochet Shirts", "Short Sleeve Shirts", "Long Sleeve Shirts", "Casual Shirts"] }, { title: "LOUNGEWEAR", items: ["Night & Loungewear Sets", "Pyjamas & Lounge Shorts"] }, { title: "CO-ORD SETS", items: [] }, { title: "ACCESSORIES", items: ["Backpacks", "Utility Bags"] }],
    [{ title: "JEWELLERY", items: ["Bracelets & Kadas", "Chains", "Earrings", "Rings", "Cufflinks & Tiepins"] }, { title: "DENIM JEANS", items: ["Baggy Jeans", "Relaxed Jeans", "Skinny Jeans", "Straight Jeans", "Flared Jeans", "Slim Jeans", "Tapered Jeans", "Washed Jeans"] }, { title: "INNERWEAR", items: ["Boxers, Briefs & Trunks", "Vests"] }],
    [{ title: "FOOTWEAR", items: ["Flip Flop & Slippers", "Sandals", "Casual Shoes", "Sneakers & Sport Shoes", "Formal Shoes", "Boots"] }, { title: "TROUSERS & PANTS", items: ["Flat Front Trousers", "Pleated Trousers", "Cargo Pants", "Chinos & Khakis Pants", "Dress Pants", "Skinny & Tapered Pants", "Slim Fit Pants", "Relaxed Fit Pants"] }, { title: "CLOTHING ACCESSORIES", items: ["Socks"] }],
    [{ title: "ACTIVEWEAR", items: ["Shorts", "Track Pants", "Tracksuits", "Activewear Polos", "Activewear T-Shirts", "Jackets"] }, { title: "SHORTS & 3/4THS", items: ["Denim Shorts", "Cargo Shorts", "City Shorts"] }, { title: "FEATURED", items: ["Jeans Under MRP 999", "Shorts Under MRP 699", "Shirts Under MRP 599", "Tshirts Under MRP 499"] }, { title: "OUTERWEAR", items: ["Denim Outerwear", "Bomber Jackets", "Cardigans", "Sweatshirts"] }],
  ],
  TRENDING: [
    [{ title: "TRENDING NOW", items: ["Viral Picks", "Best Sellers", "Most Loved", "What's New"] }, { title: "WOMEN", items: ["Trending Dresses", "Trending Tops", "Trending Jeans", "Trending Sets"] }],
    [{ title: "MEN", items: ["Trending T-Shirts", "Trending Shirts", "Trending Pants", "Trending Shoes"] }, { title: "SOCIAL TRENDS", items: ["TikTok Made Me Buy It", "Instagram Trends", "Influencer Picks", "Viral Styles"] }],
    [{ title: "NEW ARRIVALS", items: ["Just In", "This Week", "New Season", "Latest Drops"] }, { title: "BEST SELLERS", items: ["Top Rated", "Customer Favorites", "Most Purchased"] }],
    [{ title: "OFFERS", badge: "HOT", items: ["Under ₹499", "Under ₹699", "Under ₹999", "Flash Deals"] }, { title: "EDITOR'S PICKS", items: ["Must Have", "Style Edit", "Weekend Looks", "Trending Colors"] }],
  ],
};

export default function Navbar() {
  const [activePopup, setActivePopup] = useState<"wishlist" | "cart" | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [mobile, setMobile] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAppBanner, setShowAppBanner] = useState(true);

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
    {showAppBanner && <div className="flex h-[70px] items-center gap-3 bg-gradient-to-r from-[#fbe0e5] to-[#fff0d4] px-3 sm:hidden">
      <button type="button" aria-label="Dismiss app promotion" onClick={() => setShowAppBanner(false)} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[13px] text-neutral-500 hover:bg-white/60">x</button>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded border-2 border-black text-sm font-bold">S</div>
      <div className="min-w-0 flex-1"><p className="text-xs font-bold">SHEIN INDIA Online</p><p className="text-[10px] leading-3 text-neutral-600">Download SHEIN app. Get up to 40% off on mobile app exclusively.</p></div>
      <button type="button" className="shrink-0 bg-black px-3 py-2 text-[10px] font-bold text-white">Get App</button>
    </div>}
    <div className="border-b border-neutral-200 bg-white sm:hidden">
      <div className="flex h-[62px] items-center justify-center gap-5 px-4"><button type="button" aria-label="Search" className="absolute left-1/2 -translate-x-[108px]"><Search className="h-5 w-5" /></button><Link href="/" className="text-[25px] font-black tracking-[0.2em]">SHEIN</Link><button type="button" aria-label="Favorites" onClick={() => { setActivePopup(activePopup === "wishlist" ? null : "wishlist"); setShowLogin(false); }}><Heart className="h-6 w-6" /></button><button type="button" aria-label="Cart" onClick={() => { setActivePopup(activePopup === "cart" ? null : "cart"); setShowLogin(false); }}><ShoppingCart className="h-6 w-6" /></button></div>
      <nav className="flex gap-6 overflow-x-auto px-4 pb-3 text-xs font-semibold text-neutral-600 [scrollbar-width:none]"><Link href="/shop" className="flex shrink-0 items-center gap-1 text-black"><Sparkles className="h-4 w-4" /> New drop</Link><Link href="/shop?category=women" className="shrink-0">Women</Link><Link href="/shop?category=men" className="shrink-0">Men</Link><Link href="/shop?category=dresses" className="shrink-0">Dresses</Link><Link href="/shop" className="shrink-0">Trending</Link></nav>
    </div>
    <header className="relative z-50 hidden w-full border-t-3 border-[#2d283a] bg-white sm:block">
      <div className="mx-auto w-full max-w-[1800px] px-5 sm:px-7 lg:px-10 xl:px-[4%] 2xl:px-[5%]">
        
        {/* Main Navbar */}
        <div className="flex h-[64px] items-center sm:h-[76px] lg:h-[86px]">

          {/* Logo */}
          <div className="shrink-0 select-none text-[22px] font-black tracking-[0.14em] text-black sm:text-[26px] lg:text-[29px]">
            SHEIN
          </div>

          {/* Right Side */}
          <div className="ml-auto flex h-full min-w-0 items-center sm:pr-2 lg:pr-8 xl:pr-[140px]">

            {/* Navigation */}
            <nav className="hidden h-full items-center md:flex">
              {(Object.keys(navItems) as NavItem[]).map((item) => (
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
                  <div className="invisible fixed left-[4%] top-[94px] z-[120] w-[min(1120px,88vw)] max-h-[calc(100vh-125px)] -translate-y-2 overflow-y-auto border-t border-neutral-200 bg-white opacity-0 shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex h-[42px] items-center border-b border-neutral-100 bg-white px-4 text-[11px]">
                      <span className="mr-4 text-neutral-300">Shop By:</span>
                      <span className="bg-[#f8f8f8] px-3 py-3 text-[15px] font-semibold tracking-[0.08em] text-[#254b64]">{item}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-x-5 px-4 pb-5 pt-2">
                      {navItems[item].map((column, columnIndex) => (
                        <div key={columnIndex} className="space-y-3">
                          {column.map((section) => (
                            <div key={section.title}>
                              <div className="mb-1 flex items-center gap-1">
                                <h3 className="text-[13px] font-bold tracking-[0.05em] text-neutral-800">{section.title}</h3>
                                {section.badge && <span className={`rounded-full px-1 py-px text-[5px] font-bold text-white ${section.badge === "NEW" ? "bg-red-500" : "bg-[#ffbf19]"}`}>{section.badge}</span>}
                              </div>
                              <div className="flex flex-col">
                                {section.items.map((subItem) => <Link href={`/shop?category=${slugify(subItem)}`} key={subItem} className="w-fit py-0 text-[6px] leading-[10px] text-neutral-500 transition-colors hover:text-blue-600 hover:underline">{subItem}</Link>)}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
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
            <div className="ml-2 flex items-center gap-1 text-black sm:ml-4 sm:gap-2 lg:ml-7 lg:gap-4 xl:gap-[21px] xl:pr-4">
              
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
    <nav className="fixed inset-x-0 bottom-0 z-[150] grid h-[62px] grid-cols-5 border-t border-neutral-200 bg-white pb-1 sm:hidden">
      {[[HomeIcon, "Home", "/"], [List, "Category", "/shop"], [Sparkles, "New", "/shop"], [ShoppingCart, "Bag", "/shop"], [User, "Me", "/login"]].map(([Icon, label, href]) => <Link href={String(href)} key={String(label)} className="flex flex-col items-center justify-center gap-1 text-[10px] text-neutral-700"><Icon className="h-[19px] w-[19px]" /><span>{String(label)}</span></Link>)}
    </nav>
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