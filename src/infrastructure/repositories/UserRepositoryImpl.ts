import pool from "../database";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/UserRepository";

export class UserRepositoryImpl implements UserRepository {
  async save(user: User): Promise<User> {
    const result = await pool.query(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [user.id, user.name, user.email, user.password]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0] || null;
  }
}
