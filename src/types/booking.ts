export type JourneyType = "one-way" | "round-trip";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface FareBreakdown {
  actualDistance: number;
  billableDistance: number;
  ratePerKm: number;
  baseFare: number;
  driverAllowance: number;
  tollEstimate: number;
  subtotal: number;
  gstAmount: number;
  finalFare: number;
  gstPercent: number;
  tripDays: number;
  minimumKmApplied: boolean;
}

export interface TripDetails {
  pickup: string;
  destination: string;
  journeyType: JourneyType;
  travelDate: string;
  returnDate?: string;
  passengers: number;
  distance: number;
  duration: string;
  isExactDistance: boolean;
}

export interface BookingFormData {
  name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  specialRequirements?: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  pickup: string;
  destination: string;
  distance: number;
  journeyType: JourneyType;
  travelDate: string;
  returnDate: string;
  passengers: number;
  vehicleId: string;
  vehicleName: string;
  baseFare: number;
  driverAllowance: number;
  tollEstimate: number;
  gstAmount: number;
  finalAmount: number;
  status: BookingStatus;
  specialRequirements: string;
  createdAt: string;
}
