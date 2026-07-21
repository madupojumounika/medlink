import { Router } from "express";
import { patientController } from "../controllers/patient.controller.js";

const router = Router();

router.post("/", patientController.createPatient);
router.get("/", patientController.getAllPatients);
router.get("/:id", patientController.getPatientById);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

export default router;
