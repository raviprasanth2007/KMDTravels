import { useState, useRef, useEffect } from "react";
import { MapPin, X, Search } from "lucide-react";
import { INDIAN_CITIES } from "@/constants/routes";
import { cn } from "@/lib/utils";

interface LocationSelectorProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: "pickup" | "destination";
}

export default function LocationSelector({
  label,
  placeholder,
  value,
  onChange,
  icon = "pickup",
}: LocationSelectorProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleInput = (val: string) => {
    setQuery(val);
    onChange(val);
    if (val.length >= 2) {
      const filtered = INDIAN_CITIES.filter((c) =>
        c.toLowerCase().includes(val.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
  };

  const handleSelect = (city: string) => {
    setQuery(city);
    onChange(city);
    setSuggestions([]);
    setOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onChange("");
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <MapPin
          className={cn(
            "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4",
            icon === "pickup" ? "text-travel-blue" : "text-orange-brand"
          )}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInput(e.target.value)}
          onFocus={() => {
            if (query.length >= 2 && suggestions.length > 0) setOpen(true);
          }}
          placeholder={placeholder}
          className="input-field pl-10 pr-10"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden fade-in">
          {suggestions.map((city) => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center gap-3 border-b border-gray-50 last:border-b-0 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-gray-700 text-sm">{city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
