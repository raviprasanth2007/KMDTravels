// ============================================================
// KMD TRAVELS – POPULAR ROUTES & DISTANCE DATABASE
// Distances are approximate road distances in km.
// ============================================================

export interface PopularRoute {
  id: string;
  from: string;
  to: string;
  distance: number;
  duration: string;
  highlight?: string;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  { id: "r1", from: "Sathyamangalam", to: "Coimbatore", distance: 105, duration: "2 hrs 30 mins", highlight: "Most Popular" },
  { id: "r2", from: "Sathyamangalam", to: "Erode", distance: 62, duration: "1 hr 30 mins" },
  { id: "r3", from: "Sathyamangalam", to: "Salem", distance: 110, duration: "2 hrs 45 mins" },
  { id: "r4", from: "Sathyamangalam", to: "Bangalore", distance: 230, duration: "5 hrs 00 mins" },
  { id: "r5", from: "Sathyamangalam", to: "Chennai", distance: 480, duration: "8 hrs 30 mins" },
  { id: "r6", from: "Coimbatore", to: "Bangalore", distance: 360, duration: "6 hrs 30 mins" },
  { id: "r7", from: "Coimbatore", to: "Chennai", distance: 490, duration: "8 hrs 00 mins" },
  { id: "r8", from: "Coimbatore", to: "Mysore", distance: 270, duration: "5 hrs 00 mins" },
  { id: "r9", from: "Chennai", to: "Bangalore", distance: 350, duration: "6 hrs 00 mins" },
  { id: "r10", from: "Coimbatore", to: "Madurai", distance: 240, duration: "4 hrs 30 mins" },
];

// ============================================================
// Distance lookup table (bidirectional)
// Key format: "City A|City B" (alphabetically sorted)
// ============================================================
type DistanceEntry = { distance: number; duration: string };

const RAW_DISTANCES: Array<[string, string, number, string]> = [
  // From Sathyamangalam
  ["Sathyamangalam", "Coimbatore", 105, "2 hrs 30 mins"],
  ["Sathyamangalam", "Erode", 62, "1 hr 30 mins"],
  ["Sathyamangalam", "Salem", 110, "2 hrs 45 mins"],
  ["Sathyamangalam", "Bangalore", 230, "5 hrs 00 mins"],
  ["Sathyamangalam", "Bengaluru", 230, "5 hrs 00 mins"],
  ["Sathyamangalam", "Chennai", 480, "8 hrs 30 mins"],
  ["Sathyamangalam", "Mysore", 210, "4 hrs 30 mins"],
  ["Sathyamangalam", "Mysuru", 210, "4 hrs 30 mins"],
  ["Sathyamangalam", "Madurai", 300, "5 hrs 30 mins"],
  ["Sathyamangalam", "Trichy", 270, "5 hrs 00 mins"],
  ["Sathyamangalam", "Ooty", 95, "3 hrs 00 mins"],
  ["Sathyamangalam", "Tiruppur", 80, "2 hrs 00 mins"],
  ["Sathyamangalam", "Pollachi", 75, "1 hr 45 mins"],
  ["Sathyamangalam", "Palakkad", 95, "2 hrs 15 mins"],
  ["Sathyamangalam", "Thrissur", 145, "3 hrs 15 mins"],
  ["Sathyamangalam", "Kochi", 210, "4 hrs 30 mins"],
  ["Sathyamangalam", "Cochin", 210, "4 hrs 30 mins"],
  ["Sathyamangalam", "Kozhikode", 260, "5 hrs 30 mins"],
  ["Sathyamangalam", "Calicut", 260, "5 hrs 30 mins"],
  ["Sathyamangalam", "Thiruvananthapuram", 440, "8 hrs 30 mins"],
  ["Sathyamangalam", "Trivandrum", 440, "8 hrs 30 mins"],
  ["Sathyamangalam", "Vellore", 380, "7 hrs 00 mins"],
  ["Sathyamangalam", "Tirunelveli", 440, "8 hrs 00 mins"],
  ["Sathyamangalam", "Hyderabad", 650, "11 hrs 00 mins"],
  ["Sathyamangalam", "Goa", 650, "11 hrs 00 mins"],
  ["Sathyamangalam", "Pune", 1080, "18 hrs 00 mins"],
  ["Sathyamangalam", "Mumbai", 1340, "22 hrs 00 mins"],
  ["Sathyamangalam", "Delhi", 2250, "36 hrs 00 mins"],
  // Coimbatore based
  ["Coimbatore", "Bangalore", 360, "6 hrs 30 mins"],
  ["Coimbatore", "Bengaluru", 360, "6 hrs 30 mins"],
  ["Coimbatore", "Chennai", 490, "8 hrs 00 mins"],
  ["Coimbatore", "Madurai", 240, "4 hrs 30 mins"],
  ["Coimbatore", "Mysore", 270, "5 hrs 00 mins"],
  ["Coimbatore", "Mysuru", 270, "5 hrs 00 mins"],
  ["Coimbatore", "Ooty", 90, "2 hrs 30 mins"],
  ["Coimbatore", "Salem", 160, "3 hrs 00 mins"],
  ["Coimbatore", "Trichy", 290, "5 hrs 15 mins"],
  ["Coimbatore", "Kochi", 200, "4 hrs 00 mins"],
  ["Coimbatore", "Cochin", 200, "4 hrs 00 mins"],
  ["Coimbatore", "Palakkad", 55, "1 hr 15 mins"],
  ["Coimbatore", "Hyderabad", 850, "14 hrs 00 mins"],
  ["Coimbatore", "Goa", 700, "12 hrs 00 mins"],
  ["Coimbatore", "Thiruvananthapuram", 380, "7 hrs 00 mins"],
  // Chennai based
  ["Chennai", "Bangalore", 350, "6 hrs 00 mins"],
  ["Chennai", "Bengaluru", 350, "6 hrs 00 mins"],
  ["Chennai", "Madurai", 460, "8 hrs 00 mins"],
  ["Chennai", "Mysore", 480, "8 hrs 30 mins"],
  ["Chennai", "Hyderabad", 620, "10 hrs 30 mins"],
  ["Chennai", "Vellore", 140, "2 hrs 30 mins"],
  ["Chennai", "Pondicherry", 155, "3 hrs 00 mins"],
  ["Chennai", "Kochi", 690, "12 hrs 00 mins"],
  // Bangalore based
  ["Bangalore", "Mysore", 150, "3 hrs 00 mins"],
  ["Bengaluru", "Mysuru", 150, "3 hrs 00 mins"],
  ["Bangalore", "Madurai", 480, "8 hrs 30 mins"],
  ["Bangalore", "Hyderabad", 570, "9 hrs 30 mins"],
  ["Bangalore", "Goa", 590, "10 hrs 00 mins"],
  ["Bangalore", "Mumbai", 980, "16 hrs 00 mins"],
  ["Bangalore", "Pune", 840, "14 hrs 00 mins"],
  ["Bangalore", "Kochi", 570, "10 hrs 00 mins"],
  ["Bangalore", "Ooty", 270, "5 hrs 00 mins"],
  // Erode based
  ["Erode", "Coimbatore", 80, "2 hrs 00 mins"],
  ["Erode", "Salem", 65, "1 hr 30 mins"],
  ["Erode", "Tiruppur", 45, "1 hr 00 mins"],
];

// Build lookup map
const DISTANCE_MAP = new Map<string, DistanceEntry>();

for (const [a, b, dist, dur] of RAW_DISTANCES) {
  const keyAB = `${a.toLowerCase()}|${b.toLowerCase()}`;
  const keyBA = `${b.toLowerCase()}|${a.toLowerCase()}`;
  DISTANCE_MAP.set(keyAB, { distance: dist, duration: dur });
  DISTANCE_MAP.set(keyBA, { distance: dist, duration: dur });
}

export function lookupDistance(from: string, to: string): DistanceEntry | null {
  const key = `${from.toLowerCase()}|${to.toLowerCase()}`;
  return DISTANCE_MAP.get(key) || null;
}

// Estimate distance when no exact match: rough straight-line + 35% road factor
export function estimateDistance(from: string, to: string): DistanceEntry {
  // Try partial match
  for (const [key, value] of DISTANCE_MAP.entries()) {
    const [k1, k2] = key.split("|");
    if (
      (k1.includes(from.toLowerCase()) || from.toLowerCase().includes(k1)) &&
      (k2.includes(to.toLowerCase()) || to.toLowerCase().includes(k2))
    ) {
      return value;
    }
  }
  // Default fallback – indicate it's estimated
  return { distance: 300, duration: "Estimated" };
}

export function getDistance(from: string, to: string): DistanceEntry & { isExact: boolean } {
  const exact = lookupDistance(from, to);
  if (exact) return { ...exact, isExact: true };
  
  // Try partial city name matching
  const fromLower = from.toLowerCase().split(",")[0].trim();
  const toLower = to.toLowerCase().split(",")[0].trim();
  const partial = lookupDistance(fromLower, toLower);
  if (partial) return { ...partial, isExact: true };
  
  const est = estimateDistance(fromLower, toLower);
  return { ...est, isExact: false };
}

// All known Indian city suggestions
export const INDIAN_CITIES: string[] = [
  "Sathyamangalam, Tamil Nadu",
  "Coimbatore, Tamil Nadu",
  "Erode, Tamil Nadu",
  "Salem, Tamil Nadu",
  "Chennai, Tamil Nadu",
  "Madurai, Tamil Nadu",
  "Trichy, Tamil Nadu",
  "Tiruppur, Tamil Nadu",
  "Vellore, Tamil Nadu",
  "Tirunelveli, Tamil Nadu",
  "Ooty, Tamil Nadu",
  "Pollachi, Tamil Nadu",
  "Karur, Tamil Nadu",
  "Dindigul, Tamil Nadu",
  "Thanjavur, Tamil Nadu",
  "Nagercoil, Tamil Nadu",
  "Kanchipuram, Tamil Nadu",
  "Kumbakonam, Tamil Nadu",
  "Pondicherry, Tamil Nadu",
  "Villupuram, Tamil Nadu",
  "Namakkal, Tamil Nadu",
  "Dharmapuri, Tamil Nadu",
  "Krishnagiri, Tamil Nadu",
  "Hosur, Tamil Nadu",
  "Bangalore, Karnataka",
  "Bengaluru, Karnataka",
  "Mysore, Karnataka",
  "Mysuru, Karnataka",
  "Hubli, Karnataka",
  "Mangalore, Karnataka",
  "Mangaluru, Karnataka",
  "Belgaum, Karnataka",
  "Davangere, Karnataka",
  "Bellary, Karnataka",
  "Shimoga, Karnataka",
  "Tumkur, Karnataka",
  "Kochi, Kerala",
  "Cochin, Kerala",
  "Thiruvananthapuram, Kerala",
  "Trivandrum, Kerala",
  "Kozhikode, Kerala",
  "Calicut, Kerala",
  "Thrissur, Kerala",
  "Palakkad, Kerala",
  "Kannur, Kerala",
  "Kollam, Kerala",
  "Alappuzha, Kerala",
  "Hyderabad, Telangana",
  "Warangal, Telangana",
  "Vijayawada, Andhra Pradesh",
  "Visakhapatnam, Andhra Pradesh",
  "Tirupati, Andhra Pradesh",
  "Mumbai, Maharashtra",
  "Pune, Maharashtra",
  "Nagpur, Maharashtra",
  "Aurangabad, Maharashtra",
  "Nashik, Maharashtra",
  "Goa, Goa",
  "Panaji, Goa",
  "Delhi, Delhi",
  "New Delhi, Delhi",
  "Kolkata, West Bengal",
  "Ahmedabad, Gujarat",
  "Surat, Gujarat",
  "Jaipur, Rajasthan",
  "Jodhpur, Rajasthan",
  "Udaipur, Rajasthan",
  "Chandigarh, Punjab",
  "Amritsar, Punjab",
  "Bhopal, Madhya Pradesh",
  "Indore, Madhya Pradesh",
  "Lucknow, Uttar Pradesh",
  "Agra, Uttar Pradesh",
  "Varanasi, Uttar Pradesh",
];
