import ShopPageClient from "@/components/ShopPageClient";

export const dynamicParams = false;

const staticShopSlugs = [
  "a-line-dresses", "mini-dresses", "midi-dresses", "maxi-dresses", "asymmetrical",
  "shirts", "tanks-and-camis", "tops", "t-shirts", "capris", "cargos", "leggings", "palazzos", "shorts", "skirts", "track-pants", "trousers", "swimwear",
  "jeans", "bras", "lingerie-sets", "panties", "shapewear", "hoodies", "jackets", "shrugs", "sweaters", "sweatshirt", "casual-shoes", "flats", "sneakers",
  "mock-neck-t-shirts", "polo-collar-t-shirts", "v-neck-t-shirts", "oversized-t-shirts", "graphic-t-shirts", "casual-shirts", "sneakers-and-sport-shoes", "boots",
  "viral-picks", "best-sellers", "most-loved", "whats-new", "trending-dresses", "trending-tops", "trending-jeans", "trending-sets", "new-season", "latest-drops", "top-rated", "customer-favorites", "most-purchased",
];

export function generateStaticParams(): { slug: string }[] {
  return staticShopSlugs.map((slug) => ({ slug }));
}

export default async function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ShopPageClient slug={slug} />;
}
