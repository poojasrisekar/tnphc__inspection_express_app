import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errorHandler/appError";
import { validateRequest } from "./validateRequest";
import {baseAuth} from "./auth/baseAuth";
import responses from "../utils/responses";

// 🔹 Centralized Error Handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const isProduction = process.env.NODE_ENV === "production";
  const stack = isProduction ? {} : { stack: err?.stack };

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      statusCode: err.statusCode,
      success: false,
      message: err.message,
      ...stack,
    });
  }

  return res.status(500).json(
    responses.generate("error", {
      message: err.message || "An unexpected error occurred",
      error: err,
    })
  );
};

// 🔹 Export all middleware in one place
export { validateRequest, baseAuth };
