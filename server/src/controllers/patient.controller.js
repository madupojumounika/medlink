import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { patientService } from "../services/patient.service.js";

class PatientController {
  createPatient = asyncHandler(async (req, res) => {
    const result = await patientService.createPatient(req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getAllPatients = asyncHandler(async (req, res) => {
    const result = await patientService.getAllPatients(req.query);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getPatientById = asyncHandler(async (req, res) => {
    const result = await patientService.getPatientById(req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updatePatient = asyncHandler(async (req, res) => {
    const result = await patientService.updatePatient(req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  deletePatient = asyncHandler(async (req, res) => {
    const result = await patientService.deletePatient(req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const patientController = new PatientController();
