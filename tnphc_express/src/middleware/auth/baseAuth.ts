import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import responses from "../../utils/responses";

const JWT_SECRET = process.env.JWT_SECRET as string;

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const baseAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json(
      responses.generate("validationError", {
        message: "Authorization header missing",
      })
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json(
      responses.generate("validationError", {
        message: "Token missing",
      })
    );
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // ✅ Check token type (VERY IMPORTANT)
    if (decoded.tokenUse !== "access") {
      return res.status(403).json(
        responses.generate("loginFailed", {
          message: "Invalid token type",
        })
      );
    }

    // ✅ Map your custom payload → req.user
    req.user = {
      id: decoded.data.uid,
      userName: decoded.data.userName,
      email: decoded.data.email,
      roleId: decoded.data.roleId,
      role: decoded.data.role,
      isActive: decoded.data.isActive,
    };

    next();
  } catch (err) {
    return res.status(403).json(
      responses.generate("loginFailed", {
        message: "Invalid or expired token",
        error: err,
      })
    );
  }
};