import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    messages: [
      {
        messageId: {
          type: String,
          required: true,
          unique: true,
        },
        sender: {
          type: String,
          enum: ["user", "bot", "expert"],
          required: true,
        },
        message: {
          text: {
            type: String,
            required: true,
            maxlength: [2000, "Message cannot exceed 2000 characters"],
          },
          language: {
            type: String,
            enum: ["en", "hi", "mr"],
            default: "en",
          },
        },
        messageType: {
          type: String,
          enum: [
            "text",
            "image",
            "document",
            "location",
            "quick_reply",
            "card",
            "carousel",
            "list",
          ],
          default: "text",
        },
        attachments: [
          {
            type: {
              type: String,
              enum: ["image", "document", "audio", "video"],
            },
            url: String,
            filename: String,
            size: Number,
            mimeType: String,
          },
        ],
        quickReplies: [
          {
            title: String,
            payload: String,
          },
        ],
        cards: [
          {
            title: String,
            subtitle: String,
            imageUrl: String,
            buttons: [
              {
                title: String,
                type: {
                  type: String,
                  enum: ["postback", "url", "phone"],
                },
                value: String,
              },
            ],
          },
        ],
        metadata: {
          intent: String,
          confidence: Number,
          entities: [
            {
              entity: String,
              value: String,
              confidence: Number,
            },
          ],
          context: mongoose.Schema.Types.Mixed,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        isRead: {
          type: Boolean,
          default: false,
        },
        isDelivered: {
          type: Boolean,
          default: false,
        },
        replyTo: String, // messageId of the message being replied to
      },
    ],
    topic: {
      type: String,
      enum: [
        "general",
        "crop_recommendation",
        "pest_control",
        "disease_identification",
        "soil_health",
        "weather",
        "irrigation",
        "fertilizer",
        "market_prices",
        "government_schemes",
        "technical_support",
      ],
      default: "general",
    },
    category: {
      type: String,
      enum: ["query", "complaint", "feedback", "support", "emergency"],
      default: "query",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["active", "resolved", "escalated", "archived"],
      default: "active",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    context: {
      cropType: String,
      farmSize: Number,
      location: {
        coordinates: [Number],
        address: String,
      },
      season: String,
      previousQueries: [String],
      userPreferences: {
        language: String,
        responseFormat: String,
      },
    },
    sentiment: {
      score: {
        type: Number,
        min: -1,
        max: 1,
      },
      magnitude: Number,
      classification: {
        type: String,
        enum: ["positive", "negative", "neutral", "mixed"],
      },
    },
    satisfaction: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      feedback: String,
      ratedAt: Date,
    },
    escalation: {
      reason: String,
      escalatedAt: Date,
      escalatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      escalatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      notes: String,
    },
    analytics: {
      totalMessages: {
        type: Number,
        default: 0,
      },
      averageResponseTime: Number, // in seconds
      sessionDuration: Number, // in seconds
      intentsSatisfied: [String],
      fallbackCount: Number,
      handoffCount: Number,
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes
chatSchema.index({ user: 1, createdAt: -1 });
chatSchema.index({ sessionId: 1 });
chatSchema.index({ status: 1 });
chatSchema.index({ topic: 1 });
chatSchema.index({ lastActivity: -1 });
chatSchema.index({ "messages.timestamp": -1 });

// Virtual for unread messages count
chatSchema.virtual("unreadCount").get(function () {
  return this.messages.filter((msg) => msg.sender === "bot" && !msg.isRead)
    .length;
});

// Virtual for last message
chatSchema.virtual("lastMessage").get(function () {
  return this.messages.length > 0
    ? this.messages[this.messages.length - 1]
    : null;
});

// Virtual for session duration
chatSchema.virtual("sessionDurationMinutes").get(function () {
  if (this.messages.length < 2) return 0;

  const firstMessage = this.messages[0];
  const lastMessage = this.messages[this.messages.length - 1];

  return Math.round(
    (lastMessage.timestamp - firstMessage.timestamp) / (1000 * 60),
  );
});

// Pre-save middleware
chatSchema.pre("save", function (next) {
  // Update analytics
  this.analytics.totalMessages = this.messages.length;

  // Update last activity
  if (this.messages.length > 0) {
    this.lastActivity = this.messages[this.messages.length - 1].timestamp;
  }

  // Generate messageId for new messages
  this.messages.forEach((message) => {
    if (!message.messageId) {
      message.messageId = `msg_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }
  });

  next();
});

// Instance methods
chatSchema.methods.addMessage = function (messageData) {
  const message = {
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...messageData,
    timestamp: new Date(),
  };

  this.messages.push(message);
  this.lastActivity = new Date();

  return message;
};

chatSchema.methods.markAsRead = function (messageId) {
  const message = this.messages.id(messageId);
  if (message) {
    message.isRead = true;
  }
  return message;
};

chatSchema.methods.markAllAsRead = function () {
  this.messages.forEach((message) => {
    if (message.sender === "bot") {
      message.isRead = true;
    }
  });
};

chatSchema.methods.getConversationHistory = function (limit = 10) {
  return this.messages.slice(-limit).map((msg) => ({
    role: msg.sender === "user" ? "user" : "assistant",
    content: msg.message.text,
    timestamp: msg.timestamp,
  }));
};

chatSchema.methods.escalateToExpert = function (reason, escalatedBy) {
  this.status = "escalated";
  this.escalation = {
    reason,
    escalatedAt: new Date(),
    escalatedBy,
  };
};

chatSchema.methods.closeSession = function () {
  this.status = "resolved";
  this.isActive = false;
};

// Static methods
chatSchema.statics.findActiveByUser = function (userId) {
  return this.find({
    user: userId,
    status: "active",
    isActive: true,
  }).sort({ lastActivity: -1 });
};

chatSchema.statics.findBySessionId = function (sessionId) {
  return this.findOne({ sessionId });
};

chatSchema.statics.getUnresolvedChats = function () {
  return this.find({
    status: { $in: ["active", "escalated"] },
    isActive: true,
  }).sort({ priority: -1, lastActivity: 1 });
};

chatSchema.statics.getChatStatistics = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: {
          status: "$status",
          topic: "$topic",
        },
        count: { $sum: 1 },
        avgSatisfaction: { $avg: "$satisfaction.rating" },
        avgDuration: { $avg: "$analytics.sessionDuration" },
      },
    },
  ]);

  const totalChats = await this.countDocuments();
  const activeChats = await this.countDocuments({ status: "active" });
  const resolvedChats = await this.countDocuments({ status: "resolved" });

  return {
    total: totalChats,
    active: activeChats,
    resolved: resolvedChats,
    resolutionRate: totalChats > 0 ? (resolvedChats / totalChats) * 100 : 0,
    byTopic: stats,
  };
};

chatSchema.statics.getPopularIntents = async function (days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: startDate },
      },
    },
    {
      $unwind: "$messages",
    },
    {
      $match: {
        "messages.metadata.intent": { $exists: true },
      },
    },
    {
      $group: {
        _id: "$messages.metadata.intent",
        count: { $sum: 1 },
        avgConfidence: { $avg: "$messages.metadata.confidence" },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 20,
    },
  ]);
};

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
