import {
  Headphones,
  Heart,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

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
  return (
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
                className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
              >
                <Heart className="h-[19px] w-[19px] stroke-[1.8]" />
              </button>

              <button
                type="button"
                aria-label="Cart"
                className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
              >
                <ShoppingCart className="h-[19px] w-[19px] stroke-[1.8]" />
              </button>

              <button
                type="button"
                aria-label="Account"
                className="flex h-7 w-7 items-center justify-center transition-transform hover:scale-110"
              >
                <User className="h-[19px] w-[19px] stroke-[1.8]" />
              </button>

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
  );
}