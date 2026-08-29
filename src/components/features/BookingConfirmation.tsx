import { CheckCircle, MessageCircle, Phone, Home, MapPin, Car, Users, Calendar } from "lucide-react";
import { Booking } from "@/types/booking";
import { formatCurrency } from "@/lib/fareCalculator";
import { formatDate } from "@/lib/utils";
import { KMD_CONFIG } from "@/constants/config";
import { VEHICLES } from "@/constants/vehicles";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainerVariant, scaleInVariant } from "@/lib/animations";

interface BookingConfirmationProps {
  booking: Booking;
  onGoHome: () => void;
}

export default function BookingConfirmation({ booking, onGoHome }: BookingConfirmationProps) {
  const vehicle = VEHICLES.find((v) => v.id === booking.vehicleId);

  const waMsg = KMD_CONFIG.generateWhatsAppMessage({
    name: booking.customerName,
    phone: booking.phone,
    pickup: booking.pickup,
    destination: booking.destination,
    travelDate: formatDate(booking.travelDate),
    returnDate: booking.returnDate ? formatDate(booking.returnDate) : undefined,
    passengers: booking.passengers,
    vehicle: booking.vehicleName,
    distance: booking.distance,
    finalFare: booking.finalAmount,
    journeyType: booking.journeyType === "round-trip" ? "Round Trip" : "One Way",
  });

  return (
    <motion.div 
      variants={scaleInVariant}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden"
    >
      {/* Success banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-white/20"
          initial={{ x: "-100%", skewX: -12 }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
        />
        
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10"
        >
          <CheckCircle className="w-9 h-9 text-green-500" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white font-bold text-2xl mb-2 relative z-10"
        >
          Booking Request Received!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-green-100 text-sm relative z-10"
        >
          Thank you for choosing <strong>KMD Travels</strong>. We'll confirm your trip shortly.
        </motion.p>
      </div>

      <motion.div 
        className="p-6"
        variants={staggerContainerVariant}
        initial="hidden"
        animate="visible"
      >
        {/* Booking ID */}
        <motion.div variants={fadeUpVariant} className="text-center mb-6">
          <div className="text-gray-500 text-sm mb-1">Your Booking ID</div>
          <div className="text-3xl font-bold text-navy tracking-wider bg-gray-50 rounded-xl py-3 px-6 inline-block border-2 border-dashed border-blue-200">
            {booking.bookingId}
          </div>
          <p className="text-xs text-gray-400 mt-2">Please save this ID for reference</p>
        </motion.div>

        {/* Trip details */}
        <motion.div variants={fadeUpVariant} className="border border-gray-100 rounded-xl p-5 mb-6 space-y-3">
          <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wider mb-4">Trip Summary</h4>
          {[
            { icon: MapPin, label: "Pickup", value: booking.pickup },
            { icon: MapPin, label: "Destination", value: booking.destination },
            { icon: Car, label: "Vehicle", value: booking.vehicleName },
            { icon: Users, label: "Passengers", value: `${booking.passengers}` },
            { icon: Calendar, label: "Travel Date", value: formatDate(booking.travelDate) },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="w-4 h-4 text-travel-blue shrink-0" />
              <span className="text-gray-500 text-sm w-24">{label}</span>
              <span className="font-medium text-gray-800 text-sm">{value}</span>
            </div>
          ))}
        </motion.div>

        {/* Fare */}
        <motion.div variants={fadeUpVariant} className="bg-navy rounded-xl p-5 flex items-center justify-between mb-6">
          <div>
            <div className="text-blue-300 text-sm">Estimated Fare</div>
            <div className="text-white text-xs mt-0.5">Inclusive of GST</div>
          </div>
          <div className="text-3xl font-bold text-orange-brand">{formatCurrency(booking.finalAmount)}</div>
        </motion.div>

        <motion.p variants={fadeUpVariant} className="text-center text-sm text-gray-500 mb-6">
          Our team will call you on <strong>{booking.phone}</strong> to confirm the booking.
        </motion.p>

        {/* Action buttons */}
        <motion.div variants={fadeUpVariant} className="grid grid-cols-1 gap-3">
          <motion.a
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 15px rgba(34, 197, 94, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            href={`https://wa.me/${KMD_CONFIG.whatsappNumber}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-md text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 15px rgba(29, 78, 216, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            href={`tel:${KMD_CONFIG.phone}`}
            className="flex items-center justify-center gap-2 bg-travel-blue text-white font-semibold py-4 rounded-xl transition-colors shadow-md text-sm"
          >
            <Phone className="w-5 h-5" />
            Call KMD Travels
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGoHome}
            className="flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-4 rounded-xl transition-colors text-sm"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
