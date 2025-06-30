import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  verifyEmail,
  resendVerificationEmail,
  forgotPassword,
  resetPassword,
  changePassword,
  getCurrentUser,
  updateProfile,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { validate } from "../middleware/validation.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh-token", refreshToken);
router.post("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerificationEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.use(authenticate); // All routes below require authentication

router.post("/logout", logout);
router.post("/change-password", changePassword);
router.get("/me", getCurrentUser);
router.put("/profile", updateProfile);

export default router;
