// entry file for express
// express related logic added here
import express from "express";

export function createApp() {
  const app = express();
  // middleware to parse incoming JSON requests
  // example: { "name": "John", "age": 30 } to be parsed into req.body
  // if content-type is application/json
  app.use(express.json());
}
