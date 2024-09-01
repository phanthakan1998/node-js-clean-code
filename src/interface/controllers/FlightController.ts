import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";

import { FlightRepositoryImplementation } from "../../infrastructure/repositories/FlightRepository";
import { FlightUseCase } from "../../use-cases/Flight";
import { GetSearchFlightInput } from "../../domain/dto/flight.dto";
import { GetSearchFlightValidator } from "../validator/FlightValidator";
import { sendResponse } from "../../utils/common";

const flightRepository = new FlightRepositoryImplementation();
const flightUseCase = new FlightUseCase(flightRepository);

export class FlightController {
  static async getAllDestination(
    _: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const allDestination = await flightUseCase.getAllDestination();
      sendResponse(
        res,
        allDestination,
        200,
        "All destinations retrieved successfully"
      );
    } catch (error) {
      console.log({ error });

      next(error);
    }
  }

  static async getAllOrigin(_: Request, res: Response, next: NextFunction) {
    try {
      const allOrigin = await flightUseCase.getAllOrigin();
      sendResponse(res, allOrigin, 200, "All origins retrieved successfully");
    } catch (error) {
      console.log({ error });

      next(error);
    }
  }

  static async getFlightById(req: Request, res: Response, next: NextFunction) {
    try {
      const { flightId } = req.params;
      if (flightId) {
        const flight = await flightUseCase.getFlightById(flightId);
        sendResponse(res, flight, 200, "Flight retrieved successfully");
      } else {
        sendResponse(res, null, 400, "Flight ID is required");
      }
    } catch (error) {
      next(error);
    }
  }

  static async getSearchFlight(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { originId, destinationId, startDate } = req.query;

      if (!originId || !destinationId || !startDate) {
        return sendResponse(
          res,
          null,
          400,
          "All parameters (originId, destinationId, startDate, endDate) are required."
        );
      }

      const originIdString = originId.toString();
      const destinationIdString = destinationId.toString();
      const startDateNumber = parseInt(startDate as string, 10);

      const dto = new GetSearchFlightValidator(
        originIdString,
        destinationIdString,
        startDateNumber
      );

      const errors = await validate(dto);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((err) => Object.values(err.constraints || {}))
          .flat()
          .join(", ");

        return sendResponse(
          res,
          null,
          400,
          `Validation failed: ${errorMessages}`
        );
      }

      const getSearchFlightInput: GetSearchFlightInput = {
        originId: originIdString,
        destinationId: destinationIdString,
        startDate: startDateNumber,
      };

      const allOrigin = await flightUseCase.getSearchFlight(
        getSearchFlightInput
      );

      sendResponse(
        res,
        allOrigin,
        200,
        "Search results retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}
