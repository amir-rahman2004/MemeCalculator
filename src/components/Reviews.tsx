import { Star, ShieldCheck, Heart } from 'lucide-react';
import { PREMIUM_REVIEWS } from '../data';
import { playClick } from '../utils/audio';

export default function Reviews() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-12 space-y-8">
      
      {/* Section Title */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center justify-center gap-2">
          <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
          Verified Subscriber Testimonials
        </h2>
        <p className="text-zinc-500 text-sm max-w-lg mx-auto">
          Read what our certified Bangladesh arithmetic users are saying about our premium locked pipeline.
        </p>
      </div>

      {/* Grid of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PREMIUM_REVIEWS.map((review) => (
          <div 
            key={review.id}
            className="group bg-zinc-950/40 backdrop-blur-md border border-zinc-900 hover:border-amber-500/30 rounded-2xl p-5 space-y-4 shadow-xl transition-all duration-300 hover:translate-y-[-2px] flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Star Rating and Plan Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(review.rating) 
                          ? 'text-amber-400 fill-amber-400' 
                          : 'text-zinc-700'
                      }`} 
                    />
                  ))}
                  <span className="text-zinc-400 text-xs font-mono ml-1.5">{review.rating}</span>
                </div>
                
                {/* Plan Tier Badge */}
                <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  {review.plan}
                </span>
              </div>

              {/* Review Comment */}
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            {/* Profile Line */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-900/60 mt-2">
              <div className="flex items-center space-x-2.5">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-8 h-8 rounded-full border border-zinc-800 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-amber-400 transition">
                    {review.name}
                  </h4>
                  <span className="text-[10px] text-zinc-500">
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-zinc-600 font-medium">
                {review.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Signoff */}
      <div className="text-center text-xs text-zinc-500 flex items-center justify-center gap-1.5 pt-4">
        <span>Verified by Bangladesh Ledger Authority</span>
        <span>•</span>
        <span className="flex items-center gap-1 text-zinc-400">
          Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> for academic suspense
        </span>
      </div>

    </section>
  );
}
