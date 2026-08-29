import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, MapPin } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "#vehicles" },
  { label: "Services", href: "#services" },
  { label: "Routes", href: "#routes" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAnchor = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur-md shadow-lg py-1" : "bg-navy py-2"
      }`}
    >
      <div className="container-default">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 bg-orange-brand rounded-lg flex items-center justify-center"
            >
              <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
            </motion.div>
            <div>
              <div className="text-white font-bold text-lg leading-none tracking-wide">KMD Travels</div>
              <div className="text-blue-300 text-[10px] font-medium tracking-widest uppercase">Sathyamangalam</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {!isAdmin && NAV_LINKS.map((link) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={link.label}
                onClick={() => handleAnchor(link.href)}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors duration-200"
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${KMD_CONFIG.phone}`}
              className="flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>{KMD_CONFIG.phone}</span>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(239, 108, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const el = document.getElementById("trip-planner");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary text-sm py-2 px-5 relative overflow-hidden group"
            >
              <span className="relative z-10">Book Now</span>
              <motion.div 
                className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-[shine_1s_ease-out]" 
              />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-navy border-t border-white/10 overflow-hidden"
          >
            <div className="container-default py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleAnchor(link.href)}
                  className="text-gray-300 hover:text-white text-left px-4 py-3 rounded-lg hover:bg-white/10 transition-colors duration-200 font-medium"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
