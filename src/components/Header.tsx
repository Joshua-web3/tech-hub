import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { LAPTOP_CATALOG } from '../data/laptops';
import { 
  Laptop as LaptopIcon, 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  SlidersHorizontal, 
  ShieldCheck, 
  Truck, 
  Package, 
  LogOut,
  ChevronRight,
  ExternalLink,
  Phone
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    cart,
    totalItems,
    subtotal,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    setSelectedLaptopForModal,
    setIsAuthModalOpen,
    setIsCompareModalOpen,
    comparedLaptops,
    user,
    logout
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery.trim()
    ? LAPTOP_CATALOG.filter(
        (l) =>
          l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.specs.processor.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-white shadow-lg">
      {/* Top Banner Bar: Black & Ash with Blue Accent */}
      <div className="bg-black text-gray-300 text-xs py-1.5 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Truck className="w-3.5 h-3.5" /> Doorstep Delivery to Ikot Udoma & Nationwide
            </span>
            <span className="hidden md:inline-block text-gray-700">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 2-Year HubShield™ Hardware Warranty
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-gray-400">
            <a href="tel:+2349076934980" className="hover:text-white transition-colors flex items-center gap-1 text-gray-300 font-semibold">
              <Phone className="w-3 h-3 text-blue-400" /> +234 907 6934 980
            </a>
            <span>•</span>
            <button
              onClick={() => setCurrentView('orders')}
              className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Package className="w-3 h-3" /> Track My Order
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center shadow-md shadow-blue-900/40 border border-blue-500/30 group-hover:scale-105 transition-transform duration-200">
              <LaptopIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  LAPTOP
                </span>
                <span className="text-lg sm:text-xl font-black tracking-wider text-blue-500">
                  HUB
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold -mt-1 hidden sm:block">
                Professional Systems & Workstations
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setCurrentView('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'home'
                  ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentView('shop')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'shop'
                  ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Shop Laptops
            </button>

            <button
              onClick={() => setCurrentView('about')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'about'
                  ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About Me
            </button>

            <button
              onClick={() => setCurrentView('orders')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                currentView === 'orders'
                  ? 'bg-blue-600/20 text-blue-400 font-semibold border border-blue-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Orders & Tracking
            </button>

            {comparedLaptops.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Compare ({comparedLaptops.length})
              </button>
            )}
          </nav>

          {/* Search Bar with Live Autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-xs sm:max-w-sm hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search MacBook, ThinkPad, OLED..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="w-full bg-slate-800/90 border border-slate-700/80 rounded-full pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Autocomplete Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Matching Laptops ({searchResults.length})
                </div>
                <div className="divide-y divide-slate-800/60">
                  {searchResults.map((laptop) => (
                    <div
                      key={laptop.id}
                      onClick={() => {
                        setSelectedLaptopForModal(laptop);
                        setSearchFocused(false);
                      }}
                      className="p-3 hover:bg-slate-800/80 cursor-pointer flex items-center gap-3 transition-colors"
                    >
                      <img
                        src={laptop.image}
                        alt={laptop.name}
                        className="w-12 h-10 object-contain rounded bg-slate-800 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white truncate">
                          {laptop.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate">
                          {laptop.specs.processor}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-blue-400">
                          ${laptop.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-2 bg-slate-950 text-center">
                  <button
                    onClick={() => {
                      setCurrentView('shop');
                      setSearchFocused(false);
                    }}
                    className="text-xs text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    View all results in Shop <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Cart & User Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Cart Trigger */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-2.5 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-white transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-sm"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5 text-blue-400" />
              <span className="hidden md:inline-block text-xs font-semibold">
                ${subtotal.toLocaleString()}
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-slate-900 animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account / Sign In */}
            {user ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-blue-400/40">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:inline-block text-xs font-semibold text-slate-200 truncate max-w-[100px]">
                    {user.name}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setCurrentView('orders');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5 text-blue-400" />
                      My Orders & Shipments
                    </button>

                    <button
                      onClick={() => {
                        setCurrentView('shop');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <LaptopIcon className="w-3.5 h-3.5 text-blue-400" />
                      Browse Catalog
                    </button>

                    <div className="border-t border-slate-800 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/20 border border-blue-400/30 transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Bar */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search laptops, specs, models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentView === 'home'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Home Showcase</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => {
                setCurrentView('shop');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentView === 'shop'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Shop All Laptops</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => {
                setCurrentView('about');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentView === 'about'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>About Me & Experience</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => {
                setCurrentView('orders');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentView === 'orders'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>My Orders & Delivery Tracking</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => {
                setCurrentView('cart');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between ${
                currentView === 'cart'
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>Shopping Cart ({totalItems})</span>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-blue-400 font-bold">
                ${subtotal.toLocaleString()}
              </span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800">
            {user ? (
              <div className="p-3 bg-slate-800/60 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Signed in as</p>
                  <p className="text-sm font-bold text-white">{user.name}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-rose-400 hover:underline"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" /> Sign In / Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
