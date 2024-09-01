import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const createSanitizationMiddleware = (schema: any) => {
  const validationChains = Object.keys(schema).map((field) => {
    const rules = schema[field];
    return body(field).customSanitizer((value) => {
      if (rules.trim) {
        value = value.trim();
      }
      if (rules.escape) {
        value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      if (rules.isNumeric) {
        if (isNaN(Number(value))) {
          throw new Error("Invalid number");
        }
      }
      if (rules.toFloat) {
        value = parseFloat(value);
      }
      return value;
    });
  });

  return [
    ...validationChains,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
