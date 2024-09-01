import { Response } from "express";
import { APIResponseType } from "../domain/interfaces/common";

export function sendResponse<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message: string = "Success"
): void {
  const response: APIResponseType<T> = {
    data,
    statusCode,
    isSuccess: statusCode >= 200 && statusCode < 300,
    message,
  };
  res.status(statusCode).json(response);
}
