import { Request, Response, NextFunction } from "express";
import * as paystackService from "../services/paystack.service";
import { AppError } from "../utils/AppError";

export const initializePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, amount } = req.body;
    if (!email || !amount) {
      return next(new AppError(400, "Email and amount are required."));
    }

    const result = await paystackService.initializeTransaction(email, amount);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
