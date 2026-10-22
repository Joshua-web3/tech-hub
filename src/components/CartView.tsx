import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Check, 
  Laptop as LaptopIcon, 
  Lock, 
  ArrowLeft,
  MapPin
} from 'lucide-react';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    discountCode,
    discountAmount,
    applyDiscountCode,
    removeDiscountCode,
    shippingFee,
    taxAmount,
    grandTotal,
    setCurrentView,
    setIsCheckoutModalOpen
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    applyDiscountCode(inputCoupon);
  };

  const freeShippingThreshold = 500;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-[70vh] text-gray-900 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900">Your Shopping Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              You haven’t added any laptops to your cart yet. Explore our curated catalog of AI laptops, Ultrabooks, and workstations ready for delivery.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LaptopIcon className="w-4 h-4" />
            <span>Browse Laptops & Prices</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-1.5 mb-2 cursor-pointer font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Shopping Catalog
            </button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Review Your Cart ({totalItems} {totalItems === 1 ? 'Laptop' : 'Laptops'})
            </h1>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-gray-500 hover:text-rose-600 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto font-semibold"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Cart
          </button>
        </div>

        {/* Free Shipping Progress Indicator: White Box */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-1.5 font-bold text-gray-800">
              <Truck className="w-4 h-4 text-blue-600" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-700 font-bold">
                  You’ve unlocked Free Doorstep Delivery to Ikot Udoma!
                </span>
              ) : (
                <span>
                  Add{' '}
                  <strong className="text-blue-600">
                    ₦{(freeShippingThreshold - subtotal).toLocaleString()}
                  </strong>{' '}
                  more for Free Delivery to Ikot Udoma!
                </span>
              )}
            </span>
            <span className="text-gray-500 font-bold">{Math.round(freeShippingProgress)}%</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Content Layout: Items on Left, Pricing Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.laptop.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 group"
              >
                {/* Laptop Thumbnail */}
                <div className="w-28 h-24 sm:w-36 sm:h-28 bg-gray-50 rounded-xl p-2 flex items-center justify-center flex-shrink-0 border border-gray-200">
                  <img
                    src={item.laptop.image}
                    alt={item.laptop.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 w-full space-y-2 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                        {item.laptop.brand} • {item.laptop.category}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 leading-snug">
                        {item.laptop.name}
                      </h3>
                    </div>
                    <div className="text-right sm:text-right mt-1 sm:mt-0">
                      <span className="text-lg font-black text-gray-900 block">
                        ₦{(item.laptop.price * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        ₦{item.laptop.price.toLocaleString()} each
                      </span>
                    </div>
                  </div>

                  {/* Core Specs summary */}
                  <p className="text-xs text-gray-500">
                    {item.laptop.specs.processor} | {item.laptop.specs.ram} | {item.laptop.specs.storage}
                  </p>

                  {/* Quantity & Remove Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.laptop.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.laptop.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.laptop.id)}
                      className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Suggestions / Add more items */}
            <div className="pt-2 text-center sm:text-left">
              <button
                onClick={() => setCurrentView('shop')}
                className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-bold cursor-pointer"
              >
                + Add another laptop model from catalog
              </button>
            </div>
          </div>

          {/* Right Column: Order Pricing Summary & Checkout Trigger */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6 sticky top-24">
              <h2 className="text-lg font-black text-gray-900 border-b border-gray-100 pb-3">
                Order Total & Summary
              </h2>

              {/* Price Accumulator Lines */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-bold text-gray-900">₦{subtotal.toLocaleString()}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span className="flex items-center gap-1 font-semibold">
                      <Tag className="w-3.5 h-3.5" /> Discount ({discountCode})
                    </span>
                    <span className="font-bold">-₦{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-blue-600" /> Doorstep Delivery
                  </span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase text-xs">FREE</span>
                    ) : (
                      <span className="font-bold text-gray-900">₦{shippingFee.toLocaleString()}</span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Estimated VAT (7.5%)</span>
                  <span className="font-bold text-gray-900">₦{taxAmount.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-black text-gray-900 block">Grand Total</span>
                    <span className="text-[10px] text-gray-500">Includes 2-Yr HubShield Warranty</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Promo Coupon Form */}
              <div className="pt-2 border-t border-gray-100">
                {discountCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
                    <span className="font-bold flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" /> Code {discountCode} Applied!
                    </span>
                    <button
                      onClick={removeDiscountCode}
                      className="text-xs text-rose-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <label className="text-xs text-gray-600 font-semibold block">
                      Promotional Discount Code:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. HUB10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 uppercase placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-black hover:bg-gray-800 text-xs font-bold text-white cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500">
                      Tip: Use coupon <code className="text-blue-600 font-bold">HUB10</code> for 10% off
                    </p>
                  </form>
                )}
              </div>

              {/* Checkout / Next Step Button */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Delivery & Payment</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Security & Warranty Trust Badges */}
              <div className="space-y-2 pt-2 border-t border-gray-100 text-[11px] text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Doorstep Delivery to <strong>Ikot Udoma</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-Bit SSL Encrypted & Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Free 2-Year Hardware HubShield Coverage</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
