import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: {
        values: ["user", "farmer", "expert", "admin"],
        message: "Role must be either user, farmer, expert, or admin",
      },
      default: "user",
    },
    avatar: {
      public_id: String,
      url: {
        type: String,
        default: "/avatar/default.png",
      },
    },
    phoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || validator.isMobilePhone(v, "en-IN");
        },
        message: "Please provide a valid phone number",
      },
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: {
        type: String,
        default: "India",
      },
    },
    farmDetails: {
      farmName: String,
      farmSize: {
        value: Number,
        unit: {
          type: String,
          enum: ["acres", "hectares", "square_meters"],
          default: "acres",
        },
      },
      cropTypes: [
        {
          name: String,
          season: {
            type: String,
            enum: ["kharif", "rabi", "summer", "perennial"],
          },
        },
      ],
      soilType: {
        type: String,
        enum: ["clay", "sandy", "loamy", "silty", "peaty", "chalky"],
      },
      irrigationType: {
        type: String,
        enum: ["drip", "sprinkler", "flood", "manual", "rainfed"],
      },
    },
    preferences: {
      language: {
        type: String,
        enum: ["en", "hi", "mr"],
        default: "en",
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: false,
        },
        push: {
          type: Boolean,
          default: true,
        },
      },
      units: {
        temperature: {
          type: String,
          enum: ["celsius", "fahrenheit"],
          default: "celsius",
        },
        measurement: {
          type: String,
          enum: ["metric", "imperial"],
          default: "metric",
        },
      },
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: Date,
    refreshTokens: [
      {
        token: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        expiresAt: Date,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    subscription: {
      plan: {
        type: String,
        enum: ["free", "basic", "premium", "enterprise"],
        default: "free",
      },
      startDate: Date,
      endDate: Date,
      features: [String],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ "farmDetails.soilType": 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's full address
userSchema.virtual("fullAddress").get(function () {
  if (!this.address) return "";
  const { street, city, state, postalCode, country } = this.address;
  return [street, city, state, postalCode, country].filter(Boolean).join(", ");
});

// Virtual for account lock status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to handle login attempts
userSchema.pre("save", function (next) {
  // If account is not currently locked and we have login attempts, remove them
  if (this.loginAttempts && !this.isLocked) {
    this.loginAttempts = undefined;
    this.lockUntil = undefined;
  }
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    },
  );
};

// Instance method to generate JWT refresh token
userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "30d",
    },
  );

  // Store refresh token in database
  this.refreshTokens.push({
    token: refreshToken,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  });

  return refreshToken;
};

// Instance method to remove refresh token
userSchema.methods.removeRefreshToken = function (token) {
  this.refreshTokens = this.refreshTokens.filter((t) => t.token !== token);
};

// Instance method to clean expired refresh tokens
userSchema.methods.cleanExpiredTokens = function () {
  this.refreshTokens = this.refreshTokens.filter(
    (token) => token.expiresAt > new Date(),
  );
};

// Instance method to handle failed login attempts
userSchema.methods.incLoginAttempts = function () {
  const maxAttempts = 5;
  const lockTime = 2 * 60 * 60 * 1000; // 2 hours

  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: {
        loginAttempts: 1,
        lockUntil: 1,
      },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // If we hit max attempts and it's not locked yet, lock it
  if (this.loginAttempts + 1 >= maxAttempts && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + lockTime,
    };
  }

  return this.updateOne(updates);
};

// Static method to find user by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find active users
userSchema.statics.findActive = function () {
  return this.find({ isActive: true });
};

// Static method to find farmers
userSchema.statics.findFarmers = function () {
  return this.find({ role: "farmer", isActive: true });
};

// Static method to get user statistics
userSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);

  const totalUsers = await this.countDocuments({ isActive: true });
  const verifiedUsers = await this.countDocuments({
    isActive: true,
    emailVerified: true,
  });

  return {
    total: totalUsers,
    verified: verifiedUsers,
    byRole: stats,
  };
};

const User = mongoose.model("User", userSchema);

export default User;
