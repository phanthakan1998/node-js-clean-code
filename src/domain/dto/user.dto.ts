import { Role } from "../enums/role";

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  // role: Role[];
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
