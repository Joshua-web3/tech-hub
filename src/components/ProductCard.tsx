import React from 'react';
import { Laptop } from '../types';
import { useCart } from '../context/CartContext';
import { 
  ShoppingCart, 
  Eye, 
  Star, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Layers, 
  Check, 
  SlidersHorizontal,
  Truck
} from 'lucide-react';

interface ProductCardProps {
  laptop: Laptop;
}

export const ProductCard: React.FC<ProductCardProps> = ({ laptop }) => {
  const { 
    addToCart, 
    cart, 
    setSelectedLaptopForModal, 
    toggleCompareLaptop, 
    comparedLaptops 
  } = useCart();

  const isAlreadyInCart = cart.some((item) => item.laptop.id === laptop.id);
  const isCompared = comparedLaptops.some((l) => l.id === laptop.id);

  // Classic Badge styling
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'New AI PC':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Best Seller':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Top Performance':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Sale':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Editor Choice':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col group relative">
      
      {/* Top Bar: Badge & Compare Trigger */}
      <div className="p-3.5 pb-0 flex items-center justify-between z-10">
        {laptop.badge ? (
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border shadow-xs ${getBadgeStyle(
              laptop.badge
            )}`}
          >
            {laptop.badge}
          </span>
        ) : (
          <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
            {laptop.category}
          </span>
        )}

        <button
          onClick={() => toggleCompareLaptop(laptop)}
          className={`text-[11px] px-2 py-0.5 rounded-lg border flex items-center gap-1 transition-colors cursor-pointer ${
            isCompared
              ? 'bg-blue-50 text-blue-700 border-blue-300 font-semibold'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
          }`}
          title="Compare specifications"
        >
          <SlidersHorizontal className="w-3 h-3 text-blue-600" />
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>
      </div>

      {/* Product Image Stage: Clean Ash surface */}
      <div 
        onClick={() => setSelectedLaptopForModal(laptop)}
        className="relative h-48 sm:h-52 p-4 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50/60 group/img"
      >
        <img
          src={laptop.image}
          alt={laptop.name}
          className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-108 transition-transform duration-300"
          loading="lazy"
        />

        {/* Hover Quick View Overlay Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedLaptopForModal(laptop);
          }}
          className="absolute bottom-2 bg-black text-white text-xs font-semibold py-1.5 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-1.5 hover:bg-blue-600 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick Specs</span>
        </button>
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 pt-3 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-extrabold text-gray-700 tracking-wider text-[11px] uppercase">
              {laptop.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-800">{laptop.rating}</span>
              <span className="text-[11px] text-gray-500">({laptop.reviewsCount})</span>
            </div>
          </div>

          {/* Model Name */}
          <h3 
            onClick={() => setSelectedLaptopForModal(laptop)}
            className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {laptop.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-1 mt-1 mb-3">
            {laptop.tagline}
          </p>

          {/* Key Specs Pills Grid: Clean Ash */}
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-200 mb-3.5">
            <div className="flex items-center gap-1.5 truncate">
              <Cpu className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span className="truncate">{laptop.specs.processor.split('(')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Layers className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span className="truncate">{laptop.specs.ram}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <HardDrive className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span className="truncate">{laptop.specs.storage}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <Monitor className="w-3 h-3 text-blue-600 flex-shrink-0" />
              <span className="truncate">{laptop.specs.display.split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* Pricing, Stock & Add to Cart Action */}
        <div>
          {/* Stock & Delivery signal */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-2">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              In Stock ({laptop.stockCount} left)
            </span>
            <span className="flex items-center gap-1 text-gray-600">
              <Truck className="w-3 h-3 text-blue-600" /> Ikot Udoma Delivery
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg sm:text-xl font-black text-gray-900">
                  ₦{laptop.price.toLocaleString()}
                </span>
                {laptop.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ₦{laptop.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-500">Direct Doorstep Delivery</p>
            </div>

            <button
              onClick={() => addToCart(laptop)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                isAlreadyInCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
              }`}
              title="Add laptop to cart"
            >
              {isAlreadyInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Buy</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
