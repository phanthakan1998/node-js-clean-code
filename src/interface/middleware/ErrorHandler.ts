import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../utils/common";

interface ErrorResponse {
  status: number;
  message: string;
}

export const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  sendResponse(res, undefined, statusCode, message);
};
