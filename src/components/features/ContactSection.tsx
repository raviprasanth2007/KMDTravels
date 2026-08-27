import { MapPin, Phone, Mail, MessageCircle, Clock, Navigation } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-default">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">Get In Touch</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Have a question or need a custom quote? Reach out — we're available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact info */}
          <div>
            <div className="bg-navy rounded-2xl p-8 text-white mb-6">
              <h3 className="font-bold text-xl mb-6">KMD Travels</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-orange-brand" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Address</div>
                    <div className="text-blue-300 text-sm">{KMD_CONFIG.address}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-orange-brand" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Phone</div>
                    <a href={`tel:${KMD_CONFIG.phone}`} className="text-blue-300 text-sm hover:text-white transition-colors">
                      {KMD_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 text-orange-brand" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">WhatsApp</div>
                    <a
                      href={`https://wa.me/${KMD_CONFIG.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 text-sm hover:text-white transition-colors"
                    >
                      +{KMD_CONFIG.whatsappNumber}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-orange-brand" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Email</div>
                    <a href={`mailto:${KMD_CONFIG.email}`} className="text-blue-300 text-sm hover:text-white transition-colors">
                      {KMD_CONFIG.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-brand/20 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-orange-brand" />
                  </div>
                  <div>
                    <div className="font-medium mb-0.5">Availability</div>
                    <div className="text-blue-300 text-sm">24/7 – All days including holidays</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${KMD_CONFIG.phone}`}
                className="flex items-center justify-center gap-2 bg-navy text-white font-semibold py-4 rounded-xl hover:bg-navy-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${KMD_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={`https://maps.google.com/?q=Sathyamangalam,Erode,Tamil+Nadu`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-colors"
              >
                <Navigation className="w-5 h-5" />
                Directions
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById("trip-planner");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center gap-2 btn-primary py-4 rounded-xl"
              >
                <MapPin className="w-5 h-5" />
                Book Now
              </button>
            </div>
          </div>

          {/* Map embed placeholder */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg h-[500px] bg-gray-100 flex flex-col items-center justify-center">
            <iframe
              title="KMD Travels Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31398.30939720059!2d77.21886!3d11.50297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9a0f5b5e1c7b1%3A0xa5c3d1f2b4e7d8f9!2sSathyamangalam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
