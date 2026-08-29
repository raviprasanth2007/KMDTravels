import { MapPin, ArrowRight, Users, Car, Info, CheckCircle, MessageCircle, Phone } from "lucide-react";
import { FareBreakdown as FareBreakdownType, TripDetails } from "@/types/booking";
import { Vehicle } from "@/constants/vehicles";
import { formatCurrency } from "@/lib/fareCalculator";
import { formatDate } from "@/lib/utils";
import { KMD_CONFIG } from "@/constants/config";
import { motion } from "framer-motion";
import { useSmoothNumber, scaleInVariant, staggerContainerVariant, fadeUpVariant } from "@/lib/animations";

interface FareBreakdownProps {
  fare: FareBreakdownType;
  trip: TripDetails;
  vehicle: Vehicle;
  onBook: () => void;
}

export default function FareBreakdown({ fare, trip, vehicle, onBook }: FareBreakdownProps) {
  // Smooth animated numbers
  const animatedBaseFare = useSmoothNumber(fare.baseFare);
  const animatedDriverAllowance = useSmoothNumber(fare.driverAllowance);
  const animatedToll = useSmoothNumber(fare.tollEstimate);
  const animatedSubtotal = useSmoothNumber(fare.subtotal);
  const animatedGst = useSmoothNumber(fare.gstAmount);
  const animatedTotal = useSmoothNumber(fare.finalFare);

  const rows = [
    {
      label: `Distance Fare (${fare.billableDistance} km × ₹${fare.ratePerKm}/km)`,
      amount: animatedBaseFare,
      note: fare.minimumKmApplied
        ? `Minimum billing: ${vehicle.minimumKm} km applied (actual: ${fare.actualDistance} km)`
        : undefined,
    },
    {
      label: `Driver Allowance (₹${vehicle.driverAllowancePerDay}/day × ${fare.tripDays} day${fare.tripDays > 1 ? "s" : ""})`,
      amount: animatedDriverAllowance,
    },
    {
      label: "Toll & Parking (Estimated)",
      amount: animatedToll,
      note: "Actual toll charges may vary",
    },
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
      variants={scaleInVariant}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-navy-light p-6 text-white">
        <h3 className="font-bold text-xl mb-3">Estimated Trip Fare</h3>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-brand" />
            <span>{trip.pickup.split(",")[0]}</span>
            <ArrowRight className="w-3 h-3" />
            <span>{trip.destination.split(",")[0]}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-300" />
            <span>{trip.passengers} Passenger{trip.passengers !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="w-4 h-4 text-blue-300" />
            <span>{vehicle.name}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Route summary */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-navy">{trip.distance} km</div>
            <div className="text-xs text-gray-500 mt-0.5">
              {trip.journeyType === "round-trip" ? "One-way" : "Distance"}
              {!trip.isExactDistance && <span className="text-orange-500"> (est.)</span>}
            </div>
          </div>
          <div className="text-center border-x border-blue-200">
            <div className="text-2xl font-bold text-navy capitalize">
              {trip.journeyType === "round-trip" ? "Round" : "One Way"}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">Journey Type</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-navy">{fare.tripDays}d</div>
            <div className="text-xs text-gray-500 mt-0.5">Trip Duration</div>
          </div>
        </div>

        {/* Distance note */}
        {!trip.isExactDistance && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5 text-sm text-amber-800">
            <Info className="w-4 h-4 mt-0.5 shrink-0" />
            <span>Distance is estimated. Actual route distance may vary. Contact us for an exact quote.</span>
          </div>
        )}

        {/* Fare rows */}
        <motion.div 
          className="space-y-3 mb-5"
          variants={staggerContainerVariant}
          initial="hidden"
          animate="visible"
        >
          {rows.map((row) => (
            <motion.div key={row.label} variants={fadeUpVariant}>
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-600 text-sm">{row.label}</span>
                <span className="font-semibold text-gray-800">{formatCurrency(row.amount)}</span>
              </div>
              {row.note && (
                <p className="text-xs text-gray-400 mt-1 ml-1">{row.note}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Subtotal */}
        <div className="flex items-center justify-between py-3 border-t border-gray-200 text-gray-700">
          <span className="font-medium">Subtotal</span>
          <span className="font-semibold">{formatCurrency(animatedSubtotal)}</span>
        </div>
        <div className="flex items-center justify-between py-2.5 text-gray-600">
          <span className="text-sm">GST ({fare.gstPercent}%)</span>
          <span className="text-sm font-medium">{formatCurrency(animatedGst)}</span>
        </div>

        {/* Final fare */}
        <motion.div 
          className="flex items-center justify-between bg-navy rounded-xl p-5 mt-4 overflow-hidden relative"
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          key={fare.finalFare} // Force re-render animation when total changes significantly? No, key re-renders whole component. Let's just animate color/scale.
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="absolute inset-0 bg-white/5"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <div>
            <div className="text-white font-bold text-lg relative z-10">Estimated Total</div>
            <div className="text-blue-300 text-xs mt-0.5 relative z-10">Inclusive of GST</div>
          </div>
          <div className="text-right relative z-10">
            <motion.div 
              className="text-3xl font-bold text-orange-brand"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.3 }}
              key={animatedTotal} // Very slight pulse on total change
            >
              {formatCurrency(animatedTotal)}
            </motion.div>
            <div className="text-blue-300 text-xs mt-0.5">
              {formatDate(trip.travelDate)}
              {trip.returnDate ? ` → ${formatDate(trip.returnDate)}` : ""}
            </div>
          </div>
        </motion.div>

        <p className="text-xs text-gray-400 mt-3 text-center">
          * Final fare may vary slightly based on actual tolls, parking, route changes and trip requirements.
        </p>

        {/* Action buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 15px rgba(239, 108, 0, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            onClick={onBook}
            className="btn-primary flex items-center justify-center gap-2 py-4 shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Book This Trip
            </span>
            <motion.div 
              className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-out]" 
            />
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 15px rgba(34, 197, 94, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/${KMD_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              `Hello KMD Travels! I need a fare quote.\n\nPickup: ${trip.pickup}\nDestination: ${trip.destination}\nPassengers: ${trip.passengers}\nDate: ${formatDate(trip.travelDate)}\nVehicle: ${vehicle.name}\nEstimated Fare: ${formatCurrency(fare.finalFare)}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            Enquire on WhatsApp
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
