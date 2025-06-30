import validator from "validator";

// Simple validation utility
export const validateInput = (fields) => {
  const errors = [];

  Object.entries(fields).forEach(([fieldName, config]) => {
    const { value, rules, default: defaultValue } = config;
    const actualValue = value !== undefined ? value : defaultValue;

    if (rules) {
      rules.forEach((rule) => {
        const error = validateField(fieldName, actualValue, rule);
        if (error) {
          errors.push(error);
        }
      });
    }
  });

  return errors;
};

const validateField = (fieldName, value, rule) => {
  if (typeof rule === "string") {
    return validateSingleRule(fieldName, value, rule);
  }

  if (typeof rule === "object") {
    return validateComplexRule(fieldName, value, rule);
  }

  return null;
};

const validateSingleRule = (fieldName, value, rule) => {
  const [ruleName, ruleValue] = rule.split(":");

  switch (ruleName) {
    case "required":
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return {
          field: fieldName,
          message: `${fieldName} is required`,
          rule: "required",
        };
      }
      break;

    case "string":
      if (value && typeof value !== "string") {
        return {
          field: fieldName,
          message: `${fieldName} must be a string`,
          rule: "string",
        };
      }
      break;

    case "number":
      if (
        value &&
        typeof value !== "number" &&
        !Number.isFinite(Number(value))
      ) {
        return {
          field: fieldName,
          message: `${fieldName} must be a number`,
          rule: "number",
        };
      }
      break;

    case "email":
      if (value && !validator.isEmail(value)) {
        return {
          field: fieldName,
          message: `${fieldName} must be a valid email address`,
          rule: "email",
        };
      }
      break;

    case "min":
      const minLength = parseInt(ruleValue);
      if (value && value.length < minLength) {
        return {
          field: fieldName,
          message: `${fieldName} must be at least ${minLength} characters long`,
          rule: "min",
          value: minLength,
        };
      }
      break;

    case "max":
      const maxLength = parseInt(ruleValue);
      if (value && value.length > maxLength) {
        return {
          field: fieldName,
          message: `${fieldName} cannot exceed ${maxLength} characters`,
          rule: "max",
          value: maxLength,
        };
      }
      break;

    case "minValue":
      const minValue = parseFloat(ruleValue);
      if (value && parseFloat(value) < minValue) {
        return {
          field: fieldName,
          message: `${fieldName} must be at least ${minValue}`,
          rule: "minValue",
          value: minValue,
        };
      }
      break;

    case "maxValue":
      const maxValue = parseFloat(ruleValue);
      if (value && parseFloat(value) > maxValue) {
        return {
          field: fieldName,
          message: `${fieldName} cannot exceed ${maxValue}`,
          rule: "maxValue",
          value: maxValue,
        };
      }
      break;

    case "in":
      const allowedValues = ruleValue.split(",");
      if (value && !allowedValues.includes(value)) {
        return {
          field: fieldName,
          message: `${fieldName} must be one of: ${allowedValues.join(", ")}`,
          rule: "in",
          allowedValues,
        };
      }
      break;

    case "phone":
      if (value && !validator.isMobilePhone(value, "en-IN")) {
        return {
          field: fieldName,
          message: `${fieldName} must be a valid phone number`,
          rule: "phone",
        };
      }
      break;

    case "url":
      if (value && !validator.isURL(value)) {
        return {
          field: fieldName,
          message: `${fieldName} must be a valid URL`,
          rule: "url",
        };
      }
      break;

    case "date":
      if (value && !validator.isDate(value)) {
        return {
          field: fieldName,
          message: `${fieldName} must be a valid date`,
          rule: "date",
        };
      }
      break;

    case "alphanumeric":
      if (value && !validator.isAlphanumeric(value)) {
        return {
          field: fieldName,
          message: `${fieldName} must contain only letters and numbers`,
          rule: "alphanumeric",
        };
      }
      break;

    case "alpha":
      if (value && !validator.isAlpha(value)) {
        return {
          field: fieldName,
          message: `${fieldName} must contain only letters`,
          rule: "alpha",
        };
      }
      break;

    case "numeric":
      if (value && !validator.isNumeric(value.toString())) {
        return {
          field: fieldName,
          message: `${fieldName} must be numeric`,
          rule: "numeric",
        };
      }
      break;

    case "boolean":
      if (value !== undefined && typeof value !== "boolean") {
        return {
          field: fieldName,
          message: `${fieldName} must be a boolean`,
          rule: "boolean",
        };
      }
      break;

    case "array":
      if (value && !Array.isArray(value)) {
        return {
          field: fieldName,
          message: `${fieldName} must be an array`,
          rule: "array",
        };
      }
      break;

    case "object":
      if (value && (typeof value !== "object" || Array.isArray(value))) {
        return {
          field: fieldName,
          message: `${fieldName} must be an object`,
          rule: "object",
        };
      }
      break;

    default:
      console.warn(`Unknown validation rule: ${ruleName}`);
      break;
  }

  return null;
};

const validateComplexRule = (fieldName, value, rule) => {
  // Handle complex validation rules
  if (rule.custom && typeof rule.custom === "function") {
    const result = rule.custom(value);
    if (result !== true) {
      return {
        field: fieldName,
        message: result || `${fieldName} is invalid`,
        rule: "custom",
      };
    }
  }

  if (rule.regex) {
    if (value && !rule.regex.test(value)) {
      return {
        field: fieldName,
        message: rule.message || `${fieldName} format is invalid`,
        rule: "regex",
      };
    }
  }

  return null;
};

// Specific validators for agriculture domain
export const validateCoordinates = (coordinates) => {
  if (!Array.isArray(coordinates) || coordinates.length !== 2) {
    return "Coordinates must be an array of [longitude, latitude]";
  }

  const [longitude, latitude] = coordinates;

  if (typeof longitude !== "number" || typeof latitude !== "number") {
    return "Coordinates must be numbers";
  }

  if (longitude < -180 || longitude > 180) {
    return "Longitude must be between -180 and 180";
  }

  if (latitude < -90 || latitude > 90) {
    return "Latitude must be between -90 and 90";
  }

  return true;
};

export const validateFarmSize = (farmSize) => {
  if (!farmSize || typeof farmSize !== "object") {
    return "Farm size must be an object with value and unit";
  }

  if (
    !farmSize.value ||
    typeof farmSize.value !== "number" ||
    farmSize.value <= 0
  ) {
    return "Farm size value must be a positive number";
  }

  const validUnits = ["acres", "hectares", "square_meters"];
  if (!farmSize.unit || !validUnits.includes(farmSize.unit)) {
    return `Farm size unit must be one of: ${validUnits.join(", ")}`;
  }

  return true;
};

export const validateSoilData = (soilData) => {
  const errors = [];

  // Validate pH
  if (soilData.pH !== undefined) {
    if (
      typeof soilData.pH !== "number" ||
      soilData.pH < 0 ||
      soilData.pH > 14
    ) {
      errors.push("pH must be a number between 0 and 14");
    }
  }

  // Validate texture percentages
  if (soilData.texture) {
    const { sand, silt, clay } = soilData.texture;
    const total = (sand || 0) + (silt || 0) + (clay || 0);

    if (Math.abs(total - 100) > 0.1) {
      errors.push("Sand, silt, and clay percentages must add up to 100");
    }

    if (sand !== undefined && (sand < 0 || sand > 100)) {
      errors.push("Sand percentage must be between 0 and 100");
    }

    if (silt !== undefined && (silt < 0 || silt > 100)) {
      errors.push("Silt percentage must be between 0 and 100");
    }

    if (clay !== undefined && (clay < 0 || clay > 100)) {
      errors.push("Clay percentage must be between 0 and 100");
    }
  }

  // Validate nutrient values
  if (soilData.nutrients) {
    Object.entries(soilData.nutrients).forEach(([nutrient, value]) => {
      if (value !== undefined && (typeof value !== "number" || value < 0)) {
        errors.push(`${nutrient} value must be a non-negative number`);
      }
    });
  }

  return errors.length > 0 ? errors : true;
};

export const validateCropData = (cropData) => {
  const errors = [];

  if (!cropData.name || typeof cropData.name !== "string") {
    errors.push("Crop name is required and must be a string");
  }

  const validSeasons = ["kharif", "rabi", "summer", "perennial"];
  if (cropData.season && !validSeasons.includes(cropData.season)) {
    errors.push(`Season must be one of: ${validSeasons.join(", ")}`);
  }

  return errors.length > 0 ? errors : true;
};

// Sanitization functions
export const sanitizeInput = (input) => {
  if (typeof input === "string") {
    return validator.escape(input.trim());
  }
  return input;
};

export const sanitizeObject = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  const sanitized = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (typeof value === "object" && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  });

  return sanitized;
};
