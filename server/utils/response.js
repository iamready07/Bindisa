// Standard response format for success
export const createSuccessResponse = (message, data = null, meta = null) => {
  const response = {
    status: "success",
    message,
    timestamp: new Date().toISOString(),
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return response;
};

// Standard response format for errors
export const createErrorResponse = (message, details = null, debug = null) => {
  const response = {
    status: "error",
    message,
    timestamp: new Date().toISOString(),
  };

  if (details !== null) {
    response.details = details;
  }

  // Include debug info only in development
  if (debug !== null && process.env.NODE_ENV === "development") {
    response.debug = debug;
  }

  return response;
};

// Paginated response
export const createPaginatedResponse = (
  message,
  data,
  pagination,
  filters = null,
) => {
  const response = createSuccessResponse(message, data);

  response.meta = {
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      pages: Math.ceil(pagination.total / pagination.limit),
      hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
      hasPrev: pagination.page > 1,
    },
  };

  if (filters) {
    response.meta.filters = filters;
  }

  return response;
};

// Response for file operations
export const createFileResponse = (message, fileData) => {
  return createSuccessResponse(message, {
    file: {
      filename: fileData.filename,
      originalName: fileData.originalName,
      size: fileData.size,
      mimeType: fileData.mimeType,
      url: fileData.url,
      uploadedAt: new Date().toISOString(),
    },
  });
};

// Response for batch operations
export const createBatchResponse = (
  message,
  successful = [],
  failed = [],
  total = 0,
) => {
  return createSuccessResponse(message, {
    summary: {
      total,
      successful: successful.length,
      failed: failed.length,
      successRate: total > 0 ? (successful.length / total) * 100 : 0,
    },
    successful,
    failed,
  });
};

// Response for analytics/statistics
export const createAnalyticsResponse = (message, analytics, period = null) => {
  const response = createSuccessResponse(message, analytics);

  if (period) {
    response.meta = {
      period: {
        from: period.from,
        to: period.to,
        duration: period.duration,
      },
    };
  }

  return response;
};

// Helper to format validation errors
export const formatValidationErrors = (errors) => {
  if (Array.isArray(errors)) {
    return errors.map((error) => ({
      field: error.field || error.path,
      message: error.message,
      value: error.value,
    }));
  }

  if (errors.errors) {
    // Mongoose validation errors
    return Object.values(errors.errors).map((error) => ({
      field: error.path,
      message: error.message,
      value: error.value,
    }));
  }

  return [{ message: errors.message || "Validation failed" }];
};
