import { AuthConfig } from "../constants/constants";
import { AppError } from "../errors/AppError";
import { createUser, findUserByEmail } from "../repositories/user.repository";
import bcrypt from "bcrypt";

export async function registerUser(
  email: string,
  password: string,
): Promise<void> {
  // safeguard to check if email and password are provided or not
  if (!email || !password) {
    throw new AppError(400, "Email and password are required");
  }
  // using enum
  if (password.length < AuthConfig.minPasswordLength) {
    throw new AppError(400, "Password must be at least 6 characters long");
  }

  // normalize the email to lowercase and trim any whitespace
  const normalizeEmail = email.toLocaleLowerCase().trim();

  // find the user if its already present in db or not
  // if yes then we will not allow the user to register again with the same email
  // connect to the database and check if the user already exists
  // here we are using the user.repository.ts file
  // to check if the user already exists in the database or not
  const existingUser = await findUserByEmail(normalizeEmail);

  // check presence of existing user we will throw an error if the user already exists
  if (existingUser) {
    throw new AppError(409, "Email already present");
  }

  // we never store the password in plain text in the database
  // passsword hashing by using bcryptjs library

  const passwordHash = await bcrypt.hash(
    password,
    AuthConfig.numberOfSaltRounds,
  );

  // now we will insert the new user into the database
  await createUser(normalizeEmail, passwordHash);
}
