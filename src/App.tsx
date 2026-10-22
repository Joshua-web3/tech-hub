/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryRail } from './components/CategoryRail';
import { MustHavesSection } from './components/MustHavesSection';
import { AboutMeSection } from './components/AboutMeSection';
import { SupportBar } from './components/SupportBar';
import { ShopSection } from './components/ShopSection';
import { CartView } from './components/CartView';
import { OrdersView } from './components/OrdersView';
import { ProductModal } from './components/ProductModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { CompareModal } from './components/CompareModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ShoppingCart, ArrowRight } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, setCurrentView, totalItems, subtotal } = useCart();

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroBanner />
            <CategoryRail />
            <MustHavesSection />
            <AboutMeSection />
            <SupportBar />
          </>
        )}

        {currentView === 'shop' && <ShopSection />}

        {currentView === 'cart' && <CartView />}

        {currentView === 'about' && (
          <>
            <AboutMeSection />
            <SupportBar />
          </>
        )}

        {currentView === 'orders' && <OrdersView />}
      </main>

      {/* Mobile Sticky Quick Cart Floating Bar */}
      {totalItems > 0 && currentView !== 'cart' && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-30">
          <button
            onClick={() => setCurrentView('cart')}
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-98 text-white p-3.5 rounded-2xl shadow-2xl flex items-center justify-between font-bold border border-blue-400/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-2 bg-white text-blue-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span className="text-xs">
                {totalItems} {totalItems === 1 ? 'Laptop' : 'Laptops'} in Cart
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-black">₦{subtotal.toLocaleString()}</span>
              <span className="text-xs bg-blue-700/80 px-2 py-1 rounded-lg flex items-center gap-1">
                Checkout <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Modals & Dialogs */}
      <ProductModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <AuthModal />
      <CompareModal />

      {/* Global Interactive Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
