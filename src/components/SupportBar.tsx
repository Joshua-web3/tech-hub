import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Headphones, 
  PackageSearch, 
  RefreshCcw, 
  ShieldCheck, 
  Store, 
  Star, 
  CheckCircle2
} from 'lucide-react';

export const SupportBar: React.FC = () => {
  const { setCurrentView } = useCart();

  const customerReviews = [
    {
      id: 'rev-1',
      name: 'Dr. Michael Chen',
      role: 'Lead AI Researcher & Professor',
      modelBought: 'Apple MacBook Pro 16" M3 Max',
      rating: 5,
      date: '2 days ago',
      comment: 'Ordered the M3 Max MacBook for local LLM inference and CUDA simulation. Shipped to Ikot Udoma promptly, arrived in pristine factory seal with full diagnostic certificate. Jay Jhay’s hardware guidance was spot on.',
      verified: true
    },
    {
      id: 'rev-2',
      name: 'Sarah Jenkins',
      role: 'Senior Financial Analyst',
      modelBought: 'Lenovo ThinkPad X1 Carbon Gen 12',
      rating: 5,
      date: '1 week ago',
      comment: 'The ThinkPad keyboard is unmatched for 10-hour financial modeling sessions. The delivery details form made doorstep dropoff effortless. Customer support at +234 907 6934 980 is responsive and actually understands specs!',
      verified: true
    },
    {
      id: 'rev-3',
      name: 'Alex Rivera',
      role: 'Creative Director & 3D Artist',
      modelBought: 'HP Spectre x360 OLED & Dell XPS',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Color calibrated right out of the box with 100% DCI-P3 coverage. Zero dead pixels, no bloatware installed. Best laptop buying experience from Jay Jhay.',
      verified: true
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 text-gray-900">
      
      {/* Customer Testimonials Section */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Star className="w-3.5 h-3.5 fill-blue-600 text-blue-600" /> Customer Trust & Reviews
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              See what our customers say
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-800">4.9 / 5.0 Rating</span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-xs text-gray-500">(600+ Verified Buyers)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    {rev.name}
                    {rev.verified && (
                      <span title="Verified Buyer">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </h4>
                  <p className="text-[11px] text-gray-500">{rev.role}</p>
                  <p className="text-[10px] text-blue-600 font-bold mt-0.5">{rev.modelBought}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* "How Can We Help?" 5-Box Bar: Ash Gray & White with Blue icons */}
      <section className="bg-gray-100 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              How can we help?
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Direct assistance from Jay Jhay at +234 907 6934 980 • Ikot Udoma Delivery Hub
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            
            {/* Box 1: Technical Advisory */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center space-y-2 shadow-xs hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Hardware Advisory</h4>
              <p className="text-[11px] text-gray-500">Get 1-on-1 recommendations for your workflow</p>
            </div>

            {/* Box 2: Order Tracking */}
            <div 
              onClick={() => setCurrentView('orders')}
              className="bg-white p-5 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center space-y-2 shadow-xs hover:border-blue-400 transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <PackageSearch className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-blue-600">Track Order</h4>
              <p className="text-[11px] text-gray-500">Live Ikot Udoma doorstep delivery status</p>
            </div>

            {/* Box 3: Easy Returns */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center space-y-2 shadow-xs hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <RefreshCcw className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">30-Day Returns</h4>
              <p className="text-[11px] text-gray-500">Zero-hassle trial and money-back guarantee</p>
            </div>

            {/* Box 4: 2-Year Warranty */}
            <div className="bg-white p-5 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center space-y-2 shadow-xs hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">2-Yr Warranty</h4>
              <p className="text-[11px] text-gray-500">Full motherboard, screen, and battery coverage</p>
            </div>

            {/* Box 5: Store & Service */}
            <div className="col-span-2 md:col-span-1 bg-white p-5 rounded-2xl border border-gray-200 text-center flex flex-col items-center justify-center space-y-2 shadow-xs hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">Certified Hub</h4>
              <p className="text-[11px] text-gray-500">Authorized OEM parts & genuine serial numbers</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
