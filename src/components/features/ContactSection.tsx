import { MapPin, Phone, Mail, MessageCircle, Clock, Navigation } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";
import { motion } from "framer-motion";
import { fadeUpVariant, slideInVariant, slideInRightVariant } from "@/lib/animations";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-default">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Get In Touch</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Have a question or need a custom quote? Reach out — we're available 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideInVariant}
          >
            <div className="bg-navy rounded-2xl p-8 text-white mb-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Navigation className="w-48 h-48 -rotate-12" />
              </div>
              
              <h3 className="font-bold text-xl mb-6 relative z-10">KMD Travels</h3>
              <div className="space-y-5 relative z-10">
                <div className="flex items-start gap-4 group/item cursor-default">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-orange-brand transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-orange-brand group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Address</div>
                    <div className="text-blue-300 text-sm">{KMD_CONFIG.address}</div>
                  </div>
                </div>
                <a href={`tel:${KMD_CONFIG.phone}`} className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-orange-brand transition-colors duration-300">
                    <Phone className="w-5 h-5 text-orange-brand group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Phone</div>
                    <div className="text-blue-300 text-sm">{KMD_CONFIG.phone} (24/7 Booking)</div>
                  </div>
                </a>
                <a href={`mailto:${KMD_CONFIG.email}`} className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-orange-brand transition-colors duration-300">
                    <Mail className="w-5 h-5 text-orange-brand group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Email</div>
                    <div className="text-blue-300 text-sm">{KMD_CONFIG.email}</div>
                  </div>
                </a>
                <div className="flex items-start gap-4 group/item cursor-default">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-orange-brand transition-colors duration-300">
                    <Clock className="w-5 h-5 text-orange-brand group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Working Hours</div>
                    <div className="text-blue-300 text-sm">Open 24 Hours, 7 Days a week</div>
                  </div>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${KMD_CONFIG.whatsappNumber}?text=Hello KMD Travels, I need some information about booking a trip.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white p-5 rounded-2xl font-bold shadow-lg transition-colors group"
            >
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Chat With Us on WhatsApp
            </motion.a>
          </motion.div>

          {/* Map (OpenStreetMap iframe) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideInRightVariant}
            className="h-[350px] md:h-full min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-200 relative group flex flex-col"
          >
            <div className="flex-1 relative">
              <iframe
                title="KMD Travels Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.2188%2C11.4834%2C77.2588%2C11.5234&amp;layer=mapnik&amp;marker=11.5034%2C77.2388"
                className="absolute inset-0 w-full h-full border-0 grayscale-[0.5] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            
            {/* Get Directions Button Layer */}
            <div className="bg-white p-4 border-t border-gray-100 z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-navy text-sm">KMD Travels HQ</h4>
                <p className="text-xs text-gray-500">Sathyamangalam, Erode</p>
              </div>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Sathyamangalam,+Erode,+Tamil+Nadu+638402"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary py-2 px-6 text-sm w-full sm:w-auto text-center"
              >
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
