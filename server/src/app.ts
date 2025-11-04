import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler";

// Import all routes
import productRoutes from "./routes/products.routes";
import orderRoutes from "./routes/orders.routes";
import paystackRoutes from "./routes/paystack.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

// Core Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/auth", authRoutes);

// Catch-all for undefined routes
app.all(/.*/, (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

export default app;
