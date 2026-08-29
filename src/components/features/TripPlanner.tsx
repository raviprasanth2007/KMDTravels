import { useState } from "react";
import { Calendar, Users, ArrowRight, ArrowLeftRight, Loader2, AlertCircle, Clock, Navigation, Map } from "lucide-react";
import LocationSelector from "./LocationSelector";
import { getDistance } from "@/constants/routes";
import { TripDetails, JourneyType } from "@/types/booking";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { slideUpVariant, fadeInVariant } from "@/lib/animations";

interface TripPlannerProps {
  onCalculated: (trip: TripDetails) => void;
  initialTrip?: Partial<TripDetails>;
}

export default function TripPlanner({ onCalculated, initialTrip }: TripPlannerProps) {
  const today = new Date().toISOString().split("T")[0];
  const [pickup, setPickup] = useState(initialTrip?.pickup || "");
  const [destination, setDestination] = useState(initialTrip?.destination || "");
  const [journeyType, setJourneyType] = useState<JourneyType>(initialTrip?.journeyType || "one-way");
  const [travelDate, setTravelDate] = useState(initialTrip?.travelDate || "");
  const [returnDate, setReturnDate] = useState(initialTrip?.returnDate || "");
  const [passengers, setPassengers] = useState(initialTrip?.passengers || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    if (!pickup.trim()) return setError("Please enter a pickup location.");
    if (!destination.trim()) return setError("Please enter a destination.");
    if (pickup.trim().toLowerCase() === destination.trim().toLowerCase())
      return setError("Pickup and destination cannot be the same.");
    if (!travelDate) return setError("Please select a travel date.");
    if (journeyType === "round-trip" && !returnDate)
      return setError("Please select a return date for round trip.");
    if (journeyType === "round-trip" && returnDate < travelDate)
      return setError("Return date must be after travel date.");

    setLoading(true);
    // Simulate slight loading (could be replaced by API call)
    setTimeout(() => {
      const fromCity = pickup.split(",")[0].trim();
      const toCity = destination.split(",")[0].trim();
      const result = getDistance(fromCity, toCity);
      setLoading(false);
      onCalculated({
        pickup,
        destination,
        journeyType,
        travelDate,
        returnDate: journeyType === "round-trip" ? returnDate : undefined,
        passengers,
        distance: result.distance,
        duration: result.duration,
        isExactDistance: result.isExact,
      });
      // Scroll to results
      setTimeout(() => {
        const el = document.getElementById("fare-results");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 800); // slightly longer to show off the premium loading state
  };

  return (
    <section id="trip-planner" className="relative z-20">
      <div className="container-default">
        <motion.div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden -mt-16 md:-mt-24"
          variants={slideUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header */}
          <div className="bg-navy px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl">Plan Your Journey</h2>
              <p className="text-blue-300 text-sm mt-0.5">Get instant fare estimates across India</p>
            </div>
            <Navigation className="w-8 h-8 text-orange-brand" />
          </div>

          <div className="p-6 md:p-8 relative">
            
            {/* Loading Overlay */}
            <AnimatePresence>
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-b-2xl"
                >
                  <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      scale: [1, 1.1, 1] 
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-blue-50 text-orange-brand rounded-full flex items-center justify-center mb-4 shadow-lg border border-blue-100"
                  >
                    <Map className="w-8 h-8" />
                  </motion.div>
                  <h3 className="text-lg font-bold text-navy">Calculating your journey...</h3>
                  <p className="text-sm text-gray-500 mt-1">Finding the best route and fare</p>
                  
                  {/* Subtle animated route line */}
                  <div className="mt-6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-navy"></div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden relative">
                      <motion.div 
                        className="absolute top-0 bottom-0 left-0 bg-orange-brand"
                        animate={{ width: ["0%", "100%", "0%"], x: ["0%", "0%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>
                    <div className="w-2 h-2 rounded-full bg-orange-brand"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Journey type tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-xs relative">
              {(["one-way", "round-trip"] as JourneyType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setJourneyType(type)}
                  className={cn(
                    "flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 relative z-10",
                    journeyType === type
                      ? "text-navy"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {type === "one-way" ? "One Way" : "Round Trip"}
                </button>
              ))}
              {/* Animated active background for tabs */}
              <div 
                className={cn(
                  "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out z-0",
                  journeyType === "one-way" ? "left-1" : "left-[calc(50%+2px)]"
                )}
              />
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Pickup */}
              <motion.div whileTap={{ scale: 0.99 }}>
                <LocationSelector
                  label="Pickup Location"
                  placeholder="e.g. Sathyamangalam"
                  value={pickup}
                  onChange={setPickup}
                  icon="pickup"
                />
              </motion.div>

              {/* Destination */}
              <motion.div whileTap={{ scale: 0.99 }}>
                <LocationSelector
                  label="Destination"
                  placeholder="e.g. Coimbatore"
                  value={destination}
                  onChange={setDestination}
                  icon="destination"
                />
              </motion.div>

              {/* Passengers */}
              <motion.div whileTap={{ scale: 0.99 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Passengers</label>
                <div className="relative group">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-orange-brand" />
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white transition-all group-focus-within:border-orange-brand group-focus-within:ring-2 group-focus-within:ring-orange-brand/20">
                    <button
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="px-4 py-3 text-gray-500 hover:text-navy hover:bg-gray-50 font-bold text-lg border-r border-gray-200 transition-colors"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center font-semibold text-gray-800 py-3 relative overflow-hidden">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={passengers}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block"
                        >
                          {passengers}
                        </motion.span>
                      </AnimatePresence>
                      <span className="ml-1">{passengers === 1 ? "Passenger" : "Passengers"}</span>
                    </div>
                    <button
                      onClick={() => setPassengers(Math.min(20, passengers + 1))}
                      className="px-4 py-3 text-gray-500 hover:text-navy hover:bg-gray-50 font-bold text-lg border-l border-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Travel Date */}
              <motion.div whileTap={{ scale: 0.99 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Date</label>
                <div className="relative group">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors group-focus-within:text-orange-brand" />
                  <input
                    type="date"
                    value={travelDate}
                    min={today}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="input-field pl-10 transition-all focus:ring-2 focus:ring-orange-brand/20"
                  />
                </div>
              </motion.div>

              {/* Return Date */}
              <AnimatePresence>
                {journeyType === "round-trip" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: "auto", scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Return Date</label>
                    <div className="relative group">
                      <ArrowLeftRight className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none transition-colors group-focus-within:text-orange-brand" />
                      <input
                        type="date"
                        value={returnDate}
                        min={travelDate || today}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="input-field pl-10 transition-all focus:ring-2 focus:ring-orange-brand/20"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calculate button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <motion.button
                whileHover={!loading ? { scale: 1.02, boxShadow: "0px 8px 15px rgba(239, 108, 0, 0.2)" } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                onClick={handleCalculate}
                disabled={loading}
                className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 py-4 px-10 text-base shadow-lg relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Calculating Route...
                    </>
                  ) : (
                    <>
                      Calculate Trip Fare
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                {!loading && (
                  <motion.div 
                    className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-out]" 
                  />
                )}
              </motion.button>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Instant estimate • No registration needed
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
