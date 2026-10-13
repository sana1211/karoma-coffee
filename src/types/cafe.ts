export type MenuCategory = 
  | 'all'
  | 'espresso'
  | 'pourover'
  | 'specialty'
  | 'tea'
  | 'bakery';

export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'pourover' | 'specialty' | 'tea' | 'bakery';
  price: number;
  description: string;
  flavorNotes: string[];
  roastLevel?: 'Light' | 'Medium' | 'Dark';
  origin?: string;
  caffeine: 'High' | 'Medium' | 'Low' | 'Decaf' | 'None';
  dietary: ('Vegan' | 'Vegetarian' | 'Dairy-Free' | 'Gluten-Free' | 'Organic')[];
  isPopular?: boolean;
  isSeasonal?: boolean;
  calories?: number;
  imageUrl?: string;
  imageFallbackGradient: string;
}

export interface CoffeeCustomization {
  size: '8oz' | '12oz' | '16oz';
  roast: 'House Velvet Blend' | 'Single-Origin Ethiopian Light' | 'Dark Sumatra Reserve' | 'Swiss Water Decaf';
  milk: 'Whole Milk' | 'Oatly Barista' | 'Almond Milk' | 'Pistachio Milk' | 'No Milk / Black';
  temperature: 'Hot' | 'Iced';
  sweetness: 'Unsweetened (0%)' | 'Light (25%)' | 'Balanced (50%)' | 'Sweet (100%)';
  extraShots: number;
  syrups: string[];
  pastryWarmed?: boolean;
  specialInstructions?: string;
}

export interface CartItem {
  cartId: string;
  item: MenuItem;
  customization: CoffeeCustomization;
  quantity: number;
  unitPrice: number;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  paymentMethod: 'apple_pay' | 'card' | 'counter';
  status: 'received' | 'brewing' | 'ready' | 'completed';
  createdAt: string;
  estimatedMinutes: number;
}

export interface OpeningHoursDay {
  day: string;
  open: string;
  close: string;
  isOpenToday: boolean;
  specialNote?: string;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  favoriteDrink: string;
  date: string;
}
