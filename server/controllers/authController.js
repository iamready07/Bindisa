import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendEmail } from "../utils/email.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.js";
import { validateInput } from "../utils/validation.js";
import {
  createSuccessResponse,
  createErrorResponse,
} from "../utils/response.js";

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber, farmDetails } = req.body;

    // Validate input
    const validationErrors = validateInput({
      name: { value: name, rules: ["required", "string", "min:2", "max:50"] },
      email: { value: email, rules: ["required", "email"] },
      password: { value: password, rules: ["required", "string", "min:6"] },
      role: {
        value: role,
        rules: ["string", "in:user,farmer,expert"],
        default: "user",
      },
    });

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json(createErrorResponse("Validation failed", validationErrors));
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(409)
        .json(createErrorResponse("User already exists with this email"));
    }

    // Create user
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || "user",
    };

    if (phoneNumber) {
      userData.phoneNumber = phoneNumber;
    }

    if (role === "farmer" && farmDetails) {
      userData.farmDetails = farmDetails;
    }

    const user = await User.create(userData);

    // Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome to Bindisa Agritech - Verify Your Email",
        template: "email-verification",
        data: {
          name: user.name,
          verificationUrl: `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`,
        },
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue registration even if email fails
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Remove sensitive data from response
    user.password = undefined;
    user.emailVerificationToken = undefined;

    res.status(201).json(
      createSuccessResponse("User registered successfully", {
        user,
        accessToken,
        message: "Please check your email to verify your account",
      }),
    );
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json(createErrorResponse("Registration failed", error.message));
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Validate input
    const validationErrors = validateInput({
      email: { value: email, rules: ["required", "email"] },
      password: { value: password, rules: ["required", "string"] },
    });

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json(createErrorResponse("Validation failed", validationErrors));
    }

    // Find user and include password
    const user = await User.findByEmail(email).select("+password");
    if (!user) {
      return res
        .status(401)
        .json(createErrorResponse("Invalid email or password"));
    }

    // Check if account is locked
    if (user.isLocked) {
      return res
        .status(423)
        .json(
          createErrorResponse(
            "Account is temporarily locked due to too many failed login attempts. Please try again later.",
          ),
        );
    }

    // Check if account is active
    if (!user.isActive) {
      return res
        .status(403)
        .json(createErrorResponse("Account is deactivated"));
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      // Increment login attempts
      await user.incLoginAttempts();
      return res
        .status(401)
        .json(createErrorResponse("Invalid email or password"));
    }

    // Clean expired refresh tokens
    user.cleanExpiredTokens();

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Update last login
    user.lastLogin = new Date();
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    await user.save();

    // Set refresh token in httpOnly cookie
    const cookieMaxAge = rememberMe
      ? 30 * 24 * 60 * 60 * 1000 // 30 days
      : 24 * 60 * 60 * 1000; // 1 day

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: cookieMaxAge,
    });

    // Remove sensitive data from response
    user.password = undefined;
    user.refreshTokens = undefined;

    res.json(
      createSuccessResponse("Login successful", {
        user,
        accessToken,
      }),
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json(createErrorResponse("Login failed", error.message));
  }
};

// Refresh access token
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(401)
        .json(createErrorResponse("Refresh token not provided"));
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json(createErrorResponse("Invalid refresh token"));
    }

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.id);
    if (!user || !user.refreshTokens.some((t) => t.token === refreshToken)) {
      return res.status(401).json(createErrorResponse("Invalid refresh token"));
    }

    // Check if user is still active
    if (!user.isActive) {
      return res
        .status(403)
        .json(createErrorResponse("Account is deactivated"));
    }

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    // Remove old refresh token and add new one
    user.removeRefreshToken(refreshToken);
    user.refreshTokens.push({
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    await user.save();

    // Set new refresh token in cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json(
      createSuccessResponse("Token refreshed successfully", {
        accessToken,
      }),
    );
  } catch (error) {
    console.error("Token refresh error:", error);
    res
      .status(500)
      .json(createErrorResponse("Token refresh failed", error.message));
  }
};

// Logout user
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    const userId = req.user?.id;

    if (refreshToken && userId) {
      // Remove refresh token from database
      const user = await User.findById(userId);
      if (user) {
        user.removeRefreshToken(refreshToken);
        await user.save();
      }
    }

    // Clear refresh token cookie
    res.clearCookie("refreshToken");

    res.json(createSuccessResponse("Logout successful"));
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json(createErrorResponse("Logout failed", error.message));
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res
        .status(400)
        .json(createErrorResponse("Verification token is required"));
    }

    // Find user by verification token
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json(createErrorResponse("Invalid or expired verification token"));
    }

    // Update user
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json(createSuccessResponse("Email verified successfully"));
  } catch (error) {
    console.error("Email verification error:", error);
    res
      .status(500)
      .json(createErrorResponse("Email verification failed", error.message));
  }
};

// Resend verification email
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(createErrorResponse("Email is required"));
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).json(createErrorResponse("User not found"));
    }

    if (user.emailVerified) {
      return res
        .status(400)
        .json(createErrorResponse("Email is already verified"));
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();

    // Send verification email
    await sendEmail({
      to: user.email,
      subject: "Bindisa Agritech - Verify Your Email",
      template: "email-verification",
      data: {
        name: user.name,
        verificationUrl: `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`,
      },
    });

    res.json(createSuccessResponse("Verification email sent successfully"));
  } catch (error) {
    console.error("Resend verification error:", error);
    res
      .status(500)
      .json(
        createErrorResponse("Failed to send verification email", error.message),
      );
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json(createErrorResponse("Email is required"));
    }

    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists
      return res.json(
        createSuccessResponse(
          "If an account with that email exists, a password reset link has been sent",
        ),
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send reset email
    try {
      await sendEmail({
        to: user.email,
        subject: "Bindisa Agritech - Password Reset Request",
        template: "password-reset",
        data: {
          name: user.name,
          resetUrl: `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`,
        },
      });
    } catch (emailError) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      throw emailError;
    }

    res.json(
      createSuccessResponse(
        "If an account with that email exists, a password reset link has been sent",
      ),
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    res
      .status(500)
      .json(createErrorResponse("Failed to process request", error.message));
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Validate input
    const validationErrors = validateInput({
      token: { value: token, rules: ["required", "string"] },
      password: { value: password, rules: ["required", "string", "min:6"] },
    });

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json(createErrorResponse("Validation failed", validationErrors));
    }

    // Find user by reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json(createErrorResponse("Invalid or expired reset token"));
    }

    // Update password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    // Clear all refresh tokens for security
    user.refreshTokens = [];

    await user.save();

    res.json(createSuccessResponse("Password reset successfully"));
  } catch (error) {
    console.error("Reset password error:", error);
    res
      .status(500)
      .json(createErrorResponse("Password reset failed", error.message));
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Validate input
    const validationErrors = validateInput({
      currentPassword: {
        value: currentPassword,
        rules: ["required", "string"],
      },
      newPassword: {
        value: newPassword,
        rules: ["required", "string", "min:6"],
      },
    });

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json(createErrorResponse("Validation failed", validationErrors));
    }

    // Find user with password
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json(createErrorResponse("User not found"));
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res
        .status(400)
        .json(createErrorResponse("Current password is incorrect"));
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json(createSuccessResponse("Password changed successfully"));
  } catch (error) {
    console.error("Change password error:", error);
    res
      .status(500)
      .json(createErrorResponse("Password change failed", error.message));
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "farmDetails.cropTypes",
      select: "name season",
    });

    if (!user) {
      return res.status(404).json(createErrorResponse("User not found"));
    }

    res.json(createSuccessResponse("User fetched successfully", { user }));
  } catch (error) {
    console.error("Get current user error:", error);
    res
      .status(500)
      .json(createErrorResponse("Failed to fetch user", error.message));
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    // Remove sensitive fields that shouldn't be updated here
    delete updates.password;
    delete updates.email;
    delete updates.role;
    delete updates.refreshTokens;

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json(createErrorResponse("User not found"));
    }

    res.json(createSuccessResponse("Profile updated successfully", { user }));
  } catch (error) {
    console.error("Update profile error:", error);
    res
      .status(500)
      .json(createErrorResponse("Profile update failed", error.message));
  }
};
