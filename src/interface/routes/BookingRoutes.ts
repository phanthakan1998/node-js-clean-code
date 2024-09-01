import { Router } from "express";
import { BookingController } from "../controllers/BookingContoller";
import { apiKeyMiddleware } from "../middleware/ApiKey";

const router = Router();

router.use(apiKeyMiddleware);

router.post("/booking", BookingController.createBooking);
router.get("/booking/:bookingId", BookingController.getBookingInformationById);

export default router;
