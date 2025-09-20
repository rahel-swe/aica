import aj from "../config/arcjet.config";
import { isSpoofedBot } from "@arcjet/inspect";
import type { NextFunction, Request, Response } from "express";

const arcjectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure remoteAddress is always a string
    if (!req.socket.remoteAddress) {
      throw new Error("Request is missing remoteAddress");
    }
    const arcjetReq = {
      ...req,
      socket: {
        ...req.socket,
        remoteAddress: req.socket.remoteAddress as string,
      },
    };
    const decision = await aj.protect(arcjetReq, { requested: 5 });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "NO Bot Allowed" });
      } else {
        res.status(403).json({ error: "Access Denied" });
      }
    }
    if (decision.results.some(isSpoofedBot)) {
      res.status(403).json({ error: "Spoofed Bots are not allowed" });
    }
    return next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next(error);
  }
};

export default arcjectMiddleware;
