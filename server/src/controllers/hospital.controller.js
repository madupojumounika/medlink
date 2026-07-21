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
  createReferral = asyncHandler(async (req, res) => {
    const result = await hospitalService.createReferral(req.user.id, req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });


  getReferrals = asyncHandler(async (req, res) => {
    const result = await hospitalService.getReferrals(req.user.id, req.query);
    return apiResponse(res, 200, true, result.message, result.data, null, result.meta);
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
    const result = await hospitalService.getDoctors(req.user.id, req.query);
    return apiResponse(res, 200, true, result.message, result.data, null, result.meta);
  });

  // Generic CRUD
  createHospital = asyncHandler(async (req, res) => {
    const result = await hospitalService.createHospital(req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getAllHospitals = asyncHandler(async (req, res) => {
    const result = await hospitalService.getAllHospitals();
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getHospitalById = asyncHandler(async (req, res) => {
    const result = await hospitalService.getHospitalById(req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateHospital = asyncHandler(async (req, res) => {
    const result = await hospitalService.updateHospital(req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  deleteHospital = asyncHandler(async (req, res) => {
    const result = await hospitalService.deleteHospital(req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}


export const hospitalController = new HospitalController();
