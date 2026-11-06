import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { verifyAccessToken } from "../lib/jwt";

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  // it will check if the authorization header is present and starts with "Bearer " with a space
  // if not i will return a 401 error with the message "Access token is required"
  if (!authHeader?.startsWith("Bearer ")) {
    next(new AppError(401, "Access token is required"));
    return;
  }
  // now we will extract the token from the authorization header
  // we will split the authorization header by space and get the second part which is the token
  const token = authHeader.split(" ")[1];

  // req is the type of Request from express which does not have a user property
  // in my request object, we want to add or append a user property to the request object
  // so that i will get to know which user is making the request
  // express.d.ts does not have a user property on the Request interface, so we will have to extend the Request interface to add the user property
  // Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
  req.user = verifyAccessToken(token);
  next();
}
