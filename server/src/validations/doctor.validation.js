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
  body("spo2").optional().isNumeric(),
];

export const vitalsValidation = [
  body("vitals.heartRate").isNumeric().withMessage("Heart rate is required and must be numeric")
    .custom(val => val >= 0 && val <= 300).withMessage("Heart rate must be between 0 and 300"),
  body("vitals.systolicBP").isNumeric().withMessage("Systolic BP is required and must be numeric")
    .custom(val => val >= 0 && val <= 300).withMessage("Systolic BP must be between 0 and 300"),
  body("vitals.diastolicBP").isNumeric().withMessage("Diastolic BP is required and must be numeric")
    .custom(val => val >= 0 && val <= 200).withMessage("Diastolic BP must be between 0 and 200"),
  body("vitals.spo2").isNumeric().withMessage("SpO2 is required and must be numeric")
    .custom(val => val >= 0 && val <= 100).withMessage("SpO2 must be between 0 and 100"),
  body("vitals.respiratoryRate").isNumeric().withMessage("Respiratory rate is required and must be numeric")
    .custom(val => val >= 0 && val <= 100).withMessage("Respiratory rate must be between 0 and 100"),
  body("vitals.temperature").isNumeric().withMessage("Temperature is required and must be numeric")
    .custom(val => val >= 20.0 && val <= 45.0).withMessage("Temperature must be between 20.0 and 45.0 C"),
];


export const profileUpdateValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("specialization").notEmpty().withMessage("Specialization is required"),
];
