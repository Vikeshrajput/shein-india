interface ColorSelectorProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  colors?: string[];
}

const colorMap: Record<string, string> = {
  'Yellow': '#FFF4A3',
  'Blue': '#ADD8E6',
  'Green': '#90EE90',
  'Beige': '#F5DEB3',
  'Purple': '#DDA0DD',
  'Navy Blue': '#000080',
  'White': '#FFFFFF',
  'Coral': '#FF7F50',
  'Multi': '#FFB6C1',
  'Khaki': '#F0E68C',
  'Black': '#000000',
  'Rose': '#FF007F',
  'Red & White': '#FF0000',
  'Mint Green': '#98FF98',
  'Peach': '#FFDAB9',
  'Light Blue': '#ADD8E6',
  'Leopard': '#D4A574',
};

export default function ColorSelector({
  selectedColor,
  onColorChange,
  colors = ['Yellow', 'Coral'],
}: ColorSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-[#222222] mb-4">{selectedColor}</h3>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`w-10 h-10 rounded-full border-2 transition-all ${
              selectedColor === color
                ? 'border-[#222222] shadow-md'
                : 'border-[#d9d9d9] hover:border-[#999999]'
            }`}
            style={{
              backgroundColor: colorMap[color] || '#CCCCCC',
            }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
