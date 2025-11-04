import mongoose from "mongoose";
import dotenv from "dotenv";
import Product, { IProduct } from "./models/Product";
import { MONGODB_URI } from "./config/env";

// Load environment variables
dotenv.config();

// Define the seed data without Mongoose Document properties
const products: Omit<IProduct, keyof mongoose.Document>[] = [
  {
    name: "Modern Wireless Headphones",
    price: 150.0,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    description:
      "High-fidelity wireless headphones with noise-cancellation and a 20-hour battery life.",
  },
  {
    name: "Classic Leather Wallet",
    price: 75.5,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1752184791407-b59e505e5dca?q=80&w=1974&auto=format&fit=crop",
    description:
      "A sleek and durable leather wallet with multiple card slots and a classic design.",
  },
  {
    name: "Ergonomic Office Chair",
    price: 250.0,
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=1974&auto=format&fit=crop",
    description:
      "Improve your posture and comfort with this fully adjustable ergonomic office chair.",
  },
  {
    name: "Smart Fitness Tracker",
    price: 99.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1598717873798-1b78ebe04fc2?q=80&w=1974&auto=format&fit=crop",
    description:
      "Track your steps, heart rate, and sleep patterns with this water-resistant smart tracker.",
  },
  {
    name: "Insulated Travel Mug",
    price: 29.95,
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1646535179522-637d4162cb48?q=80&w=1974&auto=format&fit=crop",
    description:
      "Keep your drinks hot or cold for hours with this stylish, leak-proof stainless steel travel mug.",
  },
  {
    name: "Organic Green Tea",
    price: 15.0,
    category: "Groceries",
    image:
      "https://images.unsplash.com/photo-1755685451950-4a8cc78edb3b?q=80&w=1974&auto=format&fit=crop",
    description:
      "A box of 50 premium, ethically sourced organic green tea bags, rich in antioxidants.",
  },
];

const seedDB = async () => {
  try {
    // Check for MONGODB_URI
    if (!MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is not defined in your environment variables."
      );
    }

    // Connect to the database
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully for seeding...");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Existing products have been cleared.");

    // Insert the new products
    await Product.insertMany(products);
    console.log("Database has been successfully seeded with new products!");
  } catch (error) {
    console.error("Error while seeding the database:", error);
    process.exit(1); // Exit with a failure code
  } finally {
    // Always close the connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};

// Execute the seeding function
seedDB();
