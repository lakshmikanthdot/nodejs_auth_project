import { env } from "../config/env";
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
