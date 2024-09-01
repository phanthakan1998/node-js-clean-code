import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";
import { apiKeyMiddleware } from "../middleware/ApiKey";
import { paymentSchema } from "../../domain/schema/paymentSchema";
import { createSanitizationMiddleware } from "../../infrastructure/security/sanitizationMiddleware";

const router = Router();

router.use(apiKeyMiddleware);

router.post(
  "/payment",
  createSanitizationMiddleware(paymentSchema),
  PaymentController.processPayment
);

export default router;
