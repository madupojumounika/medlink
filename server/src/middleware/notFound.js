import { STATUS_CODES } from "../constants/statusCodes.js";
import { apiResponse } from "../utils/apiResponse.js";

export const notFound = (req, res, next) => {
  return apiResponse(
    res,
    STATUS_CODES.NOT_FOUND,
    false,
    `Cannot find ${req.method} ${req.originalUrl} on this server.`,
  );
};
