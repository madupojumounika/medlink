import { doctorService } from "../services/doctor.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class DoctorController {
  getProfile = asyncHandler(async (req, res) => {
    const result = await doctorService.getDoctorProfile(req.user.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const result = await doctorService.updateDoctorProfile(req.user.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateDutyStatus = asyncHandler(async (req, res) => {
    const { onDuty } = req.body;
    const result = await doctorService.updateDutyStatus(req.user.id, onDuty);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  createPatient = asyncHandler(async (req, res) => {
    const result = await doctorService.createPatient(req.user.id, req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getPatients = asyncHandler(async (req, res) => {
    const result = await doctorService.getPatients(req.user.id, req.query);
    return apiResponse(res, 200, true, result.message, result.data, null, result.meta);
  });

  getPatientById = asyncHandler(async (req, res) => {
    const result = await doctorService.getPatientById(req.user.id, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updatePatient = asyncHandler(async (req, res) => {
    const result = await doctorService.updatePatient(req.user.id, req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  predictSeverity = asyncHandler(async (req, res) => {
    const result = await doctorService.predictSeverity(req.user.id, req.params.id, req.body.vitals);
    return apiResponse(res, 200, true, result.message, result.data);
  });


  getReferrals = asyncHandler(async (req, res) => {
    const result = await doctorService.getReferrals(req.user.id, req.query);
    return apiResponse(res, 200, true, result.message, result.data, null, result.meta);
  });

  getReferralById = asyncHandler(async (req, res) => {
    const result = await doctorService.getReferralById(req.user.id, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const doctorController = new DoctorController();
