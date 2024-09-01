import { IsString, IsEmail, Length } from "class-validator";

export class CreateUserValidator {
  @IsString()
  @Length(1, 100, { message: "Name must be between 1 and 100 characters long" })
  name: string;

  @IsEmail({}, { message: "Email must be a valid email address" })
  @Length(1, 255, {
    message: "Email must be between 1 and 255 characters long",
  })
  email: string;

  @IsString()
  @Length(6, 100, {
    message: "Password must be between 6 and 100 characters long",
  })
  password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
