import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hospitalService } from "../services/hospital.service.js";

class HospitalController {
  getProfile = asyncHandler(async (req, res) => {
    const result = await hospitalService.getHospitalProfile(req.user.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const result = await hospitalService.updateHospitalProfile(req.user.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getResources = asyncHandler(async (req, res) => {
    const result = await hospitalService.getResources(req.user.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateResources = asyncHandler(async (req, res) => {
    const result = await hospitalService.updateResources(req.user.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getReferrals = asyncHandler(async (req, res) => {
    const result = await hospitalService.getReferrals(req.user.id, req.query);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getReferralById = asyncHandler(async (req, res) => {
    const result = await hospitalService.getReferralById(req.user.id, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  acceptReferral = asyncHandler(async (req, res) => {
    const result = await hospitalService.acceptReferral(req.user.id, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  rejectReferral = asyncHandler(async (req, res) => {
    const result = await hospitalService.rejectReferral(req.user.id, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getDoctors = asyncHandler(async (req, res) => {
    const result = await hospitalService.getDoctors(req.user.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const hospitalController = new HospitalController();
