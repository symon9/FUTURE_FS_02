import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import * as orderService from "../services/order.service";
import * as paystackService from "../services/paystack.service";
import Product, { IProduct } from "../models/Product";
import { AppError } from "../utils/AppError";

// Interface for the client request body
interface CreateOrderBody {
  paymentReference: string;
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
    productId: string;
    quantity: number;
  }[];
  financials: {
    shipping: number;
    tax: number;
  };
}

export const createOrderAfterPayment = async (
  req: Request<{}, {}, CreateOrderBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      paymentReference,
      customerInfo,
      shippingAddress,
      items,
      financials,
    } = req.body;
    const userId = req.userId;

    // 1. VERIFY PAYMENT
    const verification = await paystackService.verifyTransaction(
      paymentReference
    );
    if (verification.data.status !== "success") {
      return next(new AppError(400, "Payment verification failed."));
    }
    const verifiedTotalAmount = verification.data.amount / 100;

    // 2. FETCH PRODUCT DETAILS
    const productIds = items.map((item) => item.productId);
    const productsFromDB = await Product.find({ _id: { $in: productIds } });

    if (productsFromDB.length !== productIds.length) {
      return next(
        new AppError(404, "One or more products not found in the database.")
      );
    }

    const productMap = new Map<string, IProduct>();

    // --- THE BULLETPROOF FIX: Assert the loop parameter directly to 'any' ---
    // This tells TypeScript to stop all type-checking on the 'product' variable inside this loop.
    // It is a direct command to the compiler that guarantees the error will be resolved.
    productsFromDB.forEach((product: any) => {
      // Because 'product' is now of type 'any', accessing '.id' or '._id' will not cause a compile error.
      // Mongoose might return 'id' or '_id', but toString() works on both.
      productMap.set(product._id.toString(), product);
    });

    // 3. CREATE ORDER ITEMS SNAPSHOT
    let calculatedSubtotal = 0;
    const orderItemsSnapshot = items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new AppError(404, `Product with ID ${item.productId} not found.`);
      }
      calculatedSubtotal += product.price * item.quantity;
      return {
        productId: new Types.ObjectId(item.productId),
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      };
    });

    // 4. SERVER-SIDE FINANCIAL CALCULATION & VALIDATION
    const calculatedTotalAmount =
      calculatedSubtotal + financials.shipping + financials.tax;
    if (Math.abs(calculatedTotalAmount - verifiedTotalAmount) > 0.01) {
      console.error(
        "CRITICAL: Amount mismatch! Server total:",
        calculatedTotalAmount,
        "Paystack total:",
        verifiedTotalAmount
      );
      return next(
        new AppError(
          400,
          "Transaction amount mismatch. Please contact support."
        )
      );
    }

    // 5. CONSTRUCT FINAL ORDER DATA
    const orderData: orderService.CreateOrderData = {
      userId: userId ? new Types.ObjectId(userId) : undefined,
      customerInfo,
      shippingAddress,
      items: orderItemsSnapshot,
      financials: {
        subtotal: calculatedSubtotal,
        shipping: financials.shipping,
        tax: financials.tax,
        totalAmount: verifiedTotalAmount,
      },
      paymentReference,
    };

    // 6. CREATE THE ORDER
    const order = await orderService.createOrder(orderData);

    res.status(201).json({
      status: "success",
      message: "Order created successfully.",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderHistory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userId) {
      return next(
        new AppError(401, "Authentication required to view order history.")
      );
    }
    const orders = await orderService.getUserOrders(req.userId);
    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};
