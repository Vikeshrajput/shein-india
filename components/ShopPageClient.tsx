"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Grid2X2, List, SlidersHorizontal } from "lucide-react";

type Product = { id: number; name: string; price: number; image_url: string };
const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const titleFromSlug = (slug: string) => slug.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

export default function ShopPageClient({ slug }: { slug: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState("relevance");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [filtersOpen, setFiltersOpen] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams({ search, maxPrice: String(maxPrice), sort });
    fetch(`${apiBaseUrl}/products?${query}`).then((response) => response.json()).then(setProducts).catch(() => setProducts([]));
  }, [search, maxPrice, sort]);

  const title = titleFromSlug(slug);
  const sortedProducts = useMemo(() => [...products].sort((a, b) => sort === "price-asc" ? a.price - b.price : sort === "price-desc" ? b.price - a.price : 0), [products, sort]);

  return <main className="min-h-screen bg-white text-neutral-800"><div className="mx-auto max-w-[1240px] px-5 pb-16 pt-5">
    <p className="text-[11px] text-[#537084]">Home&nbsp; / &nbsp;{title}</p>
    <div className="grid gap-5 pt-4 lg:grid-cols-[220px_1fr]">
      <aside className="text-[13px] lg:col-start-1 lg:row-start-1"><button type="button" onClick={() => setFiltersOpen(!filtersOpen)} className="flex w-full items-center justify-between border-b border-neutral-100 pb-4 text-left text-[17px] font-semibold lg:pointer-events-none">Refine By {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}</button>{filtersOpen && <div>
        <div className="border-b border-neutral-100 py-5"><p className="mb-3 font-medium">- &nbsp;Gender</p><label className="flex items-center gap-2 pl-5 text-[12px]"><input type="checkbox" /> Women (613)</label></div>
        <div className="border-b border-neutral-100 py-5"><p className="mb-3 font-medium">- &nbsp;Category</p><label className="flex items-center gap-2 pl-5 text-[12px]"><input type="checkbox" /> {title} (613)</label></div>
        <label className="block border-b border-neutral-100 py-5"><span className="font-medium">+ &nbsp;Price</span><input type="range" min="0" max="2000" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} className="mt-4 w-full accent-[#31536a]" /><span className="mt-1 block text-[11px] text-neutral-500">Up to ₹{maxPrice}</span></label>
        {["Brands", "Occasion", "Discount", "Colors", "Size & Fit", "Spotlight"].map((filter) => <div key={filter} className="border-b border-neutral-100 py-5 font-medium">+ &nbsp;{filter}</div>)}
      </div>}</aside>
      <section className="min-w-0 lg:col-start-2 lg:row-start-1"><h1 className="py-2 text-center text-[28px] font-normal text-neutral-900 sm:text-[34px]">{title}</h1>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-neutral-100 bg-[#fafafa] px-3 py-3 text-[12px]"><strong>{products.length || 613} Items Found</strong><div className="flex items-center gap-3"><span className="text-neutral-500">GRID</span><Grid2X2 className="h-5 w-5" /><List className="h-5 w-5 text-neutral-400" /><SlidersHorizontal className="ml-5 h-4 w-4" /><span className="text-neutral-500">SORT BY</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="border border-neutral-400 bg-white px-2 py-1 text-[11px]"><option value="relevance">Relevance</option><option value="price-asc">Price: Low to High</option><option value="price-desc">Price: High to Low</option></select></div></div>
        <div className="mb-4 mt-5 flex justify-end"><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search this category" className="w-52 border-b border-neutral-300 px-2 py-1 text-xs outline-none focus:border-black" /></div>
        {sortedProducts.length > 0 ? <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{sortedProducts.map((product) => <article key={product.id} className="min-w-0 text-center"><div className="aspect-[0.78] overflow-hidden bg-neutral-100"><img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" /></div><p className="mt-2 text-[11px] font-semibold">Shein</p><h2 className="mt-1 line-clamp-2 text-[12px] leading-4 text-neutral-600">{product.name}</h2><p className="mt-2 text-[13px] font-semibold">₹{product.price}</p><p className="mt-1 text-[11px] text-emerald-600">Offer price ₹{Math.round(product.price * 0.6)}</p></article>)}</div> : <div className="py-20 text-center text-sm text-neutral-500">No products found for this category.</div>}
      </section>
    </div>
  </div></main>;
}
