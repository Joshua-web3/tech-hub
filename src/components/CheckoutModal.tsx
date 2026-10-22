import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { DeliveryDetails, PaymentDetails, PaymentMethodType } from '../types';
import { 
  X, 
  Truck, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Building, 
  Wallet, 
  DollarSign,
  Info
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    cart, 
    grandTotal, 
    createOrder,
    user
  } = useCart();

  // Form State initialized with user profile or defaults for Ikot Udoma
  const [delivery, setDelivery] = useState<DeliveryDetails>({
    fullName: user?.name || 'Jay Jhay',
    phoneNumber: user?.phone || '+234 907 6934 980',
    email: user?.email || 'jayjhay615@gmail.com',
    streetAddress: user?.address || 'Main Street, Ikot Udoma',
    apartment: '',
    city: 'Ikot Udoma',
    state: 'Akwa Ibom',
    postalCode: '530101',
    deliveryNotes: 'Direct doorstep delivery to Ikot Udoma'
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('credit_card');

  // Card payment details
  const [cardName, setCardName] = useState(user?.name || 'JAY JHAY');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutModalOpen) return null;

  // Format Card Number input with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  // Format Card Expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (raw.length >= 2) {
      raw = raw.substring(0, 2) + '/' + raw.substring(2);
    }
    setCardExpiry(raw);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!delivery.fullName.trim()) {
      setErrorMsg('Please enter your full name for delivery.');
      return;
    }
    if (!delivery.phoneNumber.trim()) {
      setErrorMsg('Please enter your contact phone number for the courier.');
      return;
    }
    if (!delivery.streetAddress.trim()) {
      setErrorMsg('Please enter your complete home/street delivery address.');
      return;
    }
    if (!delivery.city.trim() || !delivery.postalCode.trim()) {
      setErrorMsg('Please enter your city and postal code.');
      return;
    }

    // Payment validation if credit card
    if (paymentMethod === 'credit_card') {
      if (!cardName.trim()) {
        setErrorMsg('Please enter the name on your card.');
        return;
      }
      const rawCard = cardNumber.replace(/\s/g, '');
      if (rawCard.length < 15) {
        setErrorMsg('Please enter a valid 15 or 16-digit card number.');
        return;
      }
      if (cardExpiry.length < 5) {
        setErrorMsg('Please enter card expiration date (MM/YY).');
        return;
      }
      if (cardCvv.length < 3) {
        setErrorMsg('Please enter your card 3 or 4-digit CVV security code.');
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate payment authorization & packaging
    setTimeout(() => {
      const paymentData: PaymentDetails = {
        method: paymentMethod,
        cardName: paymentMethod === 'credit_card' ? cardName : undefined,
        cardNumber: paymentMethod === 'credit_card' ? `•••• •••• •••• ${cardNumber.slice(-4)}` : undefined,
        cardExpiry: paymentMethod === 'credit_card' ? cardExpiry : undefined,
        bankReference: paymentMethod === 'bank_transfer' ? 'LH-WIRE-' + Math.floor(100000 + Math.random() * 900000) : undefined
      };

      createOrder(delivery, paymentData);
      setIsSubmitting(false);
    }, 1200);
  };

  // Quick fill user info
  const fillSampleAddress = () => {
    setDelivery({
      fullName: 'Jay Jhay',
      phoneNumber: '+234 907 6934 980',
      email: 'jayjhay615@gmail.com',
      streetAddress: 'Main Street, Ikot Udoma',
      apartment: 'Suite 1',
      city: 'Ikot Udoma',
      state: 'Akwa Ibom',
      postalCode: '530101',
      deliveryNotes: 'Direct doorstep delivery to Ikot Udoma'
    });
    setCardName('JAY JHAY');
    setCardNumber('4242 5819 8210 9401');
    setCardExpiry('09/28');
    setCardCvv('892');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header: Classic Black & Blue Accent */}
        <div className="p-5 sm:p-6 bg-black text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Delivery Details & Secure Payment
              </h2>
              <p className="text-xs text-gray-300">
                Destination: <span className="text-blue-400 font-semibold">Ikot Udoma</span> • Direct Courier Handover
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fillSampleAddress}
              className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer hidden sm:block"
            >
              Autofill My Details
            </button>
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Body: Clean White with Ash & Blue accents */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 space-y-8 max-h-[80vh] overflow-y-auto bg-white text-gray-900">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <Info className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section 1: Customer & Delivery Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                1. Customer Delivery Details
              </h3>
              <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                Doorstep Courier Delivery
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Recipient Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jay Jhay"
                    value={delivery.fullName}
                    onChange={(e) => setDelivery({ ...delivery, fullName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Contact Phone Number * (Courier contact)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="+234 907 6934 980"
                    value={delivery.phoneNumber}
                    onChange={(e) => setDelivery({ ...delivery, phoneNumber: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Email Address * (For order updates & receipt)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="jayjhay615@gmail.com"
                    value={delivery.email}
                    onChange={(e) => setDelivery({ ...delivery, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Apartment / Suite */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Apartment, Suite, Unit (optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Suite / House Number"
                    value={delivery.apartment || ''}
                    onChange={(e) => setDelivery({ ...delivery, apartment: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Street Address */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Home / Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street name, landmark, area in Ikot Udoma"
                  value={delivery.streetAddress}
                  onChange={(e) => setDelivery({ ...delivery, streetAddress: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              {/* City, State, Postal */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City / Town *</label>
                <input
                  type="text"
                  required
                  placeholder="Ikot Udoma"
                  value={delivery.city}
                  onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      placeholder="Akwa Ibom"
                      value={delivery.state}
                      onChange={(e) => setDelivery({ ...delivery, state: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Postal / ZIP *</label>
                    <input
                      type="text"
                      required
                      placeholder="530101"
                      value={delivery.postalCode}
                      onChange={(e) => setDelivery({ ...delivery, postalCode: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Delivery Instructions / Call-Before-Arrival Note (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call +234 907 6934 980 upon reaching Ikot Udoma landmark"
                  value={delivery.deliveryNotes || ''}
                  onChange={(e) => setDelivery({ ...delivery, deliveryNotes: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>

            </div>
          </div>

          {/* Section 2: Choose Payment Method */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                2. Choose Payment Method
              </h3>
              <span className="text-[11px] text-gray-500 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit SSL Encrypted
              </span>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Credit / Debit Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('credit_card')}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'credit_card'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-600 mb-2" />
                <div>
                  <span className="text-xs font-bold block">Credit / Debit Card</span>
                  <span className="text-[10px] text-gray-500">Mastercard, Visa, Verve</span>
                </div>
              </button>

              {/* Cash on Delivery (COD) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <DollarSign className="w-5 h-5 text-emerald-600 mb-2" />
                <div>
                  <span className="text-xs font-bold block">Pay on Delivery (COD)</span>
                  <span className="text-[10px] text-gray-500">Pay courier at Ikot Udoma</span>
                </div>
              </button>

              {/* PayPal */}
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'paypal'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Wallet className="w-5 h-5 text-amber-600 mb-2" />
                <div>
                  <span className="text-xs font-bold block">PayPal Instant</span>
                  <span className="text-[10px] text-gray-500">One-click connect</span>
                </div>
              </button>

              {/* Bank Transfer */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600'
                    : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Building className="w-5 h-5 text-purple-600 mb-2" />
                <div>
                  <span className="text-xs font-bold block">Bank Wire</span>
                  <span className="text-[10px] text-gray-500">Instant invoice transfer</span>
                </div>
              </button>

            </div>

            {/* Dynamic Payment Details Inputs */}
            {paymentMethod === 'credit_card' && (
              <div className="bg-gray-50 border border-gray-200 p-4 sm:p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span className="font-bold text-gray-800">Card Payment Details</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                    Secure 256-Bit SSL
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Cardholder Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="JAY JHAY"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      16-Digit Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="•••• •••• •••• ••••"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-3 py-2.5 text-gray-900 placeholder-gray-400 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      CVV / Security Code (3-4 digits)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-gray-900 placeholder-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Doorstep Payment at Ikot Udoma</span>
                </div>
                <p className="text-gray-700">
                  Inspect the sealed laptop package with our verified courier agent upon arrival in Ikot Udoma. You can pay using cash or instant card POS transfer.
                </p>
                <p className="text-[11px] text-gray-600">
                  Our dispatch rider will call you at <strong>{delivery.phoneNumber}</strong> prior to handover.
                </p>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs space-y-2 text-gray-700">
                <p>
                  A secure PayPal authorization prompt will verify your payment with Purchase Protection. Notifications will be sent to <strong>{delivery.email}</strong>.
                </p>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl text-xs space-y-2 text-gray-700">
                <p className="font-bold text-gray-900">Direct Electronic Bank Transfer:</p>
                <div className="p-3 bg-white border border-gray-200 rounded-xl space-y-1 font-mono text-[11px] text-gray-800">
                  <div>Bank: LAPTOP HUB Commercial Bank</div>
                  <div>Account Name: LAPTOP HUB TECH LTD</div>
                  <div>Account No: 0928-4491-019</div>
                  <div>Reference Note: Ikot Udoma Order</div>
                </div>
                <p className="text-[11px] text-gray-500">
                  Laptops are dispatched immediately upon receipt confirmation.
                </p>
              </div>
            )}

          </div>

          {/* Section 3: Order Summary Review */}
          <div className="bg-gray-50 p-4 sm:p-5 rounded-2xl border border-gray-200 space-y-3">
            <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Order Items ({cart.length} Models)
            </h4>

            <div className="divide-y divide-gray-200 max-h-36 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.laptop.id} className="py-2 flex items-center justify-between text-xs">
                  <div className="truncate mr-2">
                    <span className="font-bold text-gray-900">{item.quantity}x</span>{' '}
                    <span className="text-gray-700">{item.laptop.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">
                    ${(item.laptop.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-600 block">Total Due:</span>
                <span className="text-2xl font-black text-blue-600">
                  ${grandTotal.toLocaleString()}
                </span>
              </div>

              <div className="text-right text-[11px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                ✓ Includes 2-Year HubShield™ Warranty
              </div>
            </div>
          </div>

          {/* Action Buttons: Classic Black & Blue */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCheckoutModalOpen(false)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
            >
              Cancel & Edit Cart
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Confirming Order for Ikot Udoma...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>Confirm Order to Ikot Udoma (${grandTotal.toLocaleString()})</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
