import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../domain/entities/User";

export class AuthService {
  private jwtSecret: string;
  private jwtExpiresIn: string;
  private bcryptSaltRounds: number;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET!;

    if (!this.jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not set.");
    }
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";
    this.bcryptSaltRounds = parseInt(
      process.env.BCRYPT_SALT_ROUNDS || "10",
      10
    );
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.bcryptSaltRounds);
  }

  async comparePasswords(
    inputPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }

  generateToken(user: User): string {
    return jwt.sign({ id: user.id, email: user.email }, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
  }

  verifyToken(token: string): string | JwtPayload {
    return jwt.verify(token, this.jwtSecret);
  }
}
