import { Phone, MessageCircle, Star, Shield, Award } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onPlanTrip: () => void;
}

export default function HeroSection({ onPlanTrip }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />

      {/* Content */}
      <div className="relative z-10 container-default pt-20 pb-32 md:pt-24 md:pb-36">
        <div className="max-w-2xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 slide-up">
            <Shield className="w-4 h-4 text-orange-brand" />
            <span className="text-white text-sm font-medium">Trusted Travel Partner Since {new Date().getFullYear() - parseInt(KMD_CONFIG.yearsInBusiness)}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 slide-up">
            Travel Anywhere.{" "}
            <span className="text-orange-brand">We'll Take</span>
            <br />
            You There.
          </h1>

          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed slide-up">
            Comfortable, Reliable & Affordable Travel Across India.
            Book cabs, travellers and vans from Sathyamangalam with transparent pricing.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 fade-in">
            <button
              onClick={onPlanTrip}
              className="btn-primary text-base py-4 px-8 pulse-cta shadow-2xl"
            >
              Plan Your Trip
            </button>
            <a
              href={`tel:${KMD_CONFIG.phone}`}
              className="btn-outline text-base py-4 px-8 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call KMD Travels
            </a>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 fade-in">
            {[
              { icon: Star, value: `${KMD_CONFIG.rating}★`, label: "Rating" },
              { icon: Award, value: KMD_CONFIG.yearsInBusiness, label: "Years Service" },
              { icon: Shield, value: "24/7", label: "Support" },
              { icon: MessageCircle, value: "All India", label: "Coverage" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 text-center">
                <Icon className="w-5 h-5 text-orange-brand mx-auto mb-1" />
                <div className="text-white font-bold text-lg leading-none">{value}</div>
                <div className="text-gray-300 text-xs mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp floating (desktop) */}
      <a
        href={`https://wa.me/${KMD_CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-24 md:bottom-8 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </section>
  );
}
