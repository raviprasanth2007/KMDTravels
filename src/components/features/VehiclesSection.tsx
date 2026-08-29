import { Users, Briefcase, Zap } from "lucide-react";
import { VEHICLES } from "@/constants/vehicles";
import { formatCurrency } from "@/lib/fareCalculator";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainerFastVariant } from "@/lib/animations";

interface VehiclesSectionProps {
  onBookVehicle?: (vehicleId: string) => void;
}

export default function VehiclesSection({ onBookVehicle }: VehiclesSectionProps) {
  return (
    <section id="vehicles" className="section-padding bg-white">
      <div className="container-default">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="inline-flex items-center gap-2 bg-navy/10 text-navy text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Fleet
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Our Vehicles</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From compact sedans to large coaches — all well-maintained, GPS-tracked and driven by experienced professionals.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerFastVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {VEHICLES.map((vehicle) => (
            <motion.div 
              key={vehicle.id} 
              variants={fadeUpVariant}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              className="card-premium group overflow-hidden bg-white border border-gray-100 shadow-md hover:shadow-xl rounded-2xl transition-shadow"
            >
              {vehicle.popular && (
                <div className="bg-orange-brand text-white text-xs font-bold px-4 py-1.5 text-center">
                  Most Popular
                </div>
              )}
              <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="h-36 object-contain mix-blend-multiply"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop&auto=format`;
                  }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{vehicle.name}</h3>
                    <p className="text-gray-400 text-xs">{vehicle.shortName}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-navy">{formatCurrency(vehicle.ratePerKm)}<span className="text-xs font-normal text-gray-400">/km</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-travel-blue" />{vehicle.capacity} Seats</span>
                  <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-travel-blue" />{vehicle.luggageCapacity}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {vehicle.features.slice(0, 3).map((f) => (
                    <span key={f} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
                      <Zap className="w-3 h-3 text-orange-brand" />{f}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  Min {vehicle.minimumKm} km • Driver ₹{vehicle.driverAllowancePerDay}/day
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const el = document.getElementById("trip-planner");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full btn-navy py-2.5 text-sm rounded-lg"
                >
                  Book This Vehicle
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
