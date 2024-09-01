import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/common";

export const apiKeyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey !== process.env.API_KEY) {
    sendResponse(res, undefined, 401, "Invalid API Key");
  }

  return next();
};
