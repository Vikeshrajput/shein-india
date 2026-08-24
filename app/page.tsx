'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Gift, Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85', label: 'THE NEW SEASON EDIT', title: 'Modern\nEssentials', detail: 'Fresh shapes. Easy layers. Your everyday wardrobe, refreshed.', price: '549' },
  { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85', label: 'WEEKEND DRESSING', title: 'Made to\nstand out', detail: 'Statement pieces for plans that were never meant to be ordinary.', price: '399' },
  { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=85', label: 'NEW ARRIVALS', title: 'Your next\nfavourite look', detail: 'The latest drops have landed. Find your new signature style.', price: '499' },
];

const offerSlides = [
  { title: '15% OFF', detail: 'on orders above ₹599', code: 'WELCOME15', color: 'bg-[#f3d8e9]' },
  { title: 'UP TO 40% OFF', detail: 'app-exclusive styles', code: 'APPSTYLE', color: 'bg-[#dbe8ed]' },
  { title: 'FREE SHIPPING', detail: 'on your first order', code: 'FIRSTLOOK', color: 'bg-[#e9e1d4]' },
];

const categories = [
  ['Women', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80', 'women'],
  ['Jeans & Jeggings', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80', 'denim-jeans'],
  ['T-shirts', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80', 't-shirts'],
  ['Tops & Shirts', 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80', 'tops'],
  ['Dresses', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=80', 'dresses'],
  ['Jewellery', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80', 'jewellery'],
  ['Footwear', 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=700&q=80', 'footwear'],
  ['Beauty', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80', 'beauty'],
];

const editTiles = [
  ['Clean Wash Denim', 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85'],
  ['Mini Dresses', 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=85'],
  ['Work Tops', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85'],
  ['Statement Tees', 'https://images.unsplash.com/photo-1503341504253-dff6f65e7b31?auto=format&fit=crop&w=900&q=85'],
  ['Floral Midi', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85'],
];

export default function Home() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [offerSlide, setOfferSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setHeroSlide((slide) => (slide + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setOfferSlide((slide) => (slide + 1) % offerSlides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const activeHero = heroSlides[heroSlide];
  const activeOffer = offerSlides[offerSlide];

  return (
    <main className="min-h-screen bg-white text-[#171717]">
      <section className="relative mx-auto max-w-[1600px] overflow-hidden bg-[#e8e5e0]"><div className="relative h-[430px] sm:h-[520px] lg:h-[600px]"><img src={activeHero.image} alt={activeHero.title.replace('\n', ' ')} className="h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/25 to-transparent" /><div className="absolute inset-0 flex items-center px-7 sm:px-12 lg:px-20"><div className="max-w-[470px]"><p className="mb-4 text-[11px] font-bold tracking-[0.24em] text-[#3b5661] sm:text-[13px]">{activeHero.label}</p><h1 className="whitespace-pre-line text-[54px] font-black uppercase leading-[0.86] tracking-[-0.07em] sm:text-[76px] lg:text-[94px]">{activeHero.title}</h1><p className="mt-6 max-w-[320px] text-sm leading-6 text-neutral-700 sm:text-base">{activeHero.detail}</p><div className="mt-7 flex items-end gap-5"><div><p className="text-xs uppercase tracking-[0.18em] text-neutral-600">Starting from</p><p className="mt-1 text-4xl font-black tracking-[-0.06em]">₹{activeHero.price}</p></div><Link href="/shop?category=women" className="bg-black px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#31536a]">Shop now</Link></div></div></div><div className="absolute bottom-6 left-7 right-7 flex items-center justify-between sm:left-12 sm:right-12 lg:left-20 lg:right-20"><div className="flex gap-2">{heroSlides.map((slide, index) => <button key={slide.label} type="button" aria-label={`Show hero slide ${index + 1}`} onClick={() => setHeroSlide(index)} className={`h-1 transition-all ${heroSlide === index ? 'w-12 bg-black' : 'w-6 bg-black/30'}`} />)}</div><div className="flex gap-2"><button type="button" aria-label="Previous hero slide" onClick={() => setHeroSlide((heroSlide + heroSlides.length - 1) % heroSlides.length)} className="flex h-9 w-9 items-center justify-center border border-black/30 bg-white/70 hover:bg-white"><ArrowLeft className="h-4 w-4" /></button><button type="button" aria-label="Next hero slide" onClick={() => setHeroSlide((heroSlide + 1) % heroSlides.length)} className="flex h-9 w-9 items-center justify-center border border-black/30 bg-white/70 hover:bg-white"><ArrowRight className="h-4 w-4" /></button></div></div></div></section>

      <section className="border-b border-[#e7e2dc] bg-[#f6f1eb]"><div className="mx-auto grid max-w-[1180px] grid-cols-1 divide-y divide-[#ded6cc] sm:grid-cols-3 sm:divide-x sm:divide-y-0">{[['Free shipping', 'On orders above ₹999', Truck], ['Easy returns', 'Hassle-free policy', RotateCcw], ['Assured quality', 'Made for every day', ShieldCheck]].map(([title, detail, Icon]) => <div key={String(title)} className="flex items-center justify-center gap-3 px-5 py-4"><Icon className="h-6 w-6 text-[#31536a]" /><div><p className="text-xs font-bold uppercase tracking-[0.12em]">{String(title)}</p><p className="mt-1 text-[11px] text-neutral-500">{String(detail)}</p></div></div>)}</div></section>

      <section className="mx-auto max-w-[1280px] px-5 py-7 sm:px-8"><div className={`relative overflow-hidden ${activeOffer.color} px-6 py-5 sm:px-10`}><div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"><div><p className="text-2xl font-black tracking-[-0.05em] sm:text-3xl">{activeOffer.title}</p><p className="mt-1 text-sm text-neutral-600">{activeOffer.detail}</p></div><div className="flex items-center gap-3"><div className="border border-black/15 bg-white/70 px-4 py-2 text-center"><p className="text-[9px] uppercase tracking-[0.15em] text-neutral-500">Use code</p><p className="text-sm font-black tracking-[0.12em]">{activeOffer.code}</p></div><Link href="/shop" className="bg-black px-5 py-3 text-xs font-bold uppercase tracking-[0.13em] text-white">Grab now</Link></div></div><div className="mt-5 flex justify-center gap-2">{offerSlides.map((slide, index) => <button key={slide.code} type="button" aria-label={`Show offer ${index + 1}`} onClick={() => setOfferSlide(index)} className={`h-1 transition-all ${offerSlide === index ? 'w-10 bg-black' : 'w-5 bg-black/25'}`} />)}</div></div></section>

      <section className="mx-auto max-w-[1280px] px-5 pb-10 sm:px-8"><div className="mb-5 flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#31536a]">Shop the edit</p><h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.05em] sm:text-3xl">Find your mood</h2></div><Link href="/shop" className="text-xs font-bold uppercase tracking-[0.12em] underline underline-offset-4">View all</Link></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{categories.map(([label, image, slug]) => <Link href={`/shop?category=${slug}`} key={label} className="group text-center"><div className="aspect-square overflow-hidden rounded-full bg-[#eeeae6]"><img src={image} alt={label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></div><p className="mt-3 text-[11px] font-medium sm:text-xs">{label}</p></Link>)}</div></section>

      <section className="bg-[#f7f7f7] px-5 py-10 sm:px-8"><div className="mx-auto max-w-[1280px]"><div className="mb-5 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#31536a]">Curated for you</p><h2 className="mt-1 text-2xl font-black uppercase tracking-[-0.05em] sm:text-3xl">The daily rotation</h2></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{editTiles.map(([label, image]) => <Link href="/shop" key={label} className="group relative aspect-[0.75] overflow-hidden"><img src={image} alt={label} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-black/65 px-3 py-3 text-center text-xs font-bold uppercase tracking-[0.08em] text-white">{label}</div></Link>)}</div></div></section>

      <footer className="bg-[#263e4d] px-6 py-12 text-white sm:px-10"><div className="mx-auto max-w-[1280px]"><div className="grid gap-9 border-b border-white/15 pb-10 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-lg font-black tracking-[0.18em]">SHEIN</p><p className="mt-4 max-w-[220px] text-xs leading-5 text-white/60">Style that moves with you. Discover new looks every day.</p></div>{[['Help', 'Track Your Order', 'Returns & Refunds', 'Shipping Info', 'Contact Us'], ['About SHEIN', 'About Us', 'SHEIN Careers', 'Sustainability', 'Our Commitments'], ['Shop by', 'Women', 'Men', 'Trending', 'New Arrivals']].map(([title, ...items]) => <div key={title}><h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/90">{title}</h3><div className="mt-4 space-y-2">{items.map((item) => <Link href="/shop" key={item} className="block text-xs text-white/60 transition-colors hover:text-white">{item}</Link>)}</div></div>)}</div><div className="flex flex-col justify-between gap-4 pt-6 text-xs text-white/55 sm:flex-row"><p>© 2026 SHEIN. All rights reserved.</p><div className="flex items-center gap-2"><Gift className="h-4 w-4" /> Secure payments and support <Headphones className="ml-3 h-4 w-4" /></div></div></div></footer>
    </main>
  );
}