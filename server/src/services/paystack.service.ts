import axios from "axios";
import { PAYSTACK_SECRET_KEY } from "../config/env";

const paystackApi = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    "Content-Type": "application/json",
  },
});

interface InitializePaymentResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data: {
    status: "success" | "failed";
    reference: string;
    amount: number;
  };
}

export const initializeTransaction = async (email: string, amount: number) => {
  const response = await paystackApi.post<InitializePaymentResponse>(
    "/transaction/initialize",
    {
      email,
      amount: amount * 100, // Paystack amount is in kobo
    }
  );
  return response.data;
};

export const verifyTransaction = async (reference: string) => {
  const response = await paystackApi.get<VerifyPaymentResponse>(
    `/transaction/verify/${reference}`
  );
  return response.data;
};
