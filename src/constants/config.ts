// ============================================================
// KMD TRAVELS – CENTRAL CONFIGURATION
// Change business details and rates from this single file.
// ============================================================

export const KMD_CONFIG = {
  // Business info
  businessName: "KMD Travels",
  tagline: "Travel Anywhere. We'll Take You There.",
  city: "Sathyamangalam",
  state: "Tamil Nadu",
  address: "Sathyamangalam, Erode District, Tamil Nadu – 638402",
  
  // Contact
  phone: "+919876543210",          // Replace with actual phone
  whatsappNumber: "919876543210",  // Replace with actual WhatsApp (no + prefix)
  email: "kmdtravels@gmail.com",   // Replace with actual email
  
  // Ratings / Trust
  rating: 4.0,
  totalRatings: 5,
  yearsInBusiness: "20+",
  
  // Pricing
  gstPercent: 5,
  tollEstimatePerKm: 3,        // ₹ per km (both ways) – estimated toll
  tollMinAmount: 300,           // Minimum toll estimate
  tollMaxAmount: 2000,          // Cap for toll estimate
  
  // Booking ID prefix
  bookingPrefix: "KMD",
  
  // Admin
  adminPassword: "kmd@admin2024",
  
  // Map API (set your Google Maps API key here when ready)
  googleMapsApiKey: "",          // Set to enable live distance calculation
  
  // WhatsApp message template
  generateWhatsAppMessage: (booking: {
    name: string;
    phone: string;
    pickup: string;
    destination: string;
    travelDate: string;
    returnDate?: string;
    passengers: number;
    vehicle: string;
    distance: number;
    finalFare: number;
    journeyType: string;
  }) => {
    const msg = `Hello KMD Travels! 🙏

I would like to book a trip.

*Name:* ${booking.name}
*Phone:* ${booking.phone}
*Pickup:* ${booking.pickup}
*Destination:* ${booking.destination}
*Journey Type:* ${booking.journeyType}
*Travel Date:* ${booking.travelDate}${booking.returnDate ? `\n*Return Date:* ${booking.returnDate}` : ""}
*Passengers:* ${booking.passengers}
*Vehicle:* ${booking.vehicle}
*Distance:* ${booking.distance} km
*Estimated Fare:* ₹${booking.finalFare.toLocaleString("en-IN")}

Please confirm availability. Thank you!`;
    return encodeURIComponent(msg);
  },
};
