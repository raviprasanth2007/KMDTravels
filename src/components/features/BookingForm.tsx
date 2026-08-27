import { useState } from "react";
import { User, Phone, Mail, MessageCircle, ChevronRight, ArrowLeft, AlertCircle } from "lucide-react";
import { TripDetails, BookingFormData } from "@/types/booking";
import { FareBreakdown } from "@/types/booking";
import { Vehicle } from "@/constants/vehicles";
import { formatCurrency } from "@/lib/fareCalculator";
import { validateIndianPhone, formatDate } from "@/lib/utils";

interface BookingFormProps {
  trip: TripDetails;
  fare: FareBreakdown;
  vehicle: Vehicle;
  onSubmit: (data: BookingFormData) => void;
  onBack: () => void;
}

export default function BookingForm({ trip, fare, vehicle, onSubmit, onBack }: BookingFormProps) {
  const [form, setForm] = useState<BookingFormData>({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    specialRequirements: "",
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [sameAsPhone, setSameAsPhone] = useState(true);

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      newErrors.name = "Please enter your full name.";
    if (!validateIndianPhone(form.phone))
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    if (!sameAsPhone && !validateIndianPhone(form.whatsapp))
      newErrors.whatsapp = "Please enter a valid WhatsApp number.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const finalData = {
      ...form,
      whatsapp: sameAsPhone ? form.phone : form.whatsapp,
    };
    onSubmit(finalData);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden fade-in">
      {/* Header */}
      <div className="bg-navy px-6 py-5">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-300 hover:text-white mb-3 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to fare
        </button>
        <h3 className="text-white font-bold text-xl">Confirm Your Booking</h3>
        <p className="text-blue-300 text-sm mt-1">Enter your details to complete the booking request</p>
      </div>

      {/* Trip summary mini */}
      <div className="mx-6 mt-5 p-4 bg-blue-50 rounded-xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-sm text-gray-700">
          <span className="font-semibold text-navy">{trip.pickup.split(",")[0]}</span>
          {" → "}
          <span className="font-semibold text-navy">{trip.destination.split(",")[0]}</span>
          <span className="text-gray-500 ml-2">• {vehicle.name} • {trip.passengers} pax</span>
        </div>
        <div className="text-xl font-bold text-orange-brand shrink-0">{formatCurrency(fare.finalFare)}</div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Your full name"
              className="input-field pl-10"
            />
          </div>
          {errors.name && <Error msg={errors.name} />}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mobile Number *</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">+91</div>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="10-digit mobile number"
              maxLength={10}
              className="input-field pl-16"
            />
          </div>
          {errors.phone && <Error msg={errors.phone} />}
        </div>

        {/* WhatsApp same toggle */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sameAsPhone}
              onChange={(e) => setSameAsPhone(e.target.checked)}
              className="w-4 h-4 accent-travel-blue"
            />
            <span className="text-sm text-gray-600">WhatsApp number is same as mobile number</span>
          </label>
          {!sameAsPhone && (
            <div className="mt-3">
              <div className="relative">
                <MessageCircle className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  placeholder="WhatsApp number"
                  maxLength={10}
                  className="input-field pl-10"
                />
              </div>
              {errors.whatsapp && <Error msg={errors.whatsapp} />}
            </div>
          )}
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email (Optional)</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="your@email.com"
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Special requirements */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Special Requirements</label>
          <textarea
            value={form.specialRequirements}
            onChange={(e) => handleChange("specialRequirements", e.target.value)}
            placeholder="Any special needs – pickup timing, pickup address, extra stops, etc."
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Trip details confirmation */}
        <div className="border border-gray-200 rounded-xl p-4 space-y-2 text-sm">
          <h4 className="font-semibold text-gray-800 mb-3">Trip Details</h4>
          {[
            ["Pickup", trip.pickup],
            ["Destination", trip.destination],
            ["Travel Date", formatDate(trip.travelDate)],
            ...(trip.returnDate ? [["Return Date", formatDate(trip.returnDate)]] : []),
            ["Passengers", `${trip.passengers}`],
            ["Vehicle", vehicle.name],
            ["Distance", `${trip.distance} km`],
            ["Estimated Fare", formatCurrency(fare.finalFare)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between text-gray-600">
              <span>{label}</span>
              <span className="font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center gap-2 py-4 text-base shadow-lg"
        >
          Confirm Booking Request
          <ChevronRight className="w-5 h-5" />
        </button>
        <p className="text-center text-xs text-gray-400">
          By confirming, you agree to our Terms & Conditions. Our team will contact you to confirm the trip.
        </p>
      </form>
    </div>
  );
}

function Error({ msg }: { msg: string }) {
  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-red-600 text-xs">
      <AlertCircle className="w-3.5 h-3.5" />
      {msg}
    </div>
  );
}
