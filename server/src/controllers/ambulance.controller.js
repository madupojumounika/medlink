import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ambulanceService } from "../services/ambulance.service.js";

class AmbulanceController {
  getProfile = asyncHandler(async (req, res) => {
    const result = await ambulanceService.getAmbulanceProfile(req.user.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const result = await ambulanceService.updateAmbulanceProfile(req.user.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getStatus = asyncHandler(async (req, res) => {
    const result = await ambulanceService.getStatus(req.user.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateStatus = asyncHandler(async (req, res) => {
    const result = await ambulanceService.updateStatus(req.user.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getAssignments = asyncHandler(async (req, res) => {
    const result = await ambulanceService.getAssignments(req.user.id, req.query);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getAssignmentById = asyncHandler(async (req, res) => {
    const result = await ambulanceService.getAssignmentById(req.user.id, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  acceptAssignment = asyncHandler(async (req, res) => {
    const result = await ambulanceService.acceptAssignment(req.user.id, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  rejectAssignment = asyncHandler(async (req, res) => {
    const result = await ambulanceService.rejectAssignment(req.user.id, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  startTrip = asyncHandler(async (req, res) => {
    const result = await ambulanceService.startTrip(req.user.id, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  completeTrip = asyncHandler(async (req, res) => {
    const result = await ambulanceService.completeTrip(req.user.id, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getTrips = asyncHandler(async (req, res) => {
    const result = await ambulanceService.getTrips(req.user.id, req.query);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const ambulanceController = new AmbulanceController();
