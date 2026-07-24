import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hospitalService } from "../services/hospital.service.js";

class HospitalController {
  getProfile = asyncHandler(async (req, res) => {
    const result = await hospitalService.getHospitalProfile(req.user.hospitalId);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const result = await hospitalService.updateHospitalProfile(req.user.hospitalId, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getResources = asyncHandler(async (req, res) => {
    const result = await hospitalService.getResources(req.user.hospitalId);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateResources = asyncHandler(async (req, res) => {
    const result = await hospitalService.updateResources(req.user.hospitalId, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });
  
  createReferral = asyncHandler(async (req, res) => {
    const result = await hospitalService.createReferral(req.user.hospitalId, req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getReferrals = asyncHandler(async (req, res) => {
    const result = await hospitalService.getReferrals(req.user.hospitalId, req.query);
    return apiResponse(res, 200, true, result.message, result.data, null, result.meta);
  });

  getReferralById = asyncHandler(async (req, res) => {
    const result = await hospitalService.getReferralById(req.user.hospitalId, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  acceptReferral = asyncHandler(async (req, res) => {
    const result = await hospitalService.acceptReferral(req.user.hospitalId, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  rejectReferral = asyncHandler(async (req, res) => {
    const result = await hospitalService.rejectReferral(req.user.hospitalId, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  createEmployee = asyncHandler(async (req, res) => {
    const result = await hospitalService.createEmployee(req.user.hospitalId, req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getEmployees = asyncHandler(async (req, res) => {
    const result = await hospitalService.getEmployees(req.user.hospitalId, req.query);
    return apiResponse(res, 200, true, result.message, result.data, null, result.meta);
  });

  updateEmployeeStatus = asyncHandler(async (req, res) => {
    const result = await hospitalService.updateEmployeeStatus(req.user.hospitalId, req.params.id, req.body.isActive);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateEmployeeDetails = asyncHandler(async (req, res) => {
    const result = await hospitalService.updateEmployeeDetails(req.user.hospitalId, req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
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
  getStats = asyncHandler(async (req, res) => {
    const result = await hospitalService.getDashboardStats(req.user.hospitalId);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const hospitalController = new HospitalController();
