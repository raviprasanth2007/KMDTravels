import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy text-gray-300">
      <div className="container-default py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-orange-brand rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">KMD Travels</div>
                <div className="text-blue-300 text-[10px] font-medium tracking-widest uppercase">Sathyamangalam</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Reliable, comfortable and affordable travel across India. Serving passengers since {year - parseInt(KMD_CONFIG.yearsInBusiness)} from Sathyamangalam, Erode.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${KMD_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href={`tel:${KMD_CONFIG.phone}`}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Vehicles", "Services", "Book Now", "Contact"].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))}
                    className="hover:text-orange-brand transition-colors duration-200"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              {["Outstation Taxi", "One-Way Trips", "Round Trips", "Airport Transfers", "Railway Transfers", "Corporate Travel", "Group Travel", "Tourist Trips"].map((s) => (
                <li key={s}>
                  <span className="hover:text-orange-brand transition-colors duration-200 cursor-default">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-brand mt-0.5 shrink-0" />
                <span>{KMD_CONFIG.address}</span>
              </div>
              <a href={`tel:${KMD_CONFIG.phone}`} className="flex items-center gap-3 hover:text-orange-brand transition-colors">
                <Phone className="w-4 h-4 text-orange-brand" />
                {KMD_CONFIG.phone}
              </a>
              <a href={`mailto:${KMD_CONFIG.email}`} className="flex items-center gap-3 hover:text-orange-brand transition-colors">
                <Mail className="w-4 h-4 text-orange-brand" />
                {KMD_CONFIG.email}
              </a>
              <div className="flex items-center gap-2 pt-2">
                <div className="flex text-yellow-400">{"★★★★☆"}</div>
                <span className="text-sm text-gray-400">{KMD_CONFIG.rating}/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-default py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <span>© {year} KMD Travels. All rights reserved.</span>
          <div className="flex gap-5">
            <Link to="/admin" className="hover:text-gray-300 transition-colors">Admin</Link>
            <span className="cursor-default hover:text-gray-300 transition-colors">Terms & Conditions</span>
            <span className="cursor-default hover:text-gray-300 transition-colors">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
