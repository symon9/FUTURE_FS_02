import { Schema, model, Document, Types } from "mongoose";

// Interface for a snapshot of product details within an order
interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// Interface for shipping and billing address
interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Interface for the financial summary of the order
interface IFinancials {
  subtotal: number;
  shipping: number;
  tax: number;
  totalAmount: number; // The final amount charged
}

// Interface for payment details
interface IPayment {
  reference: string; // Paystack reference
  method: string;
  status: "paid" | "pending" | "failed";
}

// Interface for status history tracking
interface IStatusHistory {
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  timestamp: Date;
}

// Main Order Document Interface
export interface IOrder extends Document {
  userId?: Types.ObjectId; // Optional for guest checkouts
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  shippingAddress: IAddress;
  billingAddress?: IAddress; // Optional, can be same as shipping
  items: IOrderItem[];
  financials: IFinancials;
  payment: IPayment;
  statusHistory: IStatusHistory[];
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    billingAddress: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    items: [
      {
        _id: false, // Don't create separate IDs for items in the array
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    financials: {
      subtotal: { type: Number, required: true },
      shipping: { type: Number, required: true },
      tax: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
    payment: {
      reference: { type: String, required: true, unique: true },
      method: { type: String, required: true, default: "Paystack" },
      status: {
        type: String,
        required: true,
        enum: ["paid", "pending", "failed"],
        default: "paid",
      },
    },
    statusHistory: [
      {
        _id: false,
        status: {
          type: String,
          required: true,
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

export default model<IOrder>("Order", OrderSchema);
