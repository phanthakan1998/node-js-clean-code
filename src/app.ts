import express, { Express } from "express";
import cors from "cors";
import { errorHandler } from "./interface/middleware/ErrorHandler";
import userRoutes from "./interface/routes/UserRoutes";
import flightRoutes from "./interface/routes/FlightRoutes";
import paymentRoutes from "./interface/routes/PaymentRoutes";
import bookingRoutes from "./interface/routes/BookingRoutes";
import { applySecurityMiddleware } from "./infrastructure/security/securityMiddleware";

const app: Express = express();
const PREFIX_PATH_API = "/api";

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

applySecurityMiddleware(app);

app.use(PREFIX_PATH_API, userRoutes);
app.use(PREFIX_PATH_API, flightRoutes);
app.use(PREFIX_PATH_API, paymentRoutes);
app.use(PREFIX_PATH_API, bookingRoutes);

app.use(errorHandler);

export default app;
