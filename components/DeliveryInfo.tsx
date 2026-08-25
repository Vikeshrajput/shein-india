import { MapPin } from 'lucide-react';

interface DeliveryInfoProps {
  selectedSize: string | null;
}

export default function DeliveryInfo({ selectedSize }: DeliveryInfoProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-[#666666] mb-6 p-4 bg-[#f9f9f9] rounded-sm">
      <MapPin size={18} className="text-[#999999] shrink-0" />
      <div>
        {!selectedSize ? (
          <p>Select your size to know your estimated delivery date.</p>
        ) : (
          <p>Enter Pin-code To Know Estimated Delivery Date</p>
        )}
      </div>
    </div>
  );
}
