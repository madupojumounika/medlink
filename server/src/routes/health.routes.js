import { Router } from "express";
import { env } from "../config/env.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "MedLink AI Backend Running",
    version: "v1",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
