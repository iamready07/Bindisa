import { createErrorResponse } from "../utils/response.js";

// Global error handler middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err);

  let statusCode = 500;
  let message = "Something went wrong on the server";
  let details = null;

  // Handle different types of errors
  if (err.name === "ValidationError") {
    // Mongoose validation error
    statusCode = 400;
    message = "Validation error";
    details = Object.values(err.errors).map((e) => e.message);
  } else if (err.name === "CastError") {
    // Mongoose bad ObjectId
    statusCode = 400;
    message = "Invalid ID format";
  } else if (err.code === 11000) {
    // Mongoose duplicate key
    statusCode = 409;
    message = "Duplicate entry";
    // Get the field name from the error
    const field = Object.keys(err.keyValue)[0];
    details = `${field} already exists`;
  } else if (err.name === "JsonWebTokenError") {
    // JWT errors
    statusCode = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (err.type === "entity.parse.failed") {
    // JSON parse error
    statusCode = 400;
    message = "Invalid JSON in request body";
  } else if (err.message && err.statusCode) {
    // Custom error with statusCode and message
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  }

  // Handle specific status codes
  if (statusCode === 401) {
    res.clearCookie("refreshToken");
  }

  // Development mode provides more details
  let response;
  if (process.env.NODE_ENV === "development") {
    response = createErrorResponse(
      message,
      details || err.message || "No details available",
      {
        stack: err.stack,
        type: err.name,
        code: err.code,
      },
    );
  } else {
    // Production mode hides implementation details
    response = createErrorResponse(message, details);
  }

  res.status(statusCode).json(response);
};

// Custom error class
export class AppError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true; // Indicates this is an operational error

    Error.captureStackTrace(this, this.constructor);
  }
}

// Not found handler middleware
export const notFoundHandler = (req, res) => {
  res
    .status(404)
    .json(
      createErrorResponse(
        "Not Found",
        `The requested resource at ${req.originalUrl} was not found`,
      ),
    );
};

// Handler for uncaught exceptions and unhandled rejections
export const setupGlobalErrorHandlers = () => {
  process.on("uncaughtException", (err) => {
    console.error("\n\nUNCAUGHT EXCEPTION! Shutting down...");
    console.error(err.name, err.message);
    console.error(err.stack);
    // Give the server time to log the error
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  process.on("unhandledRejection", (err) => {
    console.error("\n\nUNHANDLED REJECTION! Shutting down...");
    console.error(err.name, err.message);
    console.error(err.stack);
    // Give the server time to log the error
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down gracefully...");
    // Allow server to close on its own
  });
};
