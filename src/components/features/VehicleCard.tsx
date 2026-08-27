import { Users, Briefcase, Zap, CheckCircle } from "lucide-react";
import { Vehicle } from "@/constants/vehicles";
import { formatCurrency } from "@/lib/fareCalculator";
import { cn } from "@/lib/utils";

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  isRecommended: boolean;
  onSelect: (vehicleId: string) => void;
  passengers: number;
}

export default function VehicleCard({
  vehicle,
  isSelected,
  isRecommended,
  onSelect,
  passengers,
}: VehicleCardProps) {
  const isDisabled = vehicle.capacity < passengers;

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 overflow-hidden transition-all duration-300 cursor-pointer",
        isDisabled
          ? "opacity-40 cursor-not-allowed border-gray-200 bg-gray-50"
          : isSelected
          ? "border-travel-blue shadow-xl bg-blue-50/50 scale-[1.01]"
          : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-lg"
      )}
      onClick={() => !isDisabled && onSelect(vehicle.id)}
    >
      {/* Recommended badge */}
      {isRecommended && !isDisabled && (
        <div className="absolute top-3 right-3 z-10 bg-orange-brand text-white text-xs font-bold px-3 py-1 rounded-full">
          Recommended
        </div>
      )}

      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute top-3 left-3 z-10">
          <CheckCircle className="w-6 h-6 text-travel-blue fill-white" />
        </div>
      )}

      {/* Vehicle Image */}
      <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="h-36 object-contain mix-blend-multiply"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop&auto=format`;
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 text-lg">{vehicle.name}</h3>
          <p className="text-gray-500 text-sm">{vehicle.shortName}</p>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Users className="w-4 h-4 text-travel-blue" />
            <span>{vehicle.capacity} Seater</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Briefcase className="w-4 h-4 text-travel-blue" />
            <span>{vehicle.luggageCapacity}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vehicle.features.slice(0, 3).map((f) => (
            <span key={f} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">
              <Zap className="w-3 h-3 text-orange-brand" />
              {f}
            </span>
          ))}
        </div>

        {/* Pricing */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-2xl font-bold text-navy">{formatCurrency(vehicle.ratePerKm)}<span className="text-sm font-normal text-gray-500">/km</span></span>
            <span className="text-xs text-gray-500 text-right">Min {vehicle.minimumKm} km</span>
          </div>
          <div className="text-xs text-gray-400 mb-4">
            Driver allowance {formatCurrency(vehicle.driverAllowancePerDay)}/day
          </div>

          <button
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelect(vehicle.id)}
            className={cn(
              "w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200",
              isDisabled
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : isSelected
                ? "bg-travel-blue text-white shadow-md"
                : "bg-navy text-white hover:bg-navy-light hover:shadow-md"
            )}
          >
            {isDisabled
              ? `Needs ${vehicle.capacity}+ Passengers`
              : isSelected
              ? "✓ Selected"
              : "Select Vehicle"}
          </button>
        </div>
      </div>
    </div>
  );
}
