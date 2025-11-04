import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// This route can be accessed by both guests and logged-in users.
// If a user is logged in, their ID is attached to the order.
router.post("/", protect, orderController.createOrderAfterPayment);

// This route is protected and can only be accessed by logged-in users.
router.get("/history", protect, orderController.getOrderHistory);

export default router;
