import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  id: string;
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError(401, "You are not logged in. Please log in to get access.")
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.id; // Attach userId to the request object
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError(401, "Token has expired. Please log in again."));
    } else if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, "Invalid token. Please log in again."));
    } else {
      // To be handled by a higher level middleware or error handler
      throw error;
    }
  }
};
