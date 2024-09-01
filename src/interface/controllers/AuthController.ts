import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";

import { CreateUserDTO, LoginDTO } from "../../domain/dto/user.dto";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import { AuthService } from "../../use-cases/AuthService";
import { User } from "../../domain/entities/User";
import { CreateUserValidator } from "../validator/UserValidator";
import logger from "../../infrastructure/logger";
import { sendResponse } from "../../utils/common";

const userRepository = new UserRepositoryImpl();
const authService = new AuthService();

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Handling POST request to /register");

    const { name, email, password }: CreateUserDTO = req.body;

    const dto = new CreateUserValidator(name, email, password);
    Object.assign(dto, { name, email, password });

    const errors = await validate(dto);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat()
        .join(", ");

      logger.info(`Validation failed: ${errorMessages}`);
      return sendResponse(
        res,
        undefined,
        400,
        `Validation failed: ${errorMessages}`
      );
    }

    logger.info("Validation passed, proceeding to create user");
    const hashedPassword = await authService.hashPassword(password);
    const newUser = new User(uuidv4(), name, email, hashedPassword);

    await userRepository.save(newUser);

    logger.info("User registered successfully");
    sendResponse(
      res,
      { message: "User registered successfully", user: newUser },
      201
    );
  } catch (error) {
    logger.error("Error occurred during registration", error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Handling POST request to /login");

    const { email, password }: LoginDTO = req.body;
    const user = await userRepository.findByEmail(email);

    if (user && (await authService.comparePasswords(password, user.password))) {
      logger.info("Login successful, generating token");
      const token = authService.generateToken(user);
      sendResponse(res, { message: "Login successful", token }, 200);
    } else {
      logger.info("Invalid email or password");
      sendResponse(res, undefined, 401, "Invalid email or password");
    }
  } catch (error) {
    logger.error("Error occurred during login", error);
    next(error);
  }
};
