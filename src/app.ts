// entry file for express
// express related logic added here
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import { apiRouter } from "./routes";

export function createApp() {
  const app = express();

  // middleware to enable CORS
  app.use(cors());

  // middleware to parse incoming JSON requests
  // example: { "name": "John", "age": 30 } to be parsed into req.body
  // if content-type is application/json
  app.use(express.json());

  // middleware to parse incoming urlencoded requests
  // example: name=John&age=30 to be parsed into req.body
  // if content-type is application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // base api route for all routes of application
  app.use("/api", apiRouter);

  // to use the error handler we need to import it and use it as a middleware
  app.use(errorHandler);

  // middleware to handle not found routes
  app.use(notFound);

  return app;
}
