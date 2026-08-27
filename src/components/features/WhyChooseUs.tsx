import { Shield, Clock, IndianRupee, Headphones, MapPin, Car } from "lucide-react";

const REASONS = [
  {
    icon: Shield,
    title: "Reliable Drivers",
    desc: "Experienced, verified and background-checked drivers for safe journeys.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Car,
    title: "Comfortable Vehicles",
    desc: "Well-maintained AC vehicles from sedans to 20-seater coaches.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: IndianRupee,
    title: "Transparent Pricing",
    desc: "No hidden charges. GST, toll and driver allowance shown upfront.",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Round-the-clock customer support for all your travel queries.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Safe Travel",
    desc: "GPS-tracked vehicles, real-time monitoring and safety protocols.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: MapPin,
    title: "All India Service",
    desc: "Travel anywhere across India from Tamil Nadu to Delhi and beyond.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-default">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-travel-blue text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Why Thousands Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Why Choose KMD Travels?</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We've been serving passengers across India for {new Date().getFullYear() - 2004} years with a commitment to comfort, reliability and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="card-premium p-6 group hover:-translate-y-1 transition-transform duration-300"
              >
                <div className={`w-12 h-12 ${reason.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${reason.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
