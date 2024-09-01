import { Router } from "express";
import { FlightController } from "../controllers/FlightController";
import { apiKeyMiddleware } from "../middleware/ApiKey";

const router = Router();

router.use(apiKeyMiddleware);

router.get("/destinations", FlightController.getAllDestination);
router.get("/origins", FlightController.getAllOrigin);
router.get("/searchFlight", FlightController.getSearchFlight);
router.get("/flight/:flightId", FlightController.getFlightById);

export default router;
