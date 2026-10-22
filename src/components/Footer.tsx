import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Laptop as LaptopIcon, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  Lock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, addToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    addToast('Subscribed!', 'You will receive our weekly laptop benchmarks and VIP promo codes.', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 text-xs">
      
      {/* Newsletter Signup Bar: Ash & Black with Blue Accent */}
      <div className="border-b border-gray-800 py-10 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">
              Join the Hardware Inner Circle
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Stay ahead with 2026 laptop benchmarks & discount drops
            </h3>
            <p className="text-gray-400 text-xs">
              Subscribe for exclusive coupons (like HUB10) and hardware teardown insights.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          {/* Brand Info with User's Exact Location, Phone, Email */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => setCurrentView('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow">
                <LaptopIcon className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">
                LAPTOP <span className="text-blue-500">HUB</span>
              </span>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Founded by Jay Jhay with 5 years of hardware engineering expertise. We deliver certified, bench-tested laptops directly to your doorstep with guaranteed authenticity and full 2-year hardware warranty.
            </p>

            {/* User Corrected Details */}
            <div className="space-y-2 text-gray-300 text-xs">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>
                  Location: <strong className="text-white">Ikot Udoma</strong>, Akwa Ibom State
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Phone: <strong className="text-white">+234 907 6934 980</strong>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>
                  Email: <strong className="text-white">jayjhay615@gmail.com</strong>
                </span>
              </p>
            </div>
          </div>

          {/* Column 2: Laptop Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Laptops & Fleet
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Ultrabook');
                    setCurrentView('shop');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Ultrabooks & Slim
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Business');
                    setCurrentView('shop');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Business & Enterprise
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Creator');
                    setCurrentView('shop');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Creator & Studio OLED
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Gaming');
                    setCurrentView('shop');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  Gaming Powerhouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('2-in-1 Touch');
                    setCurrentView('shop');
                  }}
                  className="hover:text-blue-400 transition-colors"
                >
                  2-in-1 Touch Laptops
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setCurrentView('orders')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Track Doorstep Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('cart')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Shopping Cart & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  About Founder (Jay Jhay)
                </button>
              </li>
              <li>
                <span className="text-gray-400">2-Year HubShield™ Warranty</span>
              </li>
              <li>
                <span className="text-gray-400">30-Day Money-Back Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Payment & Trust
            </h4>
            <p className="text-gray-400 text-[11px] leading-relaxed">
              We accept Credit Cards, PayPal, Direct Bank Transfers, and Cash on Delivery with doorstep verification in Ikot Udoma.
            </p>
            <div className="space-y-1.5 text-[11px] text-gray-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
                <Truck className="w-3 h-3" /> Doorstep Courier Dispatch
              </span>
              <span className="flex items-center gap-1.5 text-gray-300 font-semibold">
                <ShieldCheck className="w-3 h-3 text-blue-400" /> 100% Genuine Certified
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} LAPTOP HUB. Founded by Jay Jhay • Ikot Udoma.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Delivery</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Warranty Certificate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
