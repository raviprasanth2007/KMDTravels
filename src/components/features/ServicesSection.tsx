import { MapPin, ArrowLeftRight, Plane, Train, Users, Briefcase, Camera, Car } from "lucide-react";

const SERVICES = [
  { icon: MapPin, title: "Outstation Taxi", desc: "Comfortable outstation trips with experienced drivers across all Indian states." },
  { icon: ArrowLeftRight, title: "One-Way Taxi", desc: "Cost-effective one-way journeys with fair minimum billing." },
  { icon: ArrowLeftRight, title: "Round Trip", desc: "Round trips with driver availability throughout your stay." },
  { icon: Plane, title: "Airport Transfers", desc: "Reliable airport pickup and drop across Tamil Nadu and beyond." },
  { icon: Train, title: "Railway Transfers", desc: "Station pickups and drops at all times. Never miss your train." },
  { icon: Users, title: "Family Travel", desc: "Spacious, comfortable vehicles for family vacations and pilgrimages." },
  { icon: Briefcase, title: "Corporate Travel", desc: "Professional corporate car service for business teams." },
  { icon: Users, title: "Group Travel", desc: "Large-group travel with travellers and vans up to 20 passengers." },
  { icon: Camera, title: "Tourist Trips", desc: "Customised sightseeing tours to temples, hills and tourist destinations." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-navy">
      <div className="container-default">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Offer</h2>
          <p className="text-blue-300 max-w-xl mx-auto">
            From quick city transfers to long-distance All India tours — we have the right vehicle and service for every journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-brand/50 rounded-xl p-6 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 bg-orange-brand/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-brand/30 transition-colors">
                  <Icon className="w-5 h-5 text-orange-brand" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{service.title}</h3>
                <p className="text-blue-300 text-sm leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
