import { Router } from "express";
import { doctorController } from "../controllers/doctor.controller.js";
import {
  patientValidation,
  profileUpdateValidation,
  validate
} from "../validations/doctor.validation.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.use(authenticate, authorize("doctor"));

router.get("/profile", doctorController.getProfile);
router.put("/profile", profileUpdateValidation, validate, doctorController.updateProfile);

router.post("/patients", patientValidation, validate, doctorController.createPatient);
router.get("/patients", doctorController.getPatients);
router.get("/patients/:id", doctorController.getPatientById);
router.put("/patients/:id", patientValidation, validate, doctorController.updatePatient);


router.get("/referrals", doctorController.getReferrals);
router.get("/referrals/:id", doctorController.getReferralById);

export default router;
