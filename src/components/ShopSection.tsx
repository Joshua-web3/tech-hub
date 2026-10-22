import React, { useState, useMemo } from 'react';
import { LAPTOP_CATALOG, CATEGORIES, BRANDS } from '../data/laptops';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Laptop as LaptopIcon, 
  ShoppingCart,
  MapPin
} from 'lucide-react';

export const ShopSection: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setCurrentView,
    totalItems,
    subtotal
  } = useCart();

  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(4000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filtered & Sorted laptops
  const filteredLaptops = useMemo(() => {
    return LAPTOP_CATALOG.filter((laptop) => {
      // Category filter
      if (selectedCategory !== 'all' && laptop.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All' && laptop.brand !== selectedBrand) {
        return false;
      }
      // Max price
      if (laptop.price > maxPrice) {
        return false;
      }
      // In stock only
      if (inStockOnly && !laptop.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = laptop.name.toLowerCase().includes(query);
        const matchesBrand = laptop.brand.toLowerCase().includes(query);
        const matchesCategory = laptop.category.toLowerCase().includes(query);
        const matchesProcessor = laptop.specs.processor.toLowerCase().includes(query);
        const matchesTagline = laptop.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory && !matchesProcessor && !matchesTagline) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedBrand, maxPrice, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('All');
    setMaxPrice(4000);
    setInStockOnly(false);
    setSearchQuery('');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBrand !== 'All' ||
    maxPrice < 4000 ||
    inStockOnly ||
    searchQuery.trim() !== '';

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Title & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <button 
                onClick={() => setCurrentView('home')} 
                className="hover:text-blue-600 transition-colors"
              >
                Home
              </button>
              <span>/</span>
              <span className="text-blue-600 font-bold">Shopping Catalog</span>
              <span>/</span>
              <span className="text-gray-600 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600" /> Ikot Udoma Delivery
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Explore All Laptops & Workstations
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Select your machine, review prices and technical specs, and arrange doorstep delivery
            </p>
          </div>

          {/* Quick Cart Summary Trigger on Shop page */}
          {totalItems > 0 && (
            <div className="flex items-center gap-3 bg-white border border-gray-200 p-3 rounded-2xl shadow-sm">
              <div>
                <span className="text-[11px] text-gray-500 block font-semibold">Cart Accumulated:</span>
                <span className="text-base font-black text-blue-600">
                  ${subtotal.toLocaleString()} ({totalItems} items)
                </span>
              </div>
              <button
                onClick={() => setCurrentView('cart')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>View Cart & Checkout</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter Bar Controls: Clean White Box with Ash borders */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
          
          {/* Category Chips Bar */}
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
              Category:
            </span>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              ))}
            </div>
          </div>

          {/* Brand, Price & Sort Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            
            {/* Brand Filter */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                Brand:
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                {BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b === 'All' ? 'All Brands' : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                <span>Max Price:</span>
                <span className="text-blue-600 font-black">${maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="4000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>$1,000</span>
                <span>$2,500</span>
                <span>$4,000</span>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                Sort By:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>

            {/* In Stock & Reset */}
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer pb-2.5 select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded bg-gray-100 border-gray-300 text-blue-600 focus:ring-blue-600 w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="px-3 py-2 text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer pb-2.5 ml-auto font-bold"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Results Counter & Search Indicator */}
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <div>
            Showing <strong className="text-gray-900">{filteredLaptops.length}</strong> of{' '}
            {LAPTOP_CATALOG.length} laptops
            {searchQuery && (
              <span> matching "<strong className="text-blue-600">{searchQuery}</strong>"</span>
            )}
          </div>
          {filteredLaptops.length === 0 && (
            <button
              onClick={resetFilters}
              className="text-blue-600 hover:underline cursor-pointer font-bold"
            >
              Clear all filters to view catalog
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredLaptops.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {filteredLaptops.map((laptop) => (
              <ProductCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <LaptopIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Laptops Match Your Filters</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              Try adjusting your price range, clearing the brand selector, or clearing the search query.
            </p>
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
