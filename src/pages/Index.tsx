import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/features/HeroSection";
import TripPlanner from "@/components/features/TripPlanner";
import VehicleSelector from "@/components/features/VehicleSelector";
import FareBreakdown from "@/components/features/FareBreakdown";
import BookingForm from "@/components/features/BookingForm";
import BookingConfirmation from "@/components/features/BookingConfirmation";
import WhyChooseUs from "@/components/features/WhyChooseUs";
import VehiclesSection from "@/components/features/VehiclesSection";
import PopularRoutes from "@/components/features/PopularRoutes";
import ServicesSection from "@/components/features/ServicesSection";
import HowItWorks from "@/components/features/HowItWorks";
import ReviewsSection from "@/components/features/ReviewsSection";
import ContactSection from "@/components/features/ContactSection";
import MobileStickyCTA from "@/components/features/MobileStickyCTA";

import { TripDetails, BookingFormData } from "@/types/booking";
import { VEHICLES, getRecommendedVehicle } from "@/constants/vehicles";
import { calculateFare } from "@/lib/fareCalculator";
import { saveBooking } from "@/lib/bookingService";
import type { Booking } from "@/types/booking";

type Step = "planner" | "vehicles" | "booking-form" | "confirmation";

export default function Index() {
  const [trip, setTrip] = useState<TripDetails | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [step, setStep] = useState<Step>("planner");
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [initialTripData, setInitialTripData] = useState<Partial<TripDetails>>({});

  const fareResultsRef = useRef<HTMLDivElement>(null);

  const selectedVehicle = VEHICLES.find((v) => v.id === selectedVehicleId);
  const fare =
    trip && selectedVehicle
      ? calculateFare(selectedVehicle, trip.distance, trip.journeyType, trip.travelDate, trip.returnDate)
      : null;

  const handleTripCalculated = (t: TripDetails) => {
    setTrip(t);
    const rec = getRecommendedVehicle(t.passengers);
    setSelectedVehicleId(rec || "");
    setStep("vehicles");
  };

  const handleVehicleSelect = (id: string) => {
    setSelectedVehicleId(id);
  };

  const handleBookNow = () => {
    if (!selectedVehicleId) {
      toast.error("Please select a vehicle first.");
      return;
    }
    setStep("booking-form");
    setTimeout(() => {
      const el = document.getElementById("booking-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleBookingSubmit = (formData: BookingFormData) => {
    if (!trip || !selectedVehicle || !fare) return;
    const booking = saveBooking({
      customerName: formData.name,
      phone: formData.phone,
      whatsapp: formData.whatsapp || formData.phone,
      email: formData.email || "",
      pickup: trip.pickup,
      destination: trip.destination,
      distance: trip.distance,
      journeyType: trip.journeyType,
      travelDate: trip.travelDate,
      returnDate: trip.returnDate || "",
      passengers: trip.passengers,
      vehicleId: selectedVehicle.id,
      vehicleName: selectedVehicle.name,
      baseFare: fare.baseFare,
      driverAllowance: fare.driverAllowance,
      tollEstimate: fare.tollEstimate,
      gstAmount: fare.gstAmount,
      finalAmount: fare.finalFare,
      status: "pending",
      specialRequirements: formData.specialRequirements || "",
    });
    setConfirmedBooking(booking);
    setStep("confirmation");
    setTimeout(() => {
      const el = document.getElementById("booking-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleGoHome = () => {
    setStep("planner");
    setTrip(null);
    setSelectedVehicleId("");
    setConfirmedBooking(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePopularRoute = (from: string, to: string) => {
    setInitialTripData({ pickup: from, destination: to });
  };

  const handlePlanTrip = () => {
    const el = document.getElementById("trip-planner");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* HERO */}
      <HeroSection onPlanTrip={handlePlanTrip} />

      {/* TRIP PLANNER */}
      <TripPlanner onCalculated={handleTripCalculated} initialTrip={initialTripData} />

      {/* FARE RESULTS */}
      {trip && (step === "vehicles" || step === "booking-form" || step === "confirmation") && (
        <div id="fare-results" ref={fareResultsRef} className="section-padding bg-gray-50">
          <div className="container-default">
            {step === "confirmation" && confirmedBooking ? (
              <div id="booking-section" className="max-w-2xl mx-auto">
                <BookingConfirmation booking={confirmedBooking} onGoHome={handleGoHome} />
              </div>
            ) : step === "booking-form" && fare && selectedVehicle ? (
              <div id="booking-section" className="max-w-2xl mx-auto">
                <BookingForm
                  trip={trip}
                  fare={fare}
                  vehicle={selectedVehicle}
                  onSubmit={handleBookingSubmit}
                  onBack={() => setStep("vehicles")}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Vehicle selector */}
                <div className="lg:col-span-2">
                  <VehicleSelector
                    trip={trip}
                    selectedVehicleId={selectedVehicleId}
                    onSelect={handleVehicleSelect}
                  />
                </div>
                {/* Fare breakdown sidebar */}
                <div className="lg:col-span-1">
                  {fare && selectedVehicle ? (
                    <div className="sticky top-20">
                      <FareBreakdown
                        fare={fare}
                        trip={trip}
                        vehicle={selectedVehicle}
                        onBook={handleBookNow}
                      />
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center text-gray-400">
                      <div className="text-4xl mb-3">🚗</div>
                      <div className="font-medium text-gray-500">Select a vehicle to see the fare breakdown</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* VEHICLES SECTION */}
      <VehiclesSection />

      {/* POPULAR ROUTES */}
      <PopularRoutes onSelectRoute={handlePopularRoute} />

      {/* SERVICES */}
      <ServicesSection />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* REVIEWS */}
      <ReviewsSection />

      {/* CONTACT */}
      <ContactSection />

      <Footer />

      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
}
