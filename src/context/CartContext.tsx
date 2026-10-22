import React, { createContext, useContext, useState, useEffect } from 'react';
import { Laptop, CartItem, DeliveryDetails, PaymentDetails, Order, UserProfile } from '../types';
import { LAPTOP_CATALOG } from '../data/laptops';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'error';
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (laptop: Laptop, quantity?: number) => void;
  removeFromCart: (laptopId: string) => void;
  updateQuantity: (laptopId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discountCode: string;
  discountAmount: number;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  shippingFee: number;
  taxAmount: number;
  grandTotal: number;

  // Navigation & Modals
  currentView: 'home' | 'shop' | 'cart' | 'about' | 'orders';
  setCurrentView: (view: 'home' | 'shop' | 'cart' | 'about' | 'orders') => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedLaptopForModal: Laptop | null;
  setSelectedLaptopForModal: (laptop: Laptop | null) => void;

  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (open: boolean) => void;
  comparedLaptops: Laptop[];
  toggleCompareLaptop: (laptop: Laptop) => void;

  // User Auth
  user: UserProfile | null;
  login: (email: string, name?: string) => void;
  logout: () => void;

  // Orders
  orders: Order[];
  createOrder: (delivery: DeliveryDetails, payment: PaymentDetails) => Order;
  lastCreatedOrder: Order | null;
  isOrderSuccessModalOpen: boolean;
  setIsOrderSuccessModalOpen: (open: boolean) => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('laptophub_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'cart' | 'about' | 'orders'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLaptopForModal, setSelectedLaptopForModal] = useState<Laptop | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [comparedLaptops, setComparedLaptops] = useState<Laptop[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // User
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('laptophub_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('laptophub_orders');
      if (saved) return JSON.parse(saved);
      // Sample initial order for rich UX
      return [
        {
          id: 'LH-92841',
          date: '2026-10-18',
          items: [
            {
              laptop: LAPTOP_CATALOG[0],
              quantity: 1
            }
          ],
          subtotal: 1399,
          shipping: 0,
          tax: 111.92,
          discount: 100,
          total: 1410.92,
          deliveryDetails: {
            fullName: 'Jay Jhay',
            phoneNumber: '+234 907 6934 980',
            email: 'jayjhay615@gmail.com',
            streetAddress: 'Main Street, Ikot Udoma',
            city: 'Ikot Udoma',
            state: 'Akwa Ibom',
            postalCode: '530101',
            deliveryNotes: 'Direct doorstep delivery to Ikot Udoma residence'
          },
          paymentDetails: {
            method: 'credit_card',
            cardName: 'Jay Jhay',
            cardNumber: '•••• •••• •••• 4242'
          },
          status: 'In Transit',
          estimatedDelivery: 'Oct 23, 2026',
          trackingNumber: 'LH-TRK-7749102'
        }
      ];
    } catch {
      return [];
    }
  });

  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);
  const [isOrderSuccessModalOpen, setIsOrderSuccessModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('laptophub_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('laptophub_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('laptophub_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('laptophub_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (laptop: Laptop, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.laptop.id === laptop.id);
      if (existing) {
        return prev.map((item) =>
          item.laptop.id === laptop.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { laptop, quantity }];
    });
    addToast(`Added to Cart!`, `${laptop.name} has been added.`, 'success');
  };

  const removeFromCart = (laptopId: string) => {
    const removedItem = cart.find((item) => item.laptop.id === laptopId);
    setCart((prev) => prev.filter((item) => item.laptop.id !== laptopId));
    if (removedItem) {
      addToast(`Item removed`, `${removedItem.laptop.name} removed from cart.`, 'info');
    }
  };

  const updateQuantity = (laptopId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(laptopId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.laptop.id === laptopId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.laptop.price * item.quantity,
    0
  );

  const applyDiscountCode = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'HUB10' || trimmed === 'LAPTOP10' || trimmed === 'WELCOME10') {
      setDiscountCode(trimmed);
      setDiscountPercent(10);
      addToast('Coupon Applied!', '10% discount has been applied to your order.', 'success');
      return true;
    } else if (trimmed === 'SAVE50') {
      setDiscountCode(trimmed);
      setDiscountPercent(0);
      addToast('Coupon Applied!', '$50 discount applied.', 'success');
      return true;
    } else {
      addToast('Invalid Coupon Code', 'Try using code HUB10 for 10% off.', 'error');
      return false;
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode('');
    setDiscountPercent(0);
    addToast('Coupon Removed', undefined, 'info');
  };

  const discountAmount =
    discountCode === 'SAVE50'
      ? Math.min(50, subtotal)
      : Math.round((subtotal * discountPercent) / 100);

  // Free shipping over $500, otherwise $25
  const shippingFee = subtotal > 500 || subtotal === 0 ? 0 : 25;

  // 8% tax
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.08 * 100) / 100;

  const grandTotal = Math.max(0, taxableAmount + shippingFee + taxAmount);

  const toggleCompareLaptop = (laptop: Laptop) => {
    setComparedLaptops((prev) => {
      const exists = prev.some((l) => l.id === laptop.id);
      if (exists) {
        return prev.filter((l) => l.id !== laptop.id);
      }
      if (prev.length >= 3) {
        addToast('Comparison limit reached', 'You can compare up to 3 laptops at a time.', 'info');
        return prev;
      }
      addToast('Added to Comparison', `${laptop.name} added to side-by-side spec comparison.`);
      return [...prev, laptop];
    });
  };

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 8),
      name: name || (email.split('@')[0].toUpperCase()),
      email,
      phone: '+234 907 6934 980',
      address: 'Main Street, Ikot Udoma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      memberSince: '2024'
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    addToast(`Welcome back, ${newUser.name}!`, 'You are now signed in to LAPTOP HUB.', 'success');
  };

  const logout = () => {
    setUser(null);
    addToast('Signed out', 'You have been signed out successfully.', 'info');
  };

  const createOrder = (delivery: DeliveryDetails, payment: PaymentDetails): Order => {
    const orderId = 'LH-' + Math.floor(10000 + Math.random() * 90000);
    const tracking = 'LH-TRK-' + Math.floor(1000000 + Math.random() * 9000000);

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const dateFormatted = deliveryDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      shipping: shippingFee,
      tax: taxAmount,
      discount: discountAmount,
      total: grandTotal,
      deliveryDetails: delivery,
      paymentDetails: payment,
      status: 'Processing',
      estimatedDelivery: dateFormatted,
      trackingNumber: tracking
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);
    setCart([]);
    setIsCheckoutModalOpen(false);
    setIsOrderSuccessModalOpen(true);
    addToast('Order Placed Successfully!', `Order ${orderId} has been confirmed.`, 'success');

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
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
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedLaptopForModal,
        setSelectedLaptopForModal,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isCompareModalOpen,
        setIsCompareModalOpen,
        comparedLaptops,
        toggleCompareLaptop,
        user,
        login,
        logout,
        orders,
        createOrder,
        lastCreatedOrder,
        isOrderSuccessModalOpen,
        setIsOrderSuccessModalOpen,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
