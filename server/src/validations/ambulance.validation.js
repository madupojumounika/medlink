import { body, param } from "express-validator";
export { validate } from "./auth.validation.js";

export const profileValidation = [
  body("ambulanceNumber").notEmpty().withMessage("Ambulance number is required"),
  body("driverName").notEmpty().withMessage("Driver name is required"),
  body("driverLicense").notEmpty().withMessage("Driver license is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("organization").notEmpty().withMessage("Organization is required"),
];

export const statusValidation = [
  body("availability").isIn(["Available", "Busy", "Offline"]).withMessage("Invalid availability status"),
  body("currentLocation").notEmpty().withMessage("Current location is required"),
  body("vehicleCondition").notEmpty().withMessage("Vehicle condition is required"),
];

export const assignmentActionValidation = [
  param("id").notEmpty().withMessage("Assignment ID is required"),
  body("remarks").optional().isString().withMessage("Remarks must be a string"),
  body("action").optional().isIn(["accept", "reject", "start", "complete"]).withMessage("Invalid action")
];
