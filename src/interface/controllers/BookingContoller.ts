import { Request, Response, NextFunction } from "express";

import { BookingValidator } from "../validator/BookingValidator";
import { validateInput } from "../../utils/validation";
import { CreateBookingInput } from "../../domain/dto/booking.dto";
import { BookingUseCase } from "../../use-cases/BookingService";
import { FlightRepositoryImplementation } from "../../infrastructure/repositories/FlightRepository";
import { PaymentRepositoryImplementation } from "../../infrastructure/repositories/PaymentRepository";
import { BookingRepositoryImplementation } from "../../infrastructure/repositories/BookingRepository";
import logger from "../../infrastructure/logger";
import { sendResponse } from "../../utils/common";

const flightRepository = new FlightRepositoryImplementation();
const paymentRepository = new PaymentRepositoryImplementation();
const bookingRepository = new BookingRepositoryImplementation();

const bookingUseCase = new BookingUseCase(
  paymentRepository,
  flightRepository,
  bookingRepository
);

export class BookingController {
  static async getBookingInformationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      logger.info("Handling Get request to /booking/:bookingId");

      const { bookingId } = req.params;
      if (bookingId) {
        logger.info("Get booking by id");
        const flight = await bookingRepository.getBookingById(bookingId);
        sendResponse(res, flight, 200, "Success");
      } else {
        logger.info("Error processing Get booking by id");
        sendResponse(res, undefined, 400, "Booking ID is required");
      }
    } catch (error) {
      next(error);
    }
  }

  static async createBooking(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Handling POST request to /booking");

      const {
        bookingId,
        paymentId,
        price,
        flightId,
        passengerName,
        passengerLastName,
        passengerId,
        bookingDate,
      } = req.body;

      const paymentDto = new BookingValidator(
        bookingId,
        paymentId,
        price,
        flightId,
        passengerName,
        passengerLastName,
        bookingDate,
        passengerId
      );

      const isValid = await validateInput(paymentDto, next);
      if (!isValid) {
        logger.info("Validation failed for createBooking");
        return;
      }

      const bookingDtoInput: CreateBookingInput = {
        bookingId: bookingId,
        passengerName: passengerName,
        passengerLastName: passengerLastName,
        flightId: flightId,
        passengerId: passengerId,
        paymentId: paymentId,
        bookingDate: bookingDate,
        price: price,
      };

      logger.info("Creating a new booking");
      const booking = await bookingUseCase.createBooking(bookingDtoInput);
      sendResponse(res, booking, 201, "Booking created successfully");
    } catch (error) {
      console.log({ error });

      logger.error("Error occurred in createBooking", error);
      next(error);
    }
  }
}
