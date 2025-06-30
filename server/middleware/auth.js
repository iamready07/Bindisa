import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createErrorResponse } from "../utils/response.js";

// Authenticate user using JWT
export const authenticate = async (req, res, next) => {
  try {
    let token = null;

    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    // Get token from cookies as fallback
    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res
        .status(401)
        .json(createErrorResponse("Access token is required"));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json(createErrorResponse("User not found"));
    }

    // Check if user is active
    if (!user.isActive) {
      return res
        .status(403)
        .json(createErrorResponse("Account is deactivated"));
    }

    // Attach user to request
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json(createErrorResponse("Invalid access token"));
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(createErrorResponse("Access token expired"));
    }

    console.error("Authentication error:", error);
    res
      .status(500)
      .json(createErrorResponse("Authentication failed", error.message));
  }
};

// Authorization middleware - check user roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json(createErrorResponse("Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json(
          createErrorResponse(
            "Access denied. Insufficient permissions.",
            `Required roles: ${roles.join(", ")}`,
          ),
        );
    }

    next();
  };
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }

    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (user && user.isActive) {
        req.user = {
          id: user._id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      }
    }

    next();
  } catch (error) {
    // Silently continue without authentication
    next();
  }
};

// Check if user owns resource or is admin
export const ownershipOrAdmin = (resourceIdParam = "id") => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json(createErrorResponse("Authentication required"));
      }

      const resourceId = req.params[resourceIdParam];
      const userId = req.user.id;
      const userRole = req.user.role;

      // Admin can access everything
      if (userRole === "admin") {
        return next();
      }

      // Check if user owns the resource
      if (resourceId === userId) {
        return next();
      }

      // For other resources, check in database
      // This would need to be customized based on the resource type
      return res
        .status(403)
        .json(createErrorResponse("Access denied. Resource not owned by user"));
    } catch (error) {
      console.error("Ownership check error:", error);
      res.status(500).json(createErrorResponse("Authorization check failed"));
    }
  };
};

// Rate limiting for sensitive operations
export const sensitiveOperationLimit = (req, res, next) => {
  // This would integrate with Redis or in-memory store
  // For now, we'll use a simple implementation
  const key = `sensitive_${req.user?.id || req.ip}`;
  const limit = 5; // 5 attempts per hour
  const window = 60 * 60 * 1000; // 1 hour

  // In production, use Redis for this
  // For now, just continue
  next();
};
