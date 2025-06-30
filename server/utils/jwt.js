import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate access and refresh tokens
export const generateTokens = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  // Generate access token
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    issuer: "bindisa-agritech",
    audience: "bindisa-users",
  });

  // Generate refresh token
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
      issuer: "bindisa-agritech",
      audience: "bindisa-users",
    },
  );

  return { accessToken, refreshToken };
};

// Verify access token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "bindisa-agritech",
      audience: "bindisa-users",
    });
  } catch (error) {
    return null;
  }
};

// Verify refresh token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
      issuer: "bindisa-agritech",
      audience: "bindisa-users",
    });
  } catch (error) {
    return null;
  }
};

// Generate API key for third-party integrations
export const generateApiKey = (userId, permissions = []) => {
  const payload = {
    id: userId,
    type: "api_key",
    permissions,
    created: Date.now(),
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1y", // API keys are long-lived
    issuer: "bindisa-agritech",
    audience: "bindisa-api",
  });
};

// Generate temporary token for specific operations
export const generateTempToken = (data, expiresIn = "10m") => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn,
    issuer: "bindisa-agritech",
    audience: "bindisa-temp",
  });
};

// Verify temporary token
export const verifyTempToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "bindisa-agritech",
      audience: "bindisa-temp",
    });
  } catch (error) {
    return null;
  }
};

// Generate secure random token (non-JWT)
export const generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString("hex");
};

// Generate short-lived verification code
export const generateVerificationCode = (length = 6) => {
  const chars = "0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Hash token for storage (to prevent token reuse if database is compromised)
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

// Extract user info from token without verification
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  return Date.now() >= decoded.exp * 1000;
};

// Get token expiration time
export const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return null;
  }
  return new Date(decoded.exp * 1000);
};

// Generate token with custom claims
export const generateCustomToken = (
  payload,
  secret = process.env.JWT_SECRET,
  options = {},
) => {
  const defaultOptions = {
    issuer: "bindisa-agritech",
    audience: "bindisa-users",
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, { ...defaultOptions, ...options });
};
