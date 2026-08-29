import { Star, Quote } from "lucide-react";
import { KMD_CONFIG } from "@/constants/config";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainerFastVariant } from "@/lib/animations";

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
    location: "Bangalore",
    rating: 5,
    text: "Safe and comfortable journey from Bangalore to Ooty. Driver drove carefully in the hilly terrain. Very professional travel agency.",
    trip: "Bangalore → Ooty",
    avatar: "https://i.pravatar.cc/60?img=5",
  },
];

export default function ReviewsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-default">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariant}
        >
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-brand text-sm font-semibold px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-orange-brand" />
            {KMD_CONFIG.rating} / 5.0 Average Rating
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">What Passengers Say</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Don't just take our word for it. Read what thousands of satisfied customers have to say.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          variants={staggerContainerFastVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {REVIEWS.map((review, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeUpVariant}
              whileHover={{ y: -5, boxShadow: "0px 10px 30px rgba(0,0,0,0.06)" }}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 relative overflow-hidden transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-16 h-16 text-gray-200/50 -rotate-12" />
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 relative z-10 text-sm leading-relaxed">"{review.text}"</p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto border-t border-gray-200 pt-4 relative z-10">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  <div>
                    <h4 className="font-bold text-navy text-sm">{review.name}</h4>
                    <p className="text-gray-400 text-xs">{review.location}</p>
                  </div>
                </div>
                <div className="bg-white border border-gray-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-500">
                  {review.trip}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <a
            href={`https://g.page/${KMD_CONFIG.businessName.replace(/\s+/g, '')}/review`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-travel-blue font-semibold hover:text-navy hover:underline transition-colors group"
          >
            Read more reviews on Google
            <Star className="w-4 h-4 text-travel-blue group-hover:text-navy group-hover:translate-x-1 transition-all" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
