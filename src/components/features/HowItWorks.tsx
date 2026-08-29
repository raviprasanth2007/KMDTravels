import { MapPin, Car, IndianRupee, CalendarCheck, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainerVariant } from "@/lib/animations";

const STEPS = [
  { num: "01", icon: MapPin, title: "Enter Trip Details", desc: "Enter your pickup, destination, date and passenger count." },
  { num: "02", icon: Car, title: "Choose Vehicle", desc: "Browse available vehicles filtered for your group size." },
  { num: "03", icon: IndianRupee, title: "See Estimated Fare", desc: "View transparent fare breakdown with GST, toll and driver allowance." },
  { num: "04", icon: CalendarCheck, title: "Book Your Trip", desc: "Submit your details and get a booking confirmation instantly." },
  { num: "05", icon: Navigation, title: "Travel Comfortably", desc: "Our driver will arrive on time for a smooth, comfortable journey." },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-default">
        <motion.div 
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-travel-blue text-sm font-semibold px-4 py-2 rounded-full mb-4">
            Simple Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">How It Works</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Book your trip in minutes. No registration, no hidden fees.
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          variants={staggerContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-10 left-[10%] right-[10%] h-0.5 bg-gray-200">
            <motion.div 
              className="h-full bg-gradient-to-r from-travel-blue/50 via-orange-brand to-travel-blue/50"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.num} 
                  variants={fadeUpVariant}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-5">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: -5, borderColor: "#EF6C00" }}
                      className="w-20 h-20 bg-white border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center shadow-md transition-colors duration-300"
                    >
                      <Icon className="w-7 h-7 text-travel-blue mb-1" />
                      <span className="text-[10px] font-bold text-gray-400">{step.num}</span>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", delay: 0.3 + idx * 0.1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-orange-brand rounded-full flex items-center justify-center shadow-sm"
                    >
                      <span className="text-white text-[10px] font-bold">{idx + 1}</span>
                    </motion.div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
