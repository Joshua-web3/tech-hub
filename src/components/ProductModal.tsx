import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ShoppingCart, 
  Star, 
  Cpu, 
  Layers, 
  HardDrive, 
  Monitor, 
  BatteryCharging, 
  Scale, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  SlidersHorizontal,
  Plus,
  Minus
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { 
    selectedLaptopForModal, 
    setSelectedLaptopForModal, 
    addToCart, 
    toggleCompareLaptop, 
    comparedLaptops 
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  if (!selectedLaptopForModal) return null;

  const laptop = selectedLaptopForModal;
  const isCompared = comparedLaptops.some((l) => l.id === laptop.id);

  const handleAddToCart = () => {
    addToCart(laptop, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200 text-gray-900">
        
        {/* Header: Solid Black */}
        <div className="p-4 sm:p-6 bg-black text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-wider text-blue-400 bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-800">
              {laptop.brand}
            </span>
            <span className="text-xs text-gray-400 font-semibold">• {laptop.modelSeries}</span>
          </div>

          <button
            onClick={() => setSelectedLaptopForModal(null)}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Grid: Clean White & Ash */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 max-h-[80vh] overflow-y-auto bg-white">
          
          {/* Left Column: Image Stage on Ash surface */}
          <div className="md:col-span-5 flex flex-col items-center justify-center space-y-4">
            <div className="w-full h-64 sm:h-72 bg-gray-50 rounded-2xl p-4 flex items-center justify-center border border-gray-200 relative group">
              <img
                src={laptop.image}
                alt={laptop.name}
                className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform duration-300"
              />
              {laptop.badge && (
                <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white shadow">
                  {laptop.badge}
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="w-full flex items-center justify-between text-xs text-gray-600 px-1">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <Truck className="w-4 h-4 text-emerald-600" /> Ikot Udoma Express Delivery
              </span>
              <button
                onClick={() => toggleCompareLaptop(laptop)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isCompared
                    ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>{isCompared ? 'Comparing' : 'Compare Specs'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Title, Specs & Add to Cart */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900 ml-1 text-sm">{laptop.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({laptop.reviewsCount} customer reviews)</span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {laptop.stockCount} Units In Stock
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
                {laptop.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                {laptop.tagline}
              </p>
            </div>

            {/* Pricing Section: Ash Box */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-baseline justify-between">
              <div>
                <span className="text-[11px] text-gray-500 block font-semibold">Retail Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-gray-900">
                    ${laptop.price.toLocaleString()}
                  </span>
                  {laptop.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ${laptop.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full font-bold border border-blue-200">
                Doorstep Handover Eligible
              </span>
            </div>

            {/* Technical Specifications Matrix */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Full Technical Specifications:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-start gap-2">
                  <Cpu className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block font-semibold">Processor</span>
                    <span className="text-gray-900 font-medium">{laptop.specs.processor}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-start gap-2">
                  <Layers className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block font-semibold">Memory (RAM)</span>
                    <span className="text-gray-900 font-medium">{laptop.specs.ram}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-start gap-2">
                  <HardDrive className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block font-semibold">Solid State Storage</span>
                    <span className="text-gray-900 font-medium">{laptop.specs.storage}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-start gap-2">
                  <Monitor className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block font-semibold">Display Panel</span>
                    <span className="text-gray-900 font-medium">{laptop.specs.display}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-start gap-2">
                  <BatteryCharging className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block font-semibold">Battery & Endurance</span>
                    <span className="text-gray-900 font-medium">{laptop.specs.battery}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-start gap-2">
                  <Scale className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-gray-500 block font-semibold">Weight & Chassis</span>
                    <span className="text-gray-900 font-medium">{laptop.specs.weight}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Included Features */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                Key Hardware Features:
              </h4>
              <div className="space-y-1 text-xs text-gray-700">
                {laptop.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>
                  Add {quantity} to Cart (${(laptop.price * quantity).toLocaleString()})
                </span>
              </button>
            </div>

            {/* Warranty Assurance */}
            <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                Backed by <strong>2-Year HubShield™</strong> full motherboard & display hardware warranty
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
