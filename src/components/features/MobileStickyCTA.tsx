import { Phone, MessageCircle, MapPin } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";

export default function MobileStickyCTA() {
  const scrollToPlanner = () => {
    const el = document.getElementById("trip-planner");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-2xl safe-bottom">
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        <a
          href={`tel:${KMD_CONFIG.phone}`}
          className="flex flex-col items-center justify-center py-3 gap-1 text-navy hover:bg-gray-50 transition-colors"
        >
          <Phone className="w-5 h-5" />
          <span className="text-xs font-semibold">Call</span>
        </a>
        <a
          href={`https://wa.me/${KMD_CONFIG.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-3 gap-1 text-green-600 hover:bg-green-50 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-semibold">WhatsApp</span>
        </a>
        <button
          onClick={scrollToPlanner}
          className="flex flex-col items-center justify-center py-3 gap-1 bg-orange-brand text-white hover:bg-orange-dark transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-xs font-semibold">Book Now</span>
        </button>
      </div>
    </div>
  );
}
