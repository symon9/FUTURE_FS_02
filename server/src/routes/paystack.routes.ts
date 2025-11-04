import { Router } from "express";
import * as paystackController from "../controllers/paystack.controller";

const router = Router();

router.post("/initialize", paystackController.initializePayment);

export default router;
