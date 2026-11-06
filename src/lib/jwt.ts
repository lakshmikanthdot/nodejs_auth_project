import { env } from "../config/env";
import { AppError } from "../errors/AppError";
import { TokenPayload } from "../types/user";
import jwt, { SignOptions } from "jsonwebtoken";

// create the access token
export function signAccessToken(payload: TokenPayload): string {
  // jsonwebtoken package is used to create the access token
  const options: SignOptions = {
    expiresIn: env.jwtAccessExpiresIn as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, env.jwtSecret, options);
}

export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, env.jwtSecret) as TokenPayload;
  } catch (error) {
    throw new AppError(401, "Invalid or expired access token");
  }
}
