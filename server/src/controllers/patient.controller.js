import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { patientService } from "../services/patient.service.js";

class PatientController {
  createPatient = asyncHandler(async (req, res) => {
    const result = await patientService.createPatient(req.user.hospitalId, req.user.id, req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getPatients = asyncHandler(async (req, res) => {
    // Only doctors should see only their own patients, or maybe we want admins to see all.
    // For now, if role is doctor, filter by doctor ID.
    const doctorId = req.user.role === "doctor" ? req.user.id : null;
    const result = await patientService.getPatients(req.user.hospitalId, doctorId, req.query);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getPatientById = asyncHandler(async (req, res) => {
    const result = await patientService.getPatientById(req.user.hospitalId, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updatePatient = asyncHandler(async (req, res) => {
    const result = await patientService.updatePatient(req.user.hospitalId, req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  deletePatient = asyncHandler(async (req, res) => {
    const result = await patientService.deletePatient(req.user.hospitalId, req.params.id, req.user.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  forwardToCoordinator = asyncHandler(async (req, res) => {
    const result = await patientService.forwardToCoordinator(req.user.hospitalId, req.user.id, req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const patientController = new PatientController();
