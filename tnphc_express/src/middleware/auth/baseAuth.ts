import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import responses from "../../utils/responses";

const JWT_SECRET = process.env.JWT_SECRET as string; // from .env



// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Middleware: Verify JWT and attach decoded user
 */
export const baseAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json(
        responses.generate("validationError", {
          message: "Authorization header missing",
        })
      );
  }

  const token = authHeader.split(" ")[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res
      .status(401)
      .json(
        responses.generate("validationError", {
          message: "Token missing",
        })
      );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user
    next();
  } catch (err) {
    return res
      .status(403)
      .json(
        responses.generate("loginFailed", {
          message: "Invalid or expired token",
          error: err,
        })
      );
  }
};

/**
 * Middleware factory: Check user role
 * @param roles - One or more roles to allow
 */
export const isRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json(
        responses.generate("loginFailed", {
             message: "You do not have permission to access this resource",
        })
     );
    }
    next();
  };
};

export default baseAuth;
