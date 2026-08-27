import { Star, Quote } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";

const REVIEWS = [
  {
    name: "Ramesh Kumar",
    location: "Coimbatore",
    rating: 5,
    text: "Excellent service! Booked a 4-seater for Coimbatore to Bangalore. Driver was punctual, vehicle was clean and AC was perfect. Will definitely book again.",
    trip: "Coimbatore → Bangalore",
    avatar: "https://i.pravatar.cc/60?img=11",
  },
  {
    name: "Priya Suresh",
    location: "Salem",
    rating: 4,
    text: "Good experience overall. The fare calculator on the website gave an accurate estimate. No surprise charges at the end. Transparent pricing is great.",
    trip: "Sathyamangalam → Chennai",
    avatar: "https://i.pravatar.cc/60?img=25",
  },
  {
    name: "Venkatesh Rajan",
    location: "Erode",
    rating: 4,
    text: "Booked a 12-seater for a family function trip. Well-maintained vehicle, experienced driver who knew all the routes. Very satisfied.",
    trip: "Erode → Madurai",
    avatar: "https://i.pravatar.cc/60?img=33",
  },
  {
    name: "Kavitha Mohan",
    location: "Tiruppur",
    rating: 5,
    text: "Used KMD Travels for an airport transfer. On-time pickup, comfortable ride. The WhatsApp booking was very convenient.",
    trip: "Tiruppur → Coimbatore Airport",
    avatar: "https://i.pravatar.cc/60?img=44",
  },
  {
    name: "Arjun Babu",
    location: "Ooty",
    rating: 4,
    text: "Booked for a Ooty tourist trip. Driver was knowledgeable about all the spots. Fair pricing with no hidden charges.",
    trip: "Ooty Sightseeing",
    avatar: "https://i.pravatar.cc/60?img=55",
  },
];

export default function ReviewsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        {/* Header with overall rating */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            Customer Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="text-5xl font-bold text-navy">{KMD_CONFIG.rating}</div>
            <div>
              <div className="flex text-yellow-400 text-xl mb-1">
                {"★".repeat(Math.floor(KMD_CONFIG.rating))}
                {"☆".repeat(5 - Math.floor(KMD_CONFIG.rating))}
              </div>
              <div className="text-gray-500 text-sm">
                Based on {KMD_CONFIG.totalRatings}+ ratings
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div key={review.name} className="card-premium p-6 flex flex-col">
              <Quote className="w-7 h-7 text-blue-100 mb-3 rotate-180" />
              <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">{review.text}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=1e3a5f&color=fff`;
                    }}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{review.name}</div>
                    <div className="text-gray-400 text-xs">{review.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex text-yellow-400 text-sm justify-end">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{review.trip}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
