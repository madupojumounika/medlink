import { Router } from "express";
import { hospitalController } from "../controllers/hospital.controller.js";
import {
  profileValidation,
  resourcesValidation,
  referralActionValidation,
  referralCreationValidation,
  validate
} from "../validations/hospital.validation.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

// Protect all hospital routes
router.use(authenticate, authorize("hospital_admin"));

// Profile
router.get("/profile", hospitalController.getProfile);
router.put("/profile", profileValidation, validate, hospitalController.updateProfile);

// Stats
router.get("/stats", hospitalController.getStats);

// Resources
router.get("/resources", hospitalController.getResources);
router.put("/resources", resourcesValidation, validate, hospitalController.updateResources);

// Employees (Staff)
router.post("/employees", hospitalController.createEmployee);
router.get("/employees", hospitalController.getEmployees);
router.patch("/employees/:id/status", hospitalController.updateEmployeeStatus);
router.put("/employees/:id/details", hospitalController.updateEmployeeDetails);

// Referrals
router.post("/referrals", referralCreationValidation, validate, hospitalController.createReferral);
router.get("/referrals", hospitalController.getReferrals);
router.get("/referrals/:id", hospitalController.getReferralById);

router.put(
  "/referrals/:id/accept",
  referralActionValidation,
  validate,
  hospitalController.acceptReferral
);
router.put(
  "/referrals/:id/reject",
  referralActionValidation,
  validate,
  hospitalController.rejectReferral
);

// Generic CRUD
router.post("/", hospitalController.createHospital);
router.get("/", hospitalController.getAllHospitals);
router.get("/:id", hospitalController.getHospitalById);
router.put("/:id", hospitalController.updateHospital);
router.delete("/:id", hospitalController.deleteHospital);

export default router;
