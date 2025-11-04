import dotenv from "dotenv";
dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI as string;
export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY as string;
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const PORT = process.env.PORT || 5000;

if (!MONGODB_URI || !PAYSTACK_SECRET_KEY || !JWT_SECRET) {
  console.error("Error: Missing required environment variables.");
  process.exit(1);
}
