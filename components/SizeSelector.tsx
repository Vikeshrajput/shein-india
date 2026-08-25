interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-[#222222] mb-4">Select Size</h3>
      <div className="flex gap-3 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`w-12 h-12 font-semibold text-sm transition-all border-2 flex items-center justify-center rounded-sm ${
              selectedSize === size
                ? 'bg-[#222222] text-white border-[#222222]'
                : 'bg-white text-[#222222] border-[#d9d9d9] hover:border-[#999999]'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
