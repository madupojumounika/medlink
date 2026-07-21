import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { hospitalResourceService } from "../services/hospitalResource.service.js";

class HospitalResourceController {
  createResource = asyncHandler(async (req, res) => {
    const result = await hospitalResourceService.createResource(req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getAllResources = asyncHandler(async (req, res) => {
    const result = await hospitalResourceService.getAllResources();
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getResourceById = asyncHandler(async (req, res) => {
    const result = await hospitalResourceService.getResourceById(req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateResource = asyncHandler(async (req, res) => {
    const result = await hospitalResourceService.updateResource(req.params.id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  deleteResource = asyncHandler(async (req, res) => {
    const result = await hospitalResourceService.deleteResource(req.params.id);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const hospitalResourceController = new HospitalResourceController();
