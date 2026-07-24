import { Router } from "express";
import { patientController } from "../controllers/patient.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

// Protect all patient routes
router.use(authenticate);

// We allow doctor and hospital_admin (and possibly referral_coordinator in future) to view patients
router.use(authorize("doctor", "hospital_admin"));

router.post("/", patientController.createPatient);
router.get("/", patientController.getPatients);
router.get("/:id", patientController.getPatientById);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

// Action route for Doctor to forward referral
router.post("/:id/forward", authorize("doctor"), patientController.forwardToCoordinator);

export default router;
