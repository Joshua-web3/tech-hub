import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { LAPTOP_CATALOG } from '../data/laptops';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  BatteryCharging, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  SlidersHorizontal
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setCurrentView, addToCart, setSelectedLaptopForModal, setIsCompareModalOpen } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Curated hero showcase slides matching the reference download.png
  const slides = [
    {
      title: "The website that builds around you.",
      subtitle: "Next-Gen AI Laptops & Mobile Workstations",
      description: "Engineered with dedicated neural processing units (NPU), whisper-quiet thermals, and aerospace materials. Fast doorstep delivery directly in Ikot Udoma & nationwide.",
      laptop: LAPTOP_CATALOG[0], // Surface Laptop AI
      image: '/assets/aistudio/image_f7072d25.png',
      badge: "World's First Copilot+ AI PC Fleet",
      accent: "from-blue-600 to-indigo-600",
      highlights: ["45 TOPS Neural Engine", "22h Battery Endurance", "Ikot Udoma Doorstep Delivery"]
    },
    {
      title: "The race to adapt. Mastered.",
      subtitle: "Precision Engineering & Extreme Workstation Power",
      description: "Curated with 5 years of hardware craftsmanship by Jay Jhay. Multi-core performance, studio-grade calibrated displays, and guaranteed same-day dispatch.",
      laptop: LAPTOP_CATALOG[1], // HP Spectre 360 Gold
      image: '/assets/aistudio/image_46b3a189.png', // The stunning multi-laptop flat lay
      badge: "Flagship 2026 Collection",
      accent: "from-amber-600 to-orange-600",
      highlights: ["32GB High-Speed RAM", "2.8K Ultra OLED Display", "2-Year HubShield Warranty"]
    },
    {
      title: "Extreme silicon for creators & coders.",
      subtitle: "Apple M3 Max & Intel Ultra Architecture",
      description: "Render complex 3D scenes, train local AI models, and compile in seconds without breaking thermal equilibrium.",
      laptop: LAPTOP_CATALOG[3], // MacBook Pro 16 M3 Max
      image: '/assets/aistudio/image_ea9cfa87.png',
      badge: "Peak Performance Certified",
      accent: "from-purple-600 to-blue-600",
      highlights: ["64GB Unified Memory", "Liquid Retina XDR 1600 nits", "Zero Thermal Throttling"]
    }
  ];

  // Auto rotate slides every 7s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const activeSlide = slides[currentSlide];

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-[400px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-blue-400 text-xs font-semibold shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{activeSlide.badge}</span>
            </div>

            {/* Headline matching HP download.png style */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                {activeSlide.title}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-blue-400">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {activeSlide.description}
            </p>

            {/* Hardware Highlight Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              {activeSlide.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/70 border border-slate-700/50 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={() => {
                  addToCart(activeSlide.laptop);
                }}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Add to Cart (${activeSlide.laptop.price.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedLaptopForModal(activeSlide.laptop)}
                className="px-5 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Full Specs</span>
              </button>

              <button
                onClick={() => setCurrentView('shop')}
                className="px-4 py-3.5 rounded-xl text-slate-400 hover:text-white text-sm font-medium hover:underline transition-all"
              >
                Browse All Laptops
              </button>
            </div>

            {/* Trust Assurance Bar */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Certified Genuine Hardware</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>72-Point Thermal Testing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BatteryCharging className="w-4 h-4 text-amber-400" />
                <span>100% Battery Health Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Res Interactive Laptop Presentation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-md lg:max-w-none group">
              
              {/* Radial backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-indigo-500/10 rounded-3xl blur-2xl transform group-hover:scale-105 transition-transform duration-500" />
              
              {/* Card Container */}
              <div className="relative bg-slate-900/80 border border-slate-800 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
                
                {/* Floating Price Tag */}
                <div className="absolute top-4 right-4 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 text-right shadow-lg">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Special Price</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-blue-400">
                      ${activeSlide.laptop.price.toLocaleString()}
                    </span>
                    {activeSlide.laptop.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">
                        ${activeSlide.laptop.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Main Laptop Image */}
                <div 
                  onClick={() => setSelectedLaptopForModal(activeSlide.laptop)}
                  className="h-64 sm:h-72 w-full flex items-center justify-center p-2 cursor-pointer"
                >
                  <img
                    src={activeSlide.image}
                    alt={activeSlide.laptop.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Model Info Sub-bar */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {activeSlide.laptop.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {activeSlide.laptop.specs.processor}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLaptopForModal(activeSlide.laptop);
                    }}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
                  >
                    Quick View →
                  </button>
                </div>
              </div>
            </div>

            {/* Slider Dots & Navigation Controls (matching download.png dots style) */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-700 transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx
                        ? 'w-8 bg-blue-500'
                        : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center border border-slate-700 transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
