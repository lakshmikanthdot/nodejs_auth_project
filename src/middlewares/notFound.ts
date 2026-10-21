// user given random url
// we need to handle it the by saying the url is not found
import { Request, Response } from "express";

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
}
