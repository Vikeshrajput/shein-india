'use client';

import { X } from 'lucide-react';

interface FilterChip {
  id: string;
  label: string;
  type: string;
}

interface ActiveFilterChipsProps {
  chips: FilterChip[];
  onRemoveChip: (chipId: string) => void;
}

export default function ActiveFilterChips({
  chips,
  onRemoveChip,
}: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 mb-6 pb-4">
      {chips.map((chip) => (
        <div
          key={chip.id}
          className="flex items-center gap-2 bg-white border border-[#d9d9d9] px-3 py-1.5 text-sm text-[#666666] rounded-sm"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveChip(chip.id)}
            className="ml-1 text-[#999999] hover:text-[#222222] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
