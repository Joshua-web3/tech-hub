import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  Cpu, 
  Truck, 
  Headphones, 
  ArrowRight,
  Code,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export const AboutMeSection: React.FC = () => {
  const { setCurrentView } = useCart();

  return (
    <section className="bg-white border-b border-gray-200 py-16 px-4 sm:px-6 lg:px-8 text-gray-900 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Founder & Engineering Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900">
            About Me & LAPTOP HUB
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            5 years of hardware systems expertise, silicon benchmarking, and personalized laptop delivery.
          </p>
        </div>

        {/* Founder Bio Card & Experience Grid: Ash & White Surfaces */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Founder Persona */}
            <div className="lg:col-span-5 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-black p-1 shadow-lg">
                  <div className="w-full h-full bg-gray-900 rounded-[14px] flex flex-col items-center justify-center p-3 text-center text-white">
                    <LaptopHubBadge />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full border-2 border-white shadow">
                  5+ YRS EXP
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-gray-900">Jay Jhay</h3>
                <p className="text-xs font-bold text-blue-600">
                  Founder & Senior Hardware Systems Specialist
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  5 Years in Personal Computing, Silicon Benchmarking & Customer Hardware Advisory
                </p>
              </div>

              {/* Contact Pill Box with User's Exact Credentials */}
              <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-left space-y-2 text-xs shadow-sm">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>
                    Location: <strong className="text-gray-900">Ikot Udoma</strong>, Akwa Ibom
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>
                    Phone: <strong className="text-gray-900">+234 907 6934 980</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    Email: <strong className="text-gray-900">jayjhay615@gmail.com</strong>
                  </span>
                </div>
              </div>

              {/* Quick Stat Pill Counter */}
              <div className="grid grid-cols-2 gap-3 w-full pt-1">
                <div className="bg-white border border-gray-200 p-3 rounded-xl text-center shadow-xs">
                  <span className="text-xl font-black text-gray-900 block">5+ Yrs</span>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Experience</span>
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-xl text-center shadow-xs">
                  <span className="text-xl font-black text-blue-600 block">2,400+</span>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Laptops Shipped</span>
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-xl text-center shadow-xs">
                  <span className="text-xl font-black text-gray-900 block">99.8%</span>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Satisfaction</span>
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-xl text-center shadow-xs">
                  <span className="text-xl font-black text-blue-600 block">72-Point</span>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Diagnostics</span>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Story & Standards */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                "We test every machine before it reaches your hands."
              </h3>

              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  Welcome to <strong className="text-gray-900">LAPTOP HUB</strong>. As a professional systems engineer with over 5 years of hands-on experience in personal computing hardware and software development, I built this platform with one single mission: to cut through the noise of misleading technical specs and deliver genuine, high-caliber laptops directly to your home.
                </p>
                <p>
                  Too many shoppers buy laptops only to find poor thermal throttling, dim displays, or inadequate battery longevity. At LAPTOP HUB, every single model in our store—from Apple M3 Max workstations to Copilot+ AI ultrabooks and RTX gaming powerhouses—is thoroughly evaluated against real-world compile workloads, rendering stress, and battery run-down tests.
                </p>
                <p>
                  Based in <strong className="text-gray-900">Ikot Udoma</strong>, we coordinate direct doorstep deliveries, live order tracking, and phone support at <strong className="text-gray-900">+234 907 6934 980</strong> to ensure complete peace of mind.
                </p>
              </div>

              {/* Guarantees List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 text-gray-800 shadow-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% Brand New & Factory Sealed</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 text-gray-800 shadow-xs">
                  <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Doorstep Handover in Ikot Udoma & Beyond</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 text-gray-800 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>2-Year Full Hardware HubShield™ Coverage</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 text-gray-800 shadow-xs">
                  <Headphones className="w-4 h-4 text-gray-700 flex-shrink-0" />
                  <span>Direct Advisory: +234 907 6934 980</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Available Laptops</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="mailto:jayjhay615@gmail.com"
                  className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm border border-gray-300 transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Contact Jay Jhay Directly</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

const LaptopHubBadge: React.FC = () => (
  <div className="flex flex-col items-center justify-center">
    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white mb-1 shadow">
      <Code className="w-5 h-5 text-white" />
    </div>
    <span className="text-[11px] font-black tracking-wider text-white">LAPTOP HUB</span>
    <span className="text-[9px] font-semibold text-blue-400">ENGINEERING</span>
  </div>
);
