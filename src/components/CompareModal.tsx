import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  ShoppingCart, 
  Cpu, 
  Layers, 
  HardDrive, 
  Monitor, 
  BatteryCharging, 
  Scale, 
  Plus, 
  SlidersHorizontal 
} from 'lucide-react';

export const CompareModal: React.FC = () => {
  const { 
    isCompareModalOpen, 
    setIsCompareModalOpen, 
    comparedLaptops, 
    toggleCompareLaptop,
    addToCart,
    setCurrentView 
  } = useCart();

  if (!isCompareModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden my-6 text-gray-900">
        
        {/* Header: Solid Black */}
        <div className="p-5 sm:p-6 bg-black text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Hardware Side-by-Side Comparison
              </h2>
              <p className="text-xs text-gray-300">
                Compare processors, displays, memory bandwidth, and thermal footprints
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(false)}
            className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comparison Content */}
        <div className="p-6 overflow-x-auto max-h-[75vh] bg-white">
          {comparedLaptops.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <p className="text-sm text-gray-500">
                You haven't selected any laptops for comparison yet. Click "Compare" on any laptop card.
              </p>
              <button
                onClick={() => {
                  setIsCompareModalOpen(false);
                  setCurrentView('shop');
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-sm"
              >
                Browse Laptops to Compare
              </button>
            </div>
          ) : (
            <div className="min-w-[650px] space-y-6">
              
              {/* Top Row: Laptop Cards on Ash background */}
              <div className="grid grid-cols-4 gap-4 items-start">
                <div className="p-3 text-xs font-bold text-gray-500 uppercase tracking-wider self-end">
                  Laptop Model
                </div>

                {comparedLaptops.map((laptop) => (
                  <div
                    key={laptop.id}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center space-y-3 relative group"
                  >
                    <button
                      onClick={() => toggleCompareLaptop(laptop)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-200 hover:bg-rose-600 hover:text-white text-gray-600 flex items-center justify-center text-xs transition-colors cursor-pointer"
                      title="Remove from comparison"
                    >
                      ✕
                    </button>

                    <div className="h-28 flex items-center justify-center">
                      <img
                        src={laptop.image}
                        alt={laptop.name}
                        className="max-h-full max-w-full object-contain filter drop-shadow"
                      />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 block">
                        {laptop.brand}
                      </span>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 h-8">
                        {laptop.name}
                      </h4>
                    </div>

                    <div className="text-base font-black text-gray-900">
                      ₦{laptop.price.toLocaleString()}
                    </div>

                    <button
                      onClick={() => addToCart(laptop)}
                      className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                ))}

                {/* Empty slot placeholder if < 3 */}
                {comparedLaptops.length < 3 && (
                  <div
                    onClick={() => {
                      setIsCompareModalOpen(false);
                      setCurrentView('shop');
                    }}
                    className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-2 h-full min-h-[220px] cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-8 h-8 text-gray-400" />
                    <span className="text-xs font-bold text-gray-600">
                      Add Another Laptop
                    </span>
                  </div>
                )}
              </div>

              {/* Specs Rows */}
              <div className="space-y-3 divide-y divide-gray-100 text-xs">
                
                {/* Processor */}
                <div className="grid grid-cols-4 gap-4 pt-3 items-center">
                  <div className="font-bold text-gray-600 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-blue-600" /> Processor (CPU)
                  </div>
                  {comparedLaptops.map((l) => (
                    <div key={l.id} className="text-gray-900 font-semibold p-1">
                      {l.specs.processor}
                    </div>
                  ))}
                </div>

                {/* RAM */}
                <div className="grid grid-cols-4 gap-4 pt-3 items-center">
                  <div className="font-bold text-gray-600 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" /> Memory (RAM)
                  </div>
                  {comparedLaptops.map((l) => (
                    <div key={l.id} className="text-gray-900 font-semibold p-1">
                      {l.specs.ram}
                    </div>
                  ))}
                </div>

                {/* Storage */}
                <div className="grid grid-cols-4 gap-4 pt-3 items-center">
                  <div className="font-bold text-gray-600 flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-blue-600" /> Storage SSD
                  </div>
                  {comparedLaptops.map((l) => (
                    <div key={l.id} className="text-gray-900 font-semibold p-1">
                      {l.specs.storage}
                    </div>
                  ))}
                </div>

                {/* Display */}
                <div className="grid grid-cols-4 gap-4 pt-3 items-center">
                  <div className="font-bold text-gray-600 flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-blue-600" /> Display & Resolution
                  </div>
                  {comparedLaptops.map((l) => (
                    <div key={l.id} className="text-gray-900 font-semibold p-1">
                      {l.specs.display}
                    </div>
                  ))}
                </div>

                {/* Battery */}
                <div className="grid grid-cols-4 gap-4 pt-3 items-center">
                  <div className="font-bold text-gray-600 flex items-center gap-1.5">
                    <BatteryCharging className="w-3.5 h-3.5 text-blue-600" /> Battery Life
                  </div>
                  {comparedLaptops.map((l) => (
                    <div key={l.id} className="text-gray-900 font-semibold p-1">
                      {l.specs.battery}
                    </div>
                  ))}
                </div>

                {/* Weight */}
                <div className="grid grid-cols-4 gap-4 pt-3 items-center">
                  <div className="font-bold text-gray-600 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-blue-600" /> Chassis Weight
                  </div>
                  {comparedLaptops.map((l) => (
                    <div key={l.id} className="text-gray-900 font-semibold p-1">
                      {l.specs.weight}
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
