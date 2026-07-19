import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import { apiResponse } from "../utils/apiResponse.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message = error.message || MESSAGES.SERVER_ERROR;
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const stack = env.NODE_ENV === "development" ? error.stack : null;

  if (error.statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR) {
    logger.error(
      `[Error] ${error.statusCode} - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    if (stack) logger.error(stack);
  } else {
    logger.warn(
      `[Error] ${error.statusCode} - ${error.message} - ${req.originalUrl}`,
    );
  }

  return apiResponse(res, error.statusCode, false, error.message, null, stack);
};
