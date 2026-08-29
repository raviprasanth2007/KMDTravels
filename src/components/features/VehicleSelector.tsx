import { Car, Info } from "lucide-react";
import VehicleCard from "./VehicleCard";
import { VEHICLES, getRecommendedVehicle } from "@/constants/vehicles";
import { TripDetails } from "@/types/booking";
import { motion } from "framer-motion";
import { staggerContainerFastVariant, fadeUpVariant } from "@/lib/animations";

interface VehicleSelectorProps {
  trip: TripDetails;
  selectedVehicleId: string;
  onSelect: (vehicleId: string) => void;
}

export default function VehicleSelector({ trip, selectedVehicleId, onSelect }: VehicleSelectorProps) {
  const recommendedId = getRecommendedVehicle(trip.passengers);
  const eligibleCount = VEHICLES.filter((v) => v.capacity >= trip.passengers).length;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-travel-blue" />
          <div>
            <h3 className="font-bold text-gray-900 text-xl">Choose Your Vehicle</h3>
            <p className="text-gray-500 text-sm">
              {eligibleCount} vehicle{eligibleCount !== 1 ? "s" : ""} available for {trip.passengers} passenger{trip.passengers !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {eligibleCount === 0 ? (
        <motion.div 
          variants={fadeUpVariant}
          className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-5 text-red-700"
        >
          <Info className="w-5 h-5 shrink-0" />
          <div>
            <div className="font-semibold">No vehicles available</div>
            <div className="text-sm">Maximum passenger capacity is 20. Please reduce passenger count.</div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          variants={staggerContainerFastVariant}
        >
          {VEHICLES.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isSelected={selectedVehicleId === vehicle.id}
              isRecommended={vehicle.id === recommendedId}
              onSelect={onSelect}
              passengers={trip.passengers}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
