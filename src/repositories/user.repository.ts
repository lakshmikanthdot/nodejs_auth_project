// logic related to user repository will be added here
// means any db related logic will be added here

import { pool } from "../lib/db";
import { DBUserRow, DBUserWithPasswordRow, User } from "../types/user";

// find the user by email
// we will use in the auth.service.ts file to check
// if the user already exists in the database or not

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query<DBUserRow>(
    `SELECT id, email, role, created_at 
     FROM users 
     WHERE email = $1`,
    [email],
  );
  return result.rows[0] ?? null;
}

export async function createUser(
  email: string,
  passwordHash: string,
): Promise<User> {
  const result = await pool.query<DBUserRow>(
    `INSERT INTO users (email, password_hash) 
     VALUES ($1, $2)
     RETURNING id, email, role, created_at`,
    [email, passwordHash],
  );
  return result.rows[0];
}

// login
// find the user by email and password
export async function findLoginUserByEmailWithPassword(
  email: string,
): Promise<DBUserWithPasswordRow> {
  // first we will find the user by email in the database
  const result = await pool.query<DBUserWithPasswordRow>(
    `SELECT id, email, role, created_at, password_hash
     FROM users
     WHERE email = $1`,
    [email],
  );
  return result.rows[0] ?? null;
}
