'use client';

import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columnsPerRow?: number;
}

export default function ProductGrid({
  products,
  columnsPerRow = 5,
}: ProductGridProps) {
  return (
    <div
      className="grid gap-5"
      style={{
        gridTemplateColumns: `repeat(${columnsPerRow}, minmax(0, 1fr))`,
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
