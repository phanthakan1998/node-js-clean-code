import helmet from "helmet";
import { Express, Request, Response, NextFunction } from "express";

export const applySecurityMiddleware = (app: Express): void => {
  app.use(helmet());

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Frame-Options", "DENY");

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    next();
  });
};
