import { validationResult } from "express-validator";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { apiResponse } from "../utils/apiResponse.js";
import { logger } from "../utils/logger.js";


export const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = {};
    errors.array().forEach((err) => {
      extractedErrors[err.path] = err.msg;
    });

    logger.warn(`[Validation Failed] ${req.method} ${req.originalUrl}`);

    return apiResponse(
      res,
      STATUS_CODES.BAD_REQUEST,
      false,
      "Validation failed",
      null,
      extractedErrors,
    );
  };
};
