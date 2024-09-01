import { Request, Response, NextFunction } from "express";
import { CreateUserDTO, UpdateUserDTO } from "../../domain/dto/user.dto";
import { UserRepositoryImpl } from "../../infrastructure/repositories/UserRepositoryImpl";
import { CreateUser } from "../../use-cases/CreateUser";

const userRepository = new UserRepositoryImpl();
const createUser = new CreateUser(userRepository);

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateUserDTO = req.body;
      const user = await createUser.execute(data);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
