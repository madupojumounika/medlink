import { body, validationResult } from "express-validator";
import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = {};
    errors.array().forEach((err) => {
      extractedErrors[err.path] = err.msg;
    });
    return apiResponse(res, 400, false, "Validation failed", null, extractedErrors);
  }
  next();
};

export const registerValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
  body("role").isIn(["doctor", "hospital", "ambulance", "admin"]).withMessage("Invalid role specified"),

  body("fullName").if(body("role").equals("doctor")).notEmpty().withMessage("Full name is required"),
  body("phone").if(body("role").equals("doctor")).isLength({ min: 10 }).withMessage("Valid phone number is required"),
  body("licenseNumber").if(body("role").equals("doctor")).notEmpty().withMessage("License number is required"),
  body("specialization").if(body("role").equals("doctor")).notEmpty().withMessage("Specialization is required"),
  body("hospitalName").if(body("role").equals("doctor")).notEmpty().withMessage("Hospital name is required"),
  body("experience").if(body("role").equals("doctor")).notEmpty().withMessage("Years of experience is required"),

  body("hospitalName").if(body("role").equals("hospital")).notEmpty().withMessage("Hospital name is required"),
  body("registrationNumber").if(body("role").equals("hospital")).notEmpty().withMessage("Registration number is required"),
  body("adminName").if(body("role").equals("hospital")).notEmpty().withMessage("Administrator name is required"),
  body("phone").if(body("role").equals("hospital")).isLength({ min: 10 }).withMessage("Valid phone number is required"),
  body("address").if(body("role").equals("hospital")).notEmpty().withMessage("Full address is required"),
  body("icuBeds").if(body("role").equals("hospital")).notEmpty().withMessage("Number of ICU beds is required"),
  body("emergencyContact").if(body("role").equals("hospital")).isLength({ min: 10 }).withMessage("Emergency contact is required"),

  body("driverName").if(body("role").equals("ambulance")).notEmpty().withMessage("Driver name is required"),
  body("phone").if(body("role").equals("ambulance")).isLength({ min: 10 }).withMessage("Valid phone number is required"),
  body("licenseNumber").if(body("role").equals("ambulance")).notEmpty().withMessage("Driver license is required"),
  body("registrationNumber").if(body("role").equals("ambulance")).notEmpty().withMessage("Ambulance registration is required"),
  body("organization").if(body("role").equals("ambulance")).notEmpty().withMessage("Organization is required"),
  body("experience").if(body("role").equals("ambulance")).notEmpty().withMessage("Years of experience is required"),

  body("fullName").if(body("role").equals("admin")).notEmpty().withMessage("Full name is required"),
  body("phone").if(body("role").equals("admin")).isLength({ min: 10 }).withMessage("Valid phone number is required"),
  body("organization").if(body("role").equals("admin")).notEmpty().withMessage("Organization is required"),
  body("employeeId").if(body("role").equals("admin")).notEmpty().withMessage("Employee ID is required"),
  body("adminCode").if(body("role").equals("admin")).isLength({ min: 6 }).withMessage("Admin code is required"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
