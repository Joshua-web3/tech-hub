import React, { useState } from 'react';
import { LAPTOP_CATALOG } from '../data/laptops';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { 
  ArrowRight, 
  Cpu, 
  SlidersHorizontal,
  Flame,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const MustHavesSection: React.FC = () => {
  const { setCurrentView, setIsCompareModalOpen, setSelectedCategory } = useCart();
  const [activeTab, setActiveTab] = useState<'all' | 'ai' | 'bestseller' | 'gaming'>('all');

  // Filtered list based on tab
  const filteredLaptops = LAPTOP_CATALOG.filter((laptop) => {
    if (activeTab === 'ai') return laptop.badge === 'New AI PC' || laptop.specs.processor.includes('NPU') || laptop.specs.processor.includes('Ultra');
    if (activeTab === 'bestseller') return laptop.badge === 'Best Seller' || laptop.rating >= 4.9;
    if (activeTab === 'gaming') return laptop.category === 'Gaming' || laptop.specs.gpu.includes('RTX');
    return true;
  });

  return (
    <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header with Tabs */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
                <Flame className="w-4 h-4 text-orange-500" /> Curated Hardware Selection
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                Shop These Must Haves
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                Benchmarked by our 5-year hardware engineering lab. Selected for peak thermals, vivid color accuracy, and battery endurance.
              </p>
            </div>

            {/* Filter Tabs: White & Ash */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-xs">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                All Featured ({LAPTOP_CATALOG.length})
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  activeTab === 'ai'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Zap className="w-3 h-3 text-amber-500" />
                Copilot+ & AI PCs
              </button>
              <button
                onClick={() => setActiveTab('bestseller')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'bestseller'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Top Rated (4.9★+)
              </button>
              <button
                onClick={() => setActiveTab('gaming')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'gaming'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                RTX Powerhouse
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredLaptops.slice(0, 6).map((laptop) => (
              <ProductCard key={laptop.id} laptop={laptop} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setCurrentView('shop');
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black hover:bg-gray-800 text-white text-sm font-bold transition-colors cursor-pointer shadow-sm"
            >
              <span>Explore All {LAPTOP_CATALOG.length} Laptops in Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Feature Story Banner: Solid Black with Ash accents and Blue buttons */}
        <div className="relative rounded-3xl overflow-hidden bg-black text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/40 text-blue-400 text-xs font-bold">
                <Cpu className="w-3.5 h-3.5" /> High-Performance Engineering Standard
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug">
                The race to adapt. Engineered for uncompromising builders.
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Modern workflows demand dedicated on-die neural acceleration, hardware raytracing, and uncompromised battery longevity. Every machine purchased through LAPTOP HUB undergoes our stringent 72-point performance validation before doorstep delivery to Ikot Udoma and nationwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero Bloatware Pre-Install Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Stress-Tested Thermals & Core Clocks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Factory Sealed & Verified Serial Numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Doorstep Handover to Ikot Udoma</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setCurrentView('shop')}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-colors cursor-pointer shadow-lg"
                >
                  Shop High-Performance Laptops
                </button>
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-200 font-semibold text-sm border border-gray-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                  <span>Launch Laptop Matcher</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <img
                  src="/assets/aistudio/image_46b3a189.png"
                  alt="Laptop Hub High Performance Lineup"
                  className="relative z-10 w-full max-w-md object-contain filter drop-shadow-2xl rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
