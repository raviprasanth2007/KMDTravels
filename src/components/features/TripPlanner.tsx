import { useState } from "react";
import { Calendar, Users, ArrowRight, ArrowLeftRight, Loader2, AlertCircle, Clock, Navigation } from "lucide-react";
import LocationSelector from "./LocationSelector";
import { getDistance } from "@/constants/routes";
import { TripDetails, JourneyType } from "@/types/booking";
import { cn } from "@/lib/utils";

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
    }, 600);
  };

  return (
    <section id="trip-planner" className="relative z-20">
      <div className="container-default">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden -mt-16 md:-mt-24">
          {/* Header */}
          <div className="bg-navy px-6 py-5 flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-xl md:text-2xl">Plan Your Journey</h2>
              <p className="text-blue-300 text-sm mt-0.5">Get instant fare estimates across India</p>
            </div>
            <Navigation className="w-8 h-8 text-orange-brand" />
          </div>

          <div className="p-6 md:p-8">
            {/* Journey type tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-xs">
              {(["one-way", "round-trip"] as JourneyType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setJourneyType(type)}
                  className={cn(
                    "flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200",
                    journeyType === type
                      ? "bg-white text-navy shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {type === "one-way" ? "One Way" : "Round Trip"}
                </button>
              ))}
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Pickup */}
              <LocationSelector
                label="Pickup Location"
                placeholder="e.g. Sathyamangalam"
                value={pickup}
                onChange={setPickup}
                icon="pickup"
              />

              {/* Destination */}
              <LocationSelector
                label="Destination"
                placeholder="e.g. Coimbatore"
                value={destination}
                onChange={setDestination}
                icon="destination"
              />

              {/* Passengers */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="px-4 py-3 text-gray-500 hover:text-navy hover:bg-gray-50 font-bold text-lg border-r border-gray-200 transition-colors"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center font-semibold text-gray-800 py-3">
                      {passengers} {passengers === 1 ? "Passenger" : "Passengers"}
                    </div>
                    <button
                      onClick={() => setPassengers(Math.min(20, passengers + 1))}
                      className="px-4 py-3 text-gray-500 hover:text-navy hover:bg-gray-50 font-bold text-lg border-l border-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <input
                    type="date"
                    value={travelDate}
                    min={today}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {/* Return Date */}
              {journeyType === "round-trip" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Return Date</label>
                  <div className="relative">
                    <ArrowLeftRight className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    <input
                      type="date"
                      value={returnDate}
                      min={travelDate || today}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm fade-in">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Calculate button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2 py-4 px-10 text-base shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Calculating Route...
                  </>
                ) : (
                  <>
                    Calculate Trip Fare
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Instant estimate • No registration needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
