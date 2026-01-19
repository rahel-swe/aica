import type { ErrorRequestHandler } from "express";
import ENV from "../config/env.config";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // If some earlier middleware already started sending a response, let Express handle the error

  if (res.headersSent) return next(err);

  // Normalize original error for inspection
  const original = err as any;

  // Default response
  let status = 500;
  let message = "Server Error";
  let details: unknown = undefined;

  // Mongoose: invalid ObjectId / CastError -> 404
  if (original?.name === "CastError") {
    status = 404;
    message = "Resource not found";
  }

  // Mongoose: duplicate key -> 400
  else if (original?.code === 11000) {
    status = 400;
    message = "Duplicate field value entered";
    details = { duplicate: original.keyValue ?? original };
  }

  // Mongoose: validation error -> 400 (collect message)
  else if (original?.name === "ValidationError") {
    status = 400;
    const messages = Object.values(original.errors ?? {})
      .map((e: any) => e?.message)
      .filter(Boolean);
    message = message.length ? messages.join(", ") : "Validation failed";
    details = original.errors;
  }

  // If error already specifies a status, use it
  else if (
    typeof original?.status === "number" ||
    typeof original?.statusCode === "number"
  ) {
    status = original?.status ?? original?.statusCode;
    message = original?.message ?? message;
    details = original?.message ?? details;
  }

  // For other Error instances, use thier message (but keep 500 unless set above)
  else if (original instanceof Error && original.message) {
    message = original.message;
  }

  // Log server-side (replace with real logger in production)
  console.error("Error: ", {
    message: original?.message,
    name: original?.name,
    stack: original?.stack,
    code: original?.code,
    url: req.originalUrl,
    method: req.method,
    requesId: (req as any).requesId,
  });

  // Build safe response (hide internal details for 5xx in production)
  const requesId = (req as any).requesId;
  const safeMessage = status >= 500 ? "Internal server error" : message;

  const payload: any = {
    success: false,
    error: {
      message: safeMessage,
      status,
      requesId,
    },
  };

  if (ENV.NODE_ENV !== "production") {
    // helpul debug info in development
    payload.error._rawMessage = message;
    payload.error.stack = original?.stack;
    if (details) payload.error.details = details;
  } else if (details && status < 500) {
    // limited details in production for client errors
    payload.error.details = details;
  }

  // set request-id header if we have one
  if (requesId) res.setHeader("X-Request-Id", requesId);

  return res.status(status).json(payload);
};

export default errorMiddleware;
