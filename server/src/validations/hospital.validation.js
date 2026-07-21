import { body, param } from "express-validator";
export { validate } from "./auth.validation.js";

export const profileValidation = [
  body("hospitalName").notEmpty().withMessage("Hospital name is required"),
  body("registrationNumber").notEmpty().withMessage("Registration number is required"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("emergencyContact").notEmpty().withMessage("Emergency contact is required"),
];

export const resourcesValidation = [
  body("totalBeds").isNumeric().withMessage("Total beds must be a number"),
  body("availableBeds").isNumeric().withMessage("Available beds must be a number"),
  body("icuBeds").isNumeric().withMessage("ICU beds must be a number"),
  body("availableIcuBeds").isNumeric().withMessage("Available ICU beds must be a number"),
  body("oxygenBeds").isNumeric().withMessage("Oxygen beds must be a number"),
  body("ventilators").isNumeric().withMessage("Ventilators must be a number"),
];

export const referralActionValidation = [
  param("id").notEmpty().withMessage("Referral ID is required"),
  body("remarks").optional().isString().withMessage("Remarks must be a string"),
  
  body("action").optional().isIn(["accept", "reject"]).withMessage("Action must be accept or reject")
];

export const referralCreationValidation = [
  body("patientId").notEmpty().withMessage("Patient ID is required"),
  body("doctorId").notEmpty().withMessage("Doctor ID is required"),
  body("toHospitalId").optional().isString(),
  body("severity").isIn(["Low", "Medium", "High", "Critical"]).withMessage("Valid severity is required"),
  body("priority").isIn(["Normal", "Urgent", "Critical"]).withMessage("Valid priority is required"),
  body("diagnosis").notEmpty().withMessage("Diagnosis is required"),
  body("notes").optional().isString(),
];
