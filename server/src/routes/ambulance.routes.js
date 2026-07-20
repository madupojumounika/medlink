import { Router } from "express";
import { ambulanceController } from "../controllers/ambulance.controller.js";
import {
  profileValidation,
  statusValidation,
  assignmentActionValidation,
  validate
} from "../validations/ambulance.validation.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

// Protect all ambulance routes
router.use(authenticate, authorize("ambulance"));

// Profile
router.get("/profile", ambulanceController.getProfile);
router.put("/profile", profileValidation, validate, ambulanceController.updateProfile);

// Status
router.get("/status", ambulanceController.getStatus);
router.put("/status", statusValidation, validate, ambulanceController.updateStatus);

// Assignments
router.get("/assignments", ambulanceController.getAssignments);
router.get("/assignments/:id", ambulanceController.getAssignmentById);

router.put(
  "/assignments/:id/accept",
  assignmentActionValidation,
  validate,
  ambulanceController.acceptAssignment
);
router.put(
  "/assignments/:id/reject",
  assignmentActionValidation,
  validate,
  ambulanceController.rejectAssignment
);
router.put(
  "/assignments/:id/start",
  assignmentActionValidation,
  validate,
  ambulanceController.startTrip
);
router.put(
  "/assignments/:id/complete",
  assignmentActionValidation,
  validate,
  ambulanceController.completeTrip
);

// Trips
router.get("/trips", ambulanceController.getTrips);

export default router;
