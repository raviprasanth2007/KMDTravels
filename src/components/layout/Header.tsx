import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, MapPin } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "#vehicles" },
  { label: "Services", href: "#services" },
  { label: "Routes", href: "#routes" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg">
      <div className="container-default">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-orange-brand rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none tracking-wide">KMD Travels</div>
              <div className="text-blue-300 text-[10px] font-medium tracking-widest uppercase">Sathyamangalam</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {!isAdmin && NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleAnchor(link.href)}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${KMD_CONFIG.phone}`}
              className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>{KMD_CONFIG.phone}</span>
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("trip-planner");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary text-sm py-2 px-5"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-light border-t border-white/10 fade-in">
          <div className="container-default py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleAnchor(link.href)}
                className="text-gray-300 hover:text-white text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-200 font-medium"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href={`tel:${KMD_CONFIG.phone}`}
                className="flex items-center gap-2 text-white bg-white/10 px-4 py-3 rounded-lg font-medium"
              >
                <Phone className="w-4 h-4" />
                {KMD_CONFIG.phone}
              </a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  const el = document.getElementById("trip-planner");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary text-center"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
