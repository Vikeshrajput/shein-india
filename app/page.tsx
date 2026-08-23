
'use client';

import { useEffect, useState } from 'react';

const bannerImages = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80',
];

const categories = [
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f2f1] text-neutral-900">
      <section className="mx-auto max-w-[1460px] overflow-hidden bg-[#f2f2f0]">
        <div className="relative h-[330px] overflow-hidden bg-[#efefef]">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {bannerImages.map((image, index) => (
              <div key={index} className="relative h-full w-full shrink-0">
                <img
                  src={image}
                  alt="Fashion banner"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.12),rgba(255,255,255,0.05),rgba(255,255,255,0.12))]" />

                <div className="absolute inset-0 flex items-center justify-between px-8">
                  <div className="pl-8 pt-6 text-[#111111]">
                    <h1 className="text-[66px] font-black uppercase leading-[0.82] tracking-[-0.08em]">
                      THE
                      <span className="mt-1 block">MODERN EDIT</span>
                    </h1>
                  </div>

                  <div className="flex items-center justify-center gap-5 pr-8 pt-2">
                    <div className="w-[180px] overflow-hidden rounded-[26px] bg-white/10 shadow-[0_14px_24px_rgba(0,0,0,0.08)]">
                      <img
                        src="https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80"
                        alt="Model in orange shirt"
                        className="h-[250px] w-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="pr-4 pt-8 text-[#1a1a1a]">
                    <p className="text-[24px] font-medium italic">Starting from</p>
                    <p className="mt-2 text-[78px] font-black leading-none tracking-[-0.08em]">
                      ₹<span className="text-[84px]">549</span>
                    </p>
                    <button
                      type="button"
                      className="mt-5 rounded-none bg-black px-7 py-3 text-[18px] font-extrabold uppercase tracking-[0.06em] text-white"
                    >
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Slide ${index + 1}`}
                className={`h-[5px] rounded-full transition-all duration-300 ${
                  activeSlide === index ? 'w-10 bg-neutral-900' : 'w-5 bg-neutral-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#e6dfd7] bg-[#f3efe9]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-3 gap-0 px-6 py-0 text-[13px] font-semibold text-neutral-700">
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900">
              <span className="text-xl">🚚</span>
            </div>
            <div>
              <div className="text-[15px] font-bold text-black">Free Shipping</div>
              <div className="text-[12px] text-neutral-600">On all orders</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 border-x border-[#dbd4ca] px-8 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900">
              <span className="text-xl">🔄</span>
            </div>
            <div>
              <div className="text-[15px] font-bold text-black">Easy Returns</div>
              <div className="text-[12px] text-neutral-600">Hassle free policy</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-900">
              <span className="text-xl">📦</span>
            </div>
            <div>
              <div className="text-[15px] font-bold text-black">Fast Delivery</div>
              <div className="text-[12px] text-neutral-600">Track every order</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-5">
        <div className="flex items-center justify-between gap-4 rounded-[10px] border border-[#d9bff0] bg-[#f1dff8] px-6 py-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)]">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-[17px] font-black uppercase tracking-[-0.03em] text-[#2a1a2c]">
              Get 15% off on orders above ₹599
            </p>
            <p className="mt-1 text-[11px] text-[#6b4e74]">
              Get upto 40% off & more offers on mobile app exclusively
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="rounded-[6px] border border-[#d9b3eb] bg-white px-4 py-2 text-center">
              <span className="text-[11px] font-semibold uppercase text-[#4a2b54]">Use Code:</span>
              <span className="ml-2 text-[18px] font-black tracking-[0.08em] text-[#4a2b54]">
                WELCOME15
              </span>
            </div>
            <button
              type="button"
              className="rounded-[6px] bg-black px-7 py-3 text-[15px] font-black uppercase tracking-[0.06em] text-white"
            >
              Grab Now
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1300px] px-6 pb-16 pt-2">
        <div className="grid grid-cols-4 gap-6">
          {categories.map((image, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-[250px] w-[210px] overflow-hidden rounded-full bg-[#e8e2df] shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
                <img
                  src={image}
                  alt="Category card"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
