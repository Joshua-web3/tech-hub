import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Package, 
  Truck, 
  MapPin, 
  Phone, 
  Calendar, 
  Search, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  ShoppingBag
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, setCurrentView } = useCart();
  const [filterQuery, setFilterQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.trackingNumber.toLowerCase().includes(q) ||
      o.deliveryDetails.fullName.toLowerCase().includes(q) ||
      o.items.some((i) => i.laptop.name.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
              <Package className="w-7 h-7 text-blue-600" />
              <span>Customer Orders & Doorstep Delivery Tracking</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Live status, courier tracking, and warranty verification for your laptops in Ikot Udoma
            </p>
          </div>

          <button
            onClick={() => setCurrentView('shop')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
          >
            <span>Shop New Laptops</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar for Orders: White input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by Order ID (e.g. LH-92841), tracking #, or laptop model..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No Matching Orders Found</h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
              You haven't placed an order matching that query yet, or your cart hasn't been checked out.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6 overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-gray-900 font-mono">
                        {order.id}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" /> Placed on {order.date} • Tracking:{' '}
                      <span className="font-mono text-gray-700">{order.trackingNumber}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-500 block font-semibold">Total Paid</span>
                    <span className="text-xl font-black text-blue-600">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* 4-Step Visual Tracker Bar: Ash box */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-bold text-gray-800 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      Status: {order.status}
                    </span>
                    <span className="text-xs text-gray-600">
                      Estimated Delivery:{' '}
                      <strong className="text-emerald-700">{order.estimatedDelivery}</strong>
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs">
                    <div className="space-y-1">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto shadow-xs">
                        ✓
                      </div>
                      <span className="font-bold text-gray-900 block">Confirmed</span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`w-7 h-7 rounded-full font-bold flex items-center justify-center mx-auto ${
                          order.status !== 'Processing'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 text-white animate-pulse'
                        }`}
                      >
                        {order.status !== 'Processing' ? '✓' : '2'}
                      </div>
                      <span
                        className={`font-bold block ${
                          order.status === 'Processing' ? 'text-blue-600' : 'text-gray-900'
                        }`}
                      >
                        Benchmarked
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`w-7 h-7 rounded-full font-bold flex items-center justify-center mx-auto ${
                          order.status === 'In Transit' || order.status === 'Delivered'
                            ? 'bg-blue-600 text-white animate-pulse'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {order.status === 'Delivered' ? '✓' : '3'}
                      </div>
                      <span
                        className={`font-bold block ${
                          order.status === 'In Transit' ? 'text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        In Transit
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`w-7 h-7 rounded-full font-bold flex items-center justify-center mx-auto ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        4
                      </div>
                      <span
                        className={`font-bold block ${
                          order.status === 'Delivered' ? 'text-emerald-700' : 'text-gray-500'
                        }`}
                      >
                        Doorstep Delivery
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items & Recipient Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Items */}
                  <div className="md:col-span-7 space-y-3">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Ordered Laptops ({order.items.length})
                    </h4>
                    <div className="divide-y divide-gray-100">
                      {order.items.map((item) => (
                        <div key={item.laptop.id} className="py-2.5 flex items-center gap-3">
                          <img
                            src={item.laptop.image}
                            alt={item.laptop.name}
                            className="w-14 h-12 object-contain rounded bg-gray-50 border border-gray-200 p-1"
                          />
                          <div className="flex-1 min-w-0 text-xs">
                            <p className="font-bold text-gray-900 truncate">{item.laptop.name}</p>
                            <p className="text-[11px] text-gray-500 truncate">
                              {item.laptop.specs.processor}
                            </p>
                            <span className="text-blue-600 font-bold text-[11px]">
                              Qty: {item.quantity} × ${item.laptop.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer Delivery Details in Ikot Udoma */}
                  <div className="md:col-span-5 bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                    <h4 className="font-bold text-gray-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> Destination Home Address
                    </h4>
                    <p className="font-black text-gray-900 text-sm">
                      {order.deliveryDetails.fullName}
                    </p>
                    <p className="text-gray-700">{order.deliveryDetails.streetAddress}</p>
                    {order.deliveryDetails.apartment && (
                      <p className="text-gray-500">{order.deliveryDetails.apartment}</p>
                    )}
                    <p className="text-gray-700 font-medium">
                      {order.deliveryDetails.city}, {order.deliveryDetails.state}{' '}
                      {order.deliveryDetails.postalCode}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1 pt-1 font-semibold">
                      <Phone className="w-3 h-3 text-emerald-600" />
                      {order.deliveryDetails.phoneNumber}
                    </p>

                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> HubShield Active
                      </span>
                      <button
                        onClick={() => window.print()}
                        className="text-[11px] text-blue-600 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Printer className="w-3 h-3" /> Print Invoice
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
