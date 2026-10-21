import { Router } from "express";

// using the express router to create a new router instance
export const healthRouter = Router();

// frontend - localhost:4200
// backend - localhost:4000/health

// in general
// we will hit the backend api with localhost:4000/health
// we need to prefix /api for all my endpoints
// localhost:4000/api/health
// localhost:4000/api/users

healthRouter.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Helath route is working" });
});
// final url backend
// localhost:4000/api/health
