import { MapPin, Car, IndianRupee, CalendarCheck, Navigation } from "lucide-react";

const STEPS = [
  { num: "01", icon: MapPin, title: "Enter Trip Details", desc: "Enter your pickup, destination, date and passenger count." },
  { num: "02", icon: Car, title: "Choose Vehicle", desc: "Browse available vehicles filtered for your group size." },
  { num: "03", icon: IndianRupee, title: "See Estimated Fare", desc: "View transparent fare breakdown with GST, toll and driver allowance." },
  { num: "04", icon: CalendarCheck, title: "Book Your Trip", desc: "Submit your details and get a booking confirmation instantly." },
  { num: "05", icon: Navigation, title: "Travel Comfortably", desc: "Our driver will arrive on time for a smooth, comfortable journey." },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-default">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-travel-blue text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">How It Works</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Book your trip in minutes. No registration, no hidden fees.
          </p>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-travel-blue/20 via-orange-brand/40 to-travel-blue/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex flex-col items-center text-center group">
                  <div className="relative mb-5">
                    <div className="w-20 h-20 bg-white border-2 border-gray-200 group-hover:border-orange-brand rounded-2xl flex flex-col items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                      <Icon className="w-7 h-7 text-travel-blue mb-1" />
                      <span className="text-[10px] font-bold text-gray-400">{step.num}</span>
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-brand rounded-full flex items-center justify-center">
                      <span className="text-white text-[10px] font-bold">{idx + 1}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
