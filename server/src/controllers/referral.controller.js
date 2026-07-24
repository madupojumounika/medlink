import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { referralService } from "../services/referral.service.js";

class ReferralController {
  getInternalQueue = asyncHandler(async (req, res) => {
    const result = await referralService.getInternalQueue(req.user.hospitalId, req.query);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getHistory = asyncHandler(async (req, res) => {
    const result = await referralService.getHistory(req.user.hospitalId, req.query);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getReferralById = asyncHandler(async (req, res) => {
    const result = await referralService.getReferralById(req.user.hospitalId, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getRecommendations = asyncHandler(async (req, res) => {
    const result = await referralService.getRecommendations(req.user.hospitalId, req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  sendReferral = asyncHandler(async (req, res) => {
    const result = await referralService.sendReferral(req.user.hospitalId, req.user.id, req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  cancelReferral = asyncHandler(async (req, res) => {
    const result = await referralService.cancelReferral(req.user.hospitalId, req.user.id, req.params.id, req.body.remarks);
    return apiResponse(res, 200, true, result.message, result.data);
  });
  async getIncomingReferrals(req, res) {
    const response = await referralService.getIncomingReferrals(req.user.hospitalId, req.query);
    res.status(200).json(response);
  }

  async acceptReferral(req, res) {
    const { id } = req.params;
    const { remarks } = req.body;
    const response = await referralService.acceptReferral(req.user.hospitalId, req.user._id, id, remarks);
    res.status(200).json(response);
  }

  async rejectReferral(req, res) {
    const { id } = req.params;
    const { remarks } = req.body;
    const response = await referralService.rejectReferral(req.user.hospitalId, req.user._id, id, remarks);
    res.status(200).json(response);
  }
}

export const referralController = new ReferralController();
