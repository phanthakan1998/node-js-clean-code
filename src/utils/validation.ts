import { validate } from "class-validator";
import { NextFunction } from "express";

export const validateInput = async (dto: object, next: NextFunction) => {
  const errors = await validate(dto);

  if (errors.length > 0) {
    const errorMessages = errors
      .map((err) => Object.values(err.constraints || {}))
      .flat()
      .join(", ");

    next({
      status: 400,
      message: `Validation failed: ${errorMessages}`,
    });

    return false;
  }
  return true;
};
