import { body } from "express-validator";
export { validate } from "./auth.validation.js";

export const patientValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("dob").notEmpty().withMessage("Date of birth is required"),
  body("gender").isIn(["Male", "Female", "Other"]).withMessage("Valid gender is required"),
  body("symptoms").optional(),
  body("heartRate").optional().isNumeric(),
  body("bloodPressure").optional(),
  body("spo2").optional().isNumeric(),
];



export const profileUpdateValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("specialization").notEmpty().withMessage("Specialization is required"),
];
