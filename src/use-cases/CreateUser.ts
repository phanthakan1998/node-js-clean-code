import { v4 as uuidv4 } from "uuid";

import { CreateUserDTO } from "../domain/dto/user.dto";
import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/interfaces/UserRepository";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    const user = new User(uuidv4(), data.name, data.email, data.password);
    return await this.userRepository.save(user);
  }
}
