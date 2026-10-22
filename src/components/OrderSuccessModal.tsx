import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  CheckCircle2, 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  Printer, 
  X, 
  ArrowRight, 
  ShieldCheck 
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { 
    isOrderSuccessModalOpen, 
    setIsOrderSuccessModalOpen, 
    lastCreatedOrder,
    setCurrentView 
  } = useCart();

  if (!isOrderSuccessModalOpen || !lastCreatedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden my-6 animate-in zoom-in-95 duration-200 text-gray-900">
        
        {/* Top Header: Black & Emerald Accent */}
        <div className="bg-black p-6 sm:p-8 text-white text-center relative">
          <button
            onClick={() => setIsOrderSuccessModalOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-3 shadow">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
            Order Confirmed & Benchmarking Initiated
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Thank You For Your Order!
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Order Reference: <strong className="text-blue-400 font-mono">{lastCreatedOrder.id}</strong> • Tracking #{' '}
            <span className="text-gray-400 font-mono">{lastCreatedOrder.trackingNumber}</span>
          </p>
        </div>

        {/* Modal Body: Clean White & Ash */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto bg-white">
          
          {/* Visual 4-Step Delivery Timeline */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600" /> Doorstep Delivery to Ikot Udoma
              </span>
              <span className="text-emerald-700 font-bold">
                Est. Arrival: {lastCreatedOrder.estimatedDelivery}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] sm:text-xs">
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mx-auto shadow-xs">
                  ✓
                </div>
                <span className="font-bold text-gray-900 block">Logged</span>
                <span className="text-gray-500 text-[10px]">Ready</span>
              </div>

              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto shadow-xs animate-pulse">
                  2
                </div>
                <span className="font-bold text-blue-600 block">72-Pt Test</span>
                <span className="text-gray-500 text-[10px]">In Lab</span>
              </div>

              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-bold flex items-center justify-center mx-auto">
                  3
                </div>
                <span className="text-gray-600 block">In Transit</span>
                <span className="text-gray-400 text-[10px]">Courier</span>
              </div>

              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 font-bold flex items-center justify-center mx-auto">
                  4
                </div>
                <span className="text-gray-600 block">Delivered</span>
                <span className="text-gray-400 text-[10px]">Ikot Udoma</span>
              </div>
            </div>
          </div>

          {/* Delivery & Recipient Details Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Recipient Details */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <h4 className="font-bold text-gray-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Delivery Address
              </h4>
              <p className="font-bold text-gray-900 text-sm">{lastCreatedOrder.deliveryDetails.fullName}</p>
              <p className="text-gray-700">{lastCreatedOrder.deliveryDetails.streetAddress}</p>
              {lastCreatedOrder.deliveryDetails.apartment && (
                <p className="text-gray-500">{lastCreatedOrder.deliveryDetails.apartment}</p>
              )}
              <p className="text-gray-700">
                {lastCreatedOrder.deliveryDetails.city}, {lastCreatedOrder.deliveryDetails.state}{' '}
                {lastCreatedOrder.deliveryDetails.postalCode}
              </p>
              <div className="pt-1 text-[11px] text-gray-600 space-y-0.5">
                <p className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  {lastCreatedOrder.deliveryDetails.phoneNumber}
                </p>
                <p className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-blue-600" />
                  {lastCreatedOrder.deliveryDetails.email}
                </p>
              </div>
            </div>

            {/* Payment & Warranty Info */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <h4 className="font-bold text-gray-600 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Payment & Protection
              </h4>
              <p className="text-gray-700">
                Method:{' '}
                <strong className="text-gray-900 uppercase">
                  {lastCreatedOrder.paymentDetails.method.replace('_', ' ')}
                </strong>
              </p>
              {lastCreatedOrder.paymentDetails.cardNumber && (
                <p className="text-gray-600 font-mono">
                  Card: {lastCreatedOrder.paymentDetails.cardNumber}
                </p>
              )}
              {lastCreatedOrder.paymentDetails.bankReference && (
                <p className="text-gray-600 font-mono">
                  Ref: {lastCreatedOrder.paymentDetails.bankReference}
                </p>
              )}

              <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-700 space-y-1">
                <p className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-3 h-3" /> 2-Year HubShield™ Serial Active
                </p>
                <p className="text-gray-500">
                  Electronic invoice dispatched to {lastCreatedOrder.deliveryDetails.email}
                </p>
              </div>
            </div>

          </div>

          {/* Purchased Items List */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3">
            <h4 className="font-bold text-gray-600 uppercase tracking-wider text-xs">
              Purchased Machines ({lastCreatedOrder.items.length})
            </h4>

            <div className="divide-y divide-gray-200">
              {lastCreatedOrder.items.map((item) => (
                <div key={item.laptop.id} className="py-2.5 flex items-center gap-3">
                  <img
                    src={item.laptop.image}
                    alt={item.laptop.name}
                    className="w-12 h-10 object-contain rounded bg-white border border-gray-200 p-1"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <p className="font-bold text-gray-900 truncate">{item.laptop.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {item.quantity} unit(s) • {item.laptop.specs.processor}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-extrabold text-blue-600">
                      ${(item.laptop.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-sm">
              <span className="font-bold text-gray-700">Total Paid:</span>
              <span className="text-xl font-black text-gray-900">
                ${lastCreatedOrder.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors border border-gray-300"
            >
              <Printer className="w-4 h-4" /> Print / Save Invoice
            </button>

            <button
              onClick={() => {
                setIsOrderSuccessModalOpen(false);
                setCurrentView('orders');
              }}
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>View in My Orders Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
