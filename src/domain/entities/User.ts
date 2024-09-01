import { Role } from "../enums/role";

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  // roles: Role[];

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    // this.roles = roles;
  }
}
