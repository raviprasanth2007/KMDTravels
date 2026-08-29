import { MapPin, ArrowLeftRight, Plane, Train, Users, Briefcase, Camera } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUpVariant, staggerContainerVariant } from "@/lib/animations";
import { useState } from "react";
import servicesVideo from "@/assets/kmd-travels-services.mp4";

const SERVICES = [
  { icon: MapPin, title: "Outstation Taxi", desc: "Comfortable outstation trips with experienced drivers across all Indian states." },
  { icon: ArrowLeftRight, title: "One-Way Taxi", desc: "Cost-effective one-way journeys with fair minimum billing." },
  { icon: ArrowLeftRight, title: "Round Trip", desc: "Round trips with driver availability throughout your stay." },
  { icon: Plane, title: "Airport Transfers", desc: "Reliable airport pickup and drop across Tamil Nadu and beyond." },
  { icon: Train, title: "Railway Transfers", desc: "Station pickups and drops at all times. Never miss your train." },
  { icon: Users, title: "Family Travel", desc: "Spacious, comfortable vehicles for family vacations and pilgrimages." },
  { icon: Briefcase, title: "Corporate Travel", desc: "Professional corporate car service for business teams." },
  { icon: Users, title: "Group Travel", desc: "Large-group travel with travellers and vans up to 20 passengers." },
  { icon: Camera, title: "Tourist Trips", desc: "Customised sightseeing tours to temples, hills and tourist destinations." },
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section id="services" className="relative section-padding bg-navy overflow-hidden">
      {/* Cinematic Video Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0 bg-navy">
        {!shouldReduceMotion && (
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setIsVideoLoaded(true)}
            onError={(e) => console.error("KMD Services Video failed to load:", e)}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoLoaded ? 0.45 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute min-w-full min-h-full w-auto h-auto object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <source src={servicesVideo} type="video/mp4" />
          </motion.video>
        )}
        {/* Removed extra overlay to allow video to be more visible at 45% opacity */}
      </div>

      <div className="container-default relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-blue-300 max-w-xl mx-auto">
            From quick city transfers to long-distance All India tours — we have the right vehicle and service for every journey.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUpVariant}
                whileHover={{ scale: 1.03, y: -5, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(239, 108, 0, 0.5)" }}
                className="group bg-white/5 border border-white/10 rounded-xl p-6 transition-colors cursor-default"
              >
                <div className="w-11 h-11 bg-orange-brand/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-orange-brand" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{service.title}</h3>
                <p className="text-blue-300 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
