import { MapPin, ArrowRight, Clock, Zap } from "lucide-react";
import { POPULAR_ROUTES, PopularRoute } from "@/constants/routes";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainerVariant } from "@/lib/animations";

interface PopularRoutesProps {
  onSelectRoute: (from: string, to: string) => void;
}

export default function PopularRoutes({ onSelectRoute }: PopularRoutesProps) {
  const handleClick = (route: PopularRoute) => {
    onSelectRoute(
      `${route.from}, Tamil Nadu`,
      route.from === "Coimbatore" || route.from === "Chennai" || route.from === "Bangalore"
        ? route.to.includes(",")
          ? route.to
          : `${route.to}`
        : route.to.includes(",")
        ? route.to
        : `${route.to}`
    );
    const el = document.getElementById("trip-planner");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="routes" className="section-padding bg-white">
      <div className="container-default">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-brand text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4" />
            Quick Book
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Popular Routes</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Click any route to instantly populate the trip planner with pre-calculated distances.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {POPULAR_ROUTES.map((route) => (
            <motion.button
              key={route.id}
              variants={fadeUpVariant}
              whileHover={{ scale: 1.02, y: -4, boxShadow: "0px 8px 20px rgba(0,0,0,0.06)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleClick(route)}
              className="group card-premium p-5 text-left bg-white border border-gray-100 rounded-xl"
            >
              {route.highlight && (
                <span className="inline-block bg-orange-100 text-orange-brand text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                  {route.highlight}
                </span>
              )}
              <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-3">
                <MapPin className="w-3.5 h-3.5 text-travel-blue shrink-0 group-hover:scale-110 transition-transform" />
                <span>{route.from}</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-brand transition-colors" />
                </motion.div>
                <span>{route.to}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="font-medium text-navy">{route.distance} km</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {route.duration}
                </span>
              </div>
              <div className="mt-3 w-full h-0.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-orange-brand w-0 group-hover:w-full transition-all duration-500 ease-out" 
                />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
