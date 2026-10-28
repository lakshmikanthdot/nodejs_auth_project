// general idea
// global error handler middleware
import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { AppError } from "../errors/AppError";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  logger.error({ err }, "unhandled error");
  // response back to user with 500 status code and error message
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
