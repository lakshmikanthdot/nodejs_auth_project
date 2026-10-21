// general idea
// global error handler middleware
import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  logger.error({ err }, "unhandled error");
  // response back to user with 500 status code and error message
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
