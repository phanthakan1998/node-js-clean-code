import winston from "winston";

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/audit.log" }),
  ],
});

export default logger;
