import mongoose from "mongoose";

const soilAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sampleId: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: "2dsphere",
      },
      address: {
        farmName: String,
        village: String,
        district: String,
        state: String,
        pincode: String,
      },
      gpsAccuracy: Number, // in meters
    },
    sampleDetails: {
      depth: {
        value: {
          type: Number,
          required: true,
          min: [5, "Sample depth must be at least 5 cm"],
          max: [100, "Sample depth cannot exceed 100 cm"],
        },
        unit: {
          type: String,
          enum: ["cm", "inches"],
          default: "cm",
        },
      },
      sampleDate: {
        type: Date,
        required: true,
        default: Date.now,
      },
      sampleWeight: {
        value: Number,
        unit: {
          type: String,
          enum: ["grams", "kg"],
          default: "grams",
        },
      },
      weather: {
        temperature: Number,
        humidity: Number,
        rainfall: {
          lastWeek: Number,
          lastMonth: Number,
        },
      },
    },
    physicalProperties: {
      texture: {
        sand: {
          type: Number,
          min: 0,
          max: 100,
        },
        silt: {
          type: Number,
          min: 0,
          max: 100,
        },
        clay: {
          type: Number,
          min: 0,
          max: 100,
        },
        textureClass: {
          type: String,
          enum: [
            "sand",
            "loamy_sand",
            "sandy_loam",
            "loam",
            "silt_loam",
            "silt",
            "sandy_clay_loam",
            "clay_loam",
            "silty_clay_loam",
            "sandy_clay",
            "silty_clay",
            "clay",
          ],
        },
      },
      structure: {
        type: String,
        enum: ["granular", "blocky", "platy", "prismatic", "massive"],
      },
      color: {
        munsell: String,
        description: String,
      },
      bulkDensity: {
        value: Number,
        unit: {
          type: String,
          default: "g/cm³",
        },
      },
      porosity: {
        total: Number,
        macropores: Number,
        micropores: Number,
      },
    },
    chemicalProperties: {
      pH: {
        value: {
          type: Number,
          required: true,
          min: [3, "pH cannot be less than 3"],
          max: [10, "pH cannot be greater than 10"],
        },
        classification: {
          type: String,
          enum: [
            "very_acidic",
            "acidic",
            "slightly_acidic",
            "neutral",
            "slightly_alkaline",
            "alkaline",
            "very_alkaline",
          ],
        },
      },
      electricalConductivity: {
        value: Number,
        unit: {
          type: String,
          default: "dS/m",
        },
        salinity: {
          type: String,
          enum: [
            "normal",
            "slightly_saline",
            "moderately_saline",
            "highly_saline",
          ],
        },
      },
      organicMatter: {
        value: {
          type: Number,
          min: 0,
          max: 100,
        },
        unit: {
          type: String,
          default: "%",
        },
        classification: {
          type: String,
          enum: ["very_low", "low", "medium", "high", "very_high"],
        },
      },
      nutrients: {
        nitrogen: {
          total: Number,
          available: Number,
          unit: {
            type: String,
            default: "kg/ha",
          },
          status: {
            type: String,
            enum: ["deficient", "low", "medium", "high", "excess"],
          },
        },
        phosphorus: {
          total: Number,
          available: Number,
          unit: {
            type: String,
            default: "kg/ha",
          },
          status: {
            type: String,
            enum: ["deficient", "low", "medium", "high", "excess"],
          },
        },
        potassium: {
          total: Number,
          available: Number,
          unit: {
            type: String,
            default: "kg/ha",
          },
          status: {
            type: String,
            enum: ["deficient", "low", "medium", "high", "excess"],
          },
        },
        secondaryNutrients: {
          calcium: Number,
          magnesium: Number,
          sulfur: Number,
        },
        micronutrients: {
          iron: Number,
          manganese: Number,
          zinc: Number,
          copper: Number,
          boron: Number,
          molybdenum: Number,
        },
      },
      cationExchangeCapacity: {
        value: Number,
        unit: {
          type: String,
          default: "cmol/kg",
        },
      },
      baseSaturation: {
        value: Number,
        unit: {
          type: String,
          default: "%",
        },
      },
    },
    biologicalProperties: {
      microbialBiomass: Number,
      enzymeActivity: {
        dehydrogenase: Number,
        phosphatase: Number,
        urease: Number,
      },
      nematodeCount: Number,
      earthwormCount: Number,
    },
    recommendations: {
      fertilizers: [
        {
          name: String,
          type: {
            type: String,
            enum: ["organic", "inorganic", "bio"],
          },
          application: {
            rate: Number,
            unit: String,
            timing: String,
            method: String,
          },
          nutrients: {
            nitrogen: Number,
            phosphorus: Number,
            potassium: Number,
          },
        },
      ],
      amendments: [
        {
          type: {
            type: String,
            enum: ["lime", "gypsum", "organic_matter", "sand", "clay"],
          },
          quantity: Number,
          unit: String,
          purpose: String,
        },
      ],
      cropSuitability: [
        {
          crop: String,
          suitability: {
            type: String,
            enum: [
              "highly_suitable",
              "suitable",
              "marginally_suitable",
              "not_suitable",
            ],
          },
          expectedYield: {
            value: Number,
            unit: String,
          },
          specificRecommendations: [String],
        },
      ],
      irrigation: {
        frequency: String,
        amount: Number,
        method: String,
        waterQuality: String,
      },
      practices: [
        {
          practice: String,
          description: String,
          timing: String,
          benefits: [String],
        },
      ],
    },
    analysis: {
      method: {
        type: String,
        enum: ["laboratory", "field_kit", "digital_sensor", "spectral"],
        required: true,
      },
      laboratory: {
        name: String,
        accreditation: String,
        contact: String,
      },
      analyst: {
        name: String,
        qualification: String,
        signature: String,
      },
      equipment: [
        {
          instrument: String,
          model: String,
          calibrationDate: Date,
        },
      ],
      standardsUsed: [String],
      qualityControl: {
        duplicates: Boolean,
        blanks: Boolean,
        standards: Boolean,
      },
    },
    images: [
      {
        type: {
          type: String,
          enum: ["field_photo", "sample_photo", "profile_photo", "crop_photo"],
        },
        url: String,
        public_id: String,
        caption: String,
        coordinates: [Number],
      },
    ],
    reports: [
      {
        type: {
          type: String,
          enum: ["detailed", "summary", "farmer_friendly"],
        },
        language: {
          type: String,
          enum: ["en", "hi", "mr"],
          default: "en",
        },
        url: String,
        generatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "verified", "delivered"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    cost: {
      amount: Number,
      currency: {
        type: String,
        default: "INR",
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "paid", "refunded"],
        default: "pending",
      },
    },
    validUntil: {
      type: Date,
      default: function () {
        return new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days
      },
    },
    notes: [
      {
        note: String,
        addedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Indexes
soilAnalysisSchema.index({ user: 1, createdAt: -1 });
soilAnalysisSchema.index({ sampleId: 1 });
soilAnalysisSchema.index({ "location.coordinates": "2dsphere" });
soilAnalysisSchema.index({ status: 1 });
soilAnalysisSchema.index({ validUntil: 1 });

// Virtual for soil health score
soilAnalysisSchema.virtual("healthScore").get(function () {
  if (!this.chemicalProperties?.pH?.value) return null;

  let score = 0;
  let factors = 0;

  // pH score (30% weight)
  const ph = this.chemicalProperties.pH.value;
  if (ph >= 6.0 && ph <= 7.5) score += 30;
  else if (ph >= 5.5 && ph <= 8.0) score += 20;
  else if (ph >= 5.0 && ph <= 8.5) score += 10;
  factors += 30;

  // Organic matter score (25% weight)
  const om = this.chemicalProperties?.organicMatter?.value;
  if (om) {
    if (om >= 3) score += 25;
    else if (om >= 2) score += 20;
    else if (om >= 1) score += 15;
    else score += 5;
    factors += 25;
  }

  // Nutrient availability (45% weight)
  const nutrients = this.chemicalProperties?.nutrients;
  if (nutrients) {
    ["nitrogen", "phosphorus", "potassium"].forEach((nutrient) => {
      const status = nutrients[nutrient]?.status;
      if (status === "medium" || status === "high") score += 15;
      else if (status === "low") score += 10;
      else if (status === "deficient") score += 5;
      factors += 15;
    });
  }

  return factors > 0 ? Math.round((score / factors) * 100) : null;
});

// Virtual for isExpired
soilAnalysisSchema.virtual("isExpired").get(function () {
  return this.validUntil < new Date();
});

// Pre-save middleware
soilAnalysisSchema.pre("save", function (next) {
  // Generate sample ID if not provided
  if (!this.sampleId) {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.random().toString(36).substr(2, 6).toUpperCase();
    this.sampleId = `SA${date}${random}`;
  }

  // Calculate texture class based on sand, silt, clay percentages
  if (
    this.physicalProperties?.texture?.sand &&
    this.physicalProperties?.texture?.silt &&
    this.physicalProperties?.texture?.clay
  ) {
    const { sand, silt, clay } = this.physicalProperties.texture;
    this.physicalProperties.texture.textureClass = calculateTextureClass(
      sand,
      silt,
      clay,
    );
  }

  // Set pH classification
  if (this.chemicalProperties?.pH?.value) {
    const ph = this.chemicalProperties.pH.value;
    if (ph < 4.5) this.chemicalProperties.pH.classification = "very_acidic";
    else if (ph < 5.5) this.chemicalProperties.pH.classification = "acidic";
    else if (ph < 6.5)
      this.chemicalProperties.pH.classification = "slightly_acidic";
    else if (ph < 7.5) this.chemicalProperties.pH.classification = "neutral";
    else if (ph < 8.5)
      this.chemicalProperties.pH.classification = "slightly_alkaline";
    else if (ph < 9.5) this.chemicalProperties.pH.classification = "alkaline";
    else this.chemicalProperties.pH.classification = "very_alkaline";
  }

  next();
});

// Static methods
soilAnalysisSchema.statics.findByUser = function (userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

soilAnalysisSchema.statics.findNearby = function (
  longitude,
  latitude,
  maxDistance = 10000,
) {
  return this.find({
    "location.coordinates": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
  });
};

soilAnalysisSchema.statics.getStatistics = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
        avgHealthScore: { $avg: "$healthScore" },
      },
    },
  ]);

  const totalAnalyses = await this.countDocuments();
  const activeAnalyses = await this.countDocuments({
    validUntil: { $gte: new Date() },
  });

  return {
    total: totalAnalyses,
    active: activeAnalyses,
    byStatus: stats,
  };
};

// Helper function to calculate texture class
function calculateTextureClass(sand, silt, clay) {
  // Simplified USDA texture triangle logic
  if (sand >= 85) return "sand";
  if (sand >= 70 && clay < 15) return "loamy_sand";
  if (clay >= 40) {
    if (sand >= 20) return "sandy_clay";
    if (silt >= 40) return "silty_clay";
    return "clay";
  }
  if (clay >= 27) {
    if (sand >= 20) return "sandy_clay_loam";
    if (silt >= 40) return "silty_clay_loam";
    return "clay_loam";
  }
  if (silt >= 80) return "silt";
  if (silt >= 50) return "silt_loam";
  if (sand >= 43) return "sandy_loam";
  return "loam";
}

const SoilAnalysis = mongoose.model("SoilAnalysis", soilAnalysisSchema);

export default SoilAnalysis;
