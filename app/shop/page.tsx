"use client";

import { useEffect, useState } from "react";
import ShopPageClient from "@/components/ShopPageClient";

export default function ShopPage() {
  const [category, setCategory] = useState("a-line-dresses");

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("category");
    if (value) setCategory(value);
  }, []);

  return <ShopPageClient slug={category} />;
}
