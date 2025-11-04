import { Types } from "mongoose";
import Order, { IOrder } from "../models/Order";

// --- (NEW) DEFINE THE PROFESSIONAL DTO ---
// This is the data contract between the controller and the service
export interface CreateOrderData {
  userId?: Types.ObjectId;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    productId: Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  financials: {
    subtotal: number;
    shipping: number;
    tax: number;
    totalAmount: number;
  };
  paymentReference: string;
}

export const createOrder = async (data: CreateOrderData): Promise<IOrder> => {
  const order = new Order({
    userId: data.userId,
    customerInfo: data.customerInfo,
    shippingAddress: data.shippingAddress,
    items: data.items,
    financials: data.financials,
    payment: {
      reference: data.paymentReference,
      status: "paid", // Status is confirmed by the controller
      method: "Paystack",
    },
    // Initialize the order with a 'pending' status
    statusHistory: [
      {
        status: "pending",
        timestamp: new Date(),
      },
    ],
  });
  await order.save();
  return order;
};

export const getUserOrders = async (userId: string): Promise<IOrder[]> => {
  // Sorting by -1 makes the newest orders appear first
  return Order.find({ userId }).sort({ createdAt: -1 });
};
