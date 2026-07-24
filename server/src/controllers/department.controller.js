import { departmentService } from "../services/department.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class DepartmentController {
  createDepartment = asyncHandler(async (req, res) => {
    const result = await departmentService.createDepartment(req.user.hospitalId, req.body);
    return apiResponse(res, 201, true, result.message, result.data);
  });

  getDepartments = asyncHandler(async (req, res) => {
    const result = await departmentService.getDepartments(req.user.hospitalId);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getDepartmentById = asyncHandler(async (req, res) => {
    const result = await departmentService.getDepartmentById(req.params.id, req.user.hospitalId);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateDepartment = asyncHandler(async (req, res) => {
    const result = await departmentService.updateDepartment(req.params.id, req.user.hospitalId, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  deleteDepartment = asyncHandler(async (req, res) => {
    const result = await departmentService.deleteDepartment(req.params.id, req.user.hospitalId);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export const departmentController = new DepartmentController();
