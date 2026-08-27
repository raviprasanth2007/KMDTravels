// ============================================================
// KMD TRAVELS – FARE CALCULATION ENGINE
// All fare logic is centralised here.
// ============================================================

import { Vehicle } from "@/constants/vehicles";
import { KMD_CONFIG } from "@/constants/config";
import { FareBreakdown, JourneyType } from "@/types/booking";

export function calculateTripDays(
  travelDate: string,
  returnDate: string | undefined,
  journeyType: JourneyType
): number {
  if (journeyType === "one-way" || !returnDate) return 1;
  const start = new Date(travelDate);
  const end = new Date(returnDate);
  const diffMs = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays + 1); // inclusive of both travel days
}

export function calculateTollEstimate(distance: number): number {
  const raw = distance * KMD_CONFIG.tollEstimatePerKm;
  return Math.min(
    Math.max(raw, KMD_CONFIG.tollMinAmount),
    KMD_CONFIG.tollMaxAmount
  );
}

export function calculateFare(
  vehicle: Vehicle,
  distance: number,
  journeyType: JourneyType,
  travelDate: string,
  returnDate?: string
): FareBreakdown {
  // For round trip, total km = distance × 2
  const totalDistance = journeyType === "round-trip" ? distance * 2 : distance;

  // Billable distance = max(actual, minimum billing)
  const billableDistance = Math.max(totalDistance, vehicle.minimumKm);
  const minimumKmApplied = billableDistance > totalDistance;

  const baseFare = billableDistance * vehicle.ratePerKm;

  const tripDays = calculateTripDays(travelDate, returnDate, journeyType);
  const driverAllowance = vehicle.driverAllowancePerDay * tripDays;

  const tollEstimate = calculateTollEstimate(
    journeyType === "round-trip" ? distance * 2 : distance
  );

  const subtotal = baseFare + driverAllowance + tollEstimate;
  const gstPercent = KMD_CONFIG.gstPercent;
  const gstAmount = Math.round(subtotal * (gstPercent / 100));
  const finalFare = subtotal + gstAmount;

  return {
    actualDistance: totalDistance,
    billableDistance,
    ratePerKm: vehicle.ratePerKm,
    baseFare,
    driverAllowance,
    tollEstimate,
    subtotal,
    gstAmount,
    finalFare,
    gstPercent,
    tripDays,
    minimumKmApplied,
  };
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
