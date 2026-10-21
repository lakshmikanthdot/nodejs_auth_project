// entry file for express
// express related logic added here
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";

export function createApp() {
  const app = express();
  // middleware to parse incoming JSON requests
  // example: { "name": "John", "age": 30 } to be parsed into req.body
  // if content-type is application/json
  app.use(express.json());

  // to use the error handler we need to import it and use it as a middleware
  app.use(errorHandler);

  // middleware to handle not found routes
  app.use(notFound);
}
