'use client';

import { Product } from '@/data/products';
import { Share2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);

  const visibleThumbnails = product.images.length > 5 
    ? product.images.slice(thumbnailStartIndex, thumbnailStartIndex + 5)
    : product.images;

  const handleThumbnailScroll = (direction: 'up' | 'down') => {
    if (direction === 'up' && thumbnailStartIndex > 0) {
      setThumbnailStartIndex(thumbnailStartIndex - 1);
    } else if (direction === 'down' && thumbnailStartIndex < product.images.length - 5) {
      setThumbnailStartIndex(thumbnailStartIndex + 1);
    }
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnail Column */}
      <div className="flex flex-col gap-2">
        {product.images.length > 5 && (
          <button
            onClick={() => handleThumbnailScroll('up')}
            className="text-[#666666] hover:text-[#222222]"
          >
            <ChevronUp size={18} />
          </button>
        )}

        <div className="flex flex-col gap-2">
          {visibleThumbnails.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(thumbnailStartIndex + index)}
              className={`relative overflow-hidden border-2 transition-colors ${
                selectedImageIndex === thumbnailStartIndex + index
                  ? 'border-[#222222]'
                  : 'border-[#d9d9d9] hover:border-[#999999]'
              }`}
              style={{ width: '55px', height: '70px' }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {product.images.length > 5 && (
          <button
            onClick={() => handleThumbnailScroll('down')}
            className="text-[#666666] hover:text-[#222222]"
          >
            <ChevronDown size={18} />
          </button>
        )}
      </div>

      {/* Main Image */}
      <div className="relative" style={{ width: '520px', height: '640px' }}>
        <img
          src={product.images[selectedImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Share Button */}
        <button className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-shadow">
          <Share2 size={20} className="text-[#222222]" />
        </button>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedImageIndex(
                  selectedImageIndex === 0 ? product.images.length - 1 : selectedImageIndex - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft size={20} className="text-[#222222]" />
            </button>
            <button
              onClick={() =>
                setSelectedImageIndex(
                  selectedImageIndex === product.images.length - 1 ? 0 : selectedImageIndex + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight size={20} className="text-[#222222]" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
