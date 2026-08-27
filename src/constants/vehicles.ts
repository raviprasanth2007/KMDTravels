// ============================================================
// KMD TRAVELS – VEHICLE CONFIGURATION
// All vehicle data is centralised here.
// ============================================================

export interface Vehicle {
  id: string;
  name: string;
  shortName: string;
  capacity: number;
  ratePerKm: number;
  minimumKm: number;
  driverAllowancePerDay: number;
  features: string[];
  luggageCapacity: string;
  description: string;
  image: string;
  popular?: boolean;
}

export const VEHICLES: Vehicle[] = [
  {
    id: "car-4",
    name: "4 Seater Car",
    shortName: "Sedan / Hatchback",
    capacity: 4,
    ratePerKm: 16,
    minimumKm: 250,
    driverAllowancePerDay: 400,
    features: ["AC", "Music System", "GPS Tracked"],
    luggageCapacity: "2–3 Bags",
    description: "Ideal for couples, small families and solo business travel.",
    image: "/src/assets/car-4seater.png",
    popular: false,
  },
  {
    id: "car-6",
    name: "6 Seater Car",
    shortName: "Innova / Ertiga",
    capacity: 6,
    ratePerKm: 19,
    minimumKm: 250,
    driverAllowancePerDay: 500,
    features: ["AC", "Music System", "Extra Legroom", "GPS Tracked"],
    luggageCapacity: "3–4 Bags",
    description: "Comfortable for small groups and family trips.",
    image: "/src/assets/car-6seater.png",
    popular: true,
  },
  {
    id: "car-8",
    name: "8 Seater SUV",
    shortName: "Innova Crysta / MUV",
    capacity: 8,
    ratePerKm: 22,
    minimumKm: 250,
    driverAllowancePerDay: 600,
    features: ["AC", "Premium Interior", "Reclining Seats", "GPS Tracked"],
    luggageCapacity: "4–5 Bags",
    description: "Premium SUV for medium groups and corporate travel.",
    image: "/src/assets/car-8seater.png",
    popular: false,
  },
  {
    id: "traveller-12",
    name: "12 Seater Traveller",
    shortName: "Force Traveller",
    capacity: 12,
    ratePerKm: 28,
    minimumKm: 300,
    driverAllowancePerDay: 700,
    features: ["AC", "Push-back Seats", "Large Luggage", "GPS Tracked"],
    luggageCapacity: "6–8 Bags",
    description: "Best for group tours, family gatherings and small events.",
    image: "/src/assets/traveller-12seater.png",
    popular: false,
  },
  {
    id: "van-16",
    name: "16 Seater Van",
    shortName: "Tempo Traveller",
    capacity: 16,
    ratePerKm: 34,
    minimumKm: 300,
    driverAllowancePerDay: 800,
    features: ["AC", "Luxury Seats", "Overhead Storage", "GPS Tracked"],
    luggageCapacity: "8–10 Bags",
    description: "Large group travel with maximum comfort.",
    image: "/src/assets/van-16seater.png",
    popular: false,
  },
  {
    id: "van-20",
    name: "20 Seater Van",
    shortName: "Large Tempo / Coach",
    capacity: 20,
    ratePerKm: 40,
    minimumKm: 350,
    driverAllowancePerDay: 900,
    features: ["AC", "Luxury Seats", "Entertainment System", "GPS Tracked"],
    luggageCapacity: "10+ Bags",
    description: "Maximum capacity for large groups and corporate events.",
    image: "/src/assets/van-20seater.png",
    popular: false,
  },
];

export function getVehiclesForPassengers(passengers: number): Vehicle[] {
  return VEHICLES.filter((v) => v.capacity >= passengers);
}

export function getRecommendedVehicle(passengers: number): string {
  const eligible = getVehiclesForPassengers(passengers);
  if (eligible.length === 0) return "";
  // Recommend the vehicle with smallest capacity that fits all passengers
  const sorted = [...eligible].sort((a, b) => a.capacity - b.capacity);
  return sorted[0].id;
}
