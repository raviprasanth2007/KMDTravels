import { Phone, MessageCircle, Star, Shield, Award } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";
import { useState } from "react";
import heroVideo from "@/assets/kmd-travels-hero.mp4";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariant, heroStaggerVariant } from "@/lib/animations";

interface HeroSectionProps {
  onPlanTrip: () => void;
}

export default function HeroSection({ onPlanTrip }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 bg-navy overflow-hidden pointer-events-none">
        {/* Dynamic Motion Video */}
        {!shouldReduceMotion && (
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={() => setIsVideoLoaded(true)}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={(e) => console.error("KMD Hero Video failed to load:", e)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 0.45 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <source 
              src={heroVideo}
              type="video/mp4" 
            />
          </motion.video>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />

      {/* Content */}
      <div className="relative z-10 container-default pt-20 pb-32 md:pt-24 md:pb-36">
        <motion.div 
          className="max-w-2xl"
          variants={heroStaggerVariant}
          initial="hidden"
          animate="visible"
        >
          {/* Trust badge */}
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-orange-brand" />
            <span className="text-white text-sm font-medium">Trusted Travel Partner Since {new Date().getFullYear() - parseInt(KMD_CONFIG.yearsInBusiness)}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={fadeUpVariant} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Travel Anywhere.{" "}
            <span className="text-orange-brand">We'll Take</span>
            <br />
            You There.
          </motion.h1>

          <motion.p variants={fadeUpVariant} className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
            Comfortable, Reliable & Affordable Travel Across India.
            Book cabs, travellers and vans from Sathyamangalam with transparent pricing.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, boxShadow: "0px 10px 25px rgba(239, 108, 0, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlanTrip}
              className="btn-primary text-base py-4 px-8 shadow-2xl relative overflow-hidden group"
            >
              <span className="relative z-10">Plan Your Trip</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-out]" 
              />
            </motion.button>
            <motion.a
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${KMD_CONFIG.phone}`}
              className="btn-outline text-base py-4 px-8 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call KMD Travels
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div variants={heroStaggerVariant} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Star, value: `${KMD_CONFIG.rating}★`, label: "Rating" },
              { icon: Award, value: KMD_CONFIG.yearsInBusiness, label: "Years Service" },
              { icon: Shield, value: "24/7", label: "Support" },
              { icon: MessageCircle, value: "All India", label: "Coverage" },
            ].map(({ icon: Icon, value, label }) => (
              <motion.div 
                key={label}
                variants={fadeUpVariant}
                whileHover={shouldReduceMotion ? {} : { y: -5, backgroundColor: "rgba(255,255,255,0.15)" }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/15 text-center transition-colors"
              >
                <Icon className="w-5 h-5 text-orange-brand mx-auto mb-1" />
                <div className="text-white font-bold text-lg leading-none">{value}</div>
                <div className="text-gray-300 text-xs mt-1">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* WhatsApp floating (desktop) */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        href={`https://wa.me/${KMD_CONFIG.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-24 md:bottom-8 z-50 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </motion.a>
    </section>
  );
}
