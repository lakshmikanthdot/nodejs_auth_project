// pino package is used for logging in this project
import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
  level: env.logLevel,
  transport: env.isProduction
    ? undefined // in production, we don't want to use pino-pretty, just log in JSON format
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard", // human-readable time format
        },
      },
});
