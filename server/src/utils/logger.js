import winston from "winston";
import { env } from "../config/env.js";

const { combine, timestamp, printf, colorize, json } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: env.NODE_ENV === "development" ? "debug" : "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    env.NODE_ENV === "development" ? colorize() : json(),
    env.NODE_ENV === "development" ? consoleFormat : json(),
  ),
  transports: [new winston.transports.Console()],
});
