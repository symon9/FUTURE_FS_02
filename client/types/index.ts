// Each interface MUST have the 'export' keyword in front of it.

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Financials {
  subtotal: number;
  shipping: number;
  tax: number;
  totalAmount: number;
}

export interface Order {
  _id: string;
  customerInfo: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  financials: Financials;
  statusHistory: {
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    timestamp: string;
  }[];
  createdAt: string;
}
