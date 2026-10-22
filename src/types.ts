export interface Laptop {
  id: string;
  name: string;
  brand: 'Apple' | 'HP' | 'Lenovo' | 'Dell' | 'ASUS' | 'Microsoft' | 'Razer';
  modelSeries: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: 'Ultrabook' | 'Gaming' | 'Business' | 'Creator' | '2-in-1 Touch';
  badge?: 'Best Seller' | 'New AI PC' | 'Editor Choice' | 'Top Performance' | 'Sale';
  specs: {
    processor: string;
    ram: string;
    storage: string;
    display: string;
    gpu: string;
    battery: string;
    weight: string;
    ports: string;
  };
  features: string[];
  inStock: boolean;
  stockCount: number;
}

export interface CartItem {
  laptop: Laptop;
  quantity: number;
  selectedColor?: string;
  warrantyUpgrade?: boolean;
}

export interface DeliveryDetails {
  fullName: string;
  phoneNumber: string;
  email: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryNotes?: string;
}

export type PaymentMethodType = 'credit_card' | 'cod' | 'paypal' | 'bank_transfer';

export interface PaymentDetails {
  method: PaymentMethodType;
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  bankReference?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  deliveryDetails: DeliveryDetails;
  paymentDetails: PaymentDetails;
  status: 'Processing' | 'Packed' | 'In Transit' | 'Delivered';
  estimatedDelivery: string;
  trackingNumber: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  memberSince: string;
}
