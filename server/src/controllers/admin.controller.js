import adminService from '../services/admin.service.js';
import { apiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

class AdminController {
  getDashboard = asyncHandler(async (req, res) => {
    const result = await adminService.getDashboardOverview();
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getUsers = asyncHandler(async (req, res) => {
    const filters = req.query;
    const result = await adminService.getAllUsers(filters);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.getUserById(id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateUser(id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.deleteUser(id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getDoctors = asyncHandler(async (req, res) => {
    const filters = req.query;
    const result = await adminService.getAllDoctors(filters);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getDoctorById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.getDoctorById(id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateDoctor = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateDoctor(id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getHospitals = asyncHandler(async (req, res) => {
    const filters = req.query;
    const result = await adminService.getAllHospitals(filters);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getHospitalById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.getHospitalById(id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateHospital = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateHospital(id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getAmbulances = asyncHandler(async (req, res) => {
    const filters = req.query;
    const result = await adminService.getAllAmbulances(filters);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getAmbulanceById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.getAmbulanceById(id);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateAmbulance = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await adminService.updateAmbulance(id, req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getSettings = asyncHandler(async (req, res) => {
    const result = await adminService.getSettings();
    return apiResponse(res, 200, true, result.message, result.data);
  });

  updateSettings = asyncHandler(async (req, res) => {
    const result = await adminService.updateSettings(req.body);
    return apiResponse(res, 200, true, result.message, result.data);
  });

  getReports = asyncHandler(async (req, res) => {
    const { reportType, startDate, endDate } = req.query;
    const result = await adminService.getReports(reportType, startDate, endDate);
    return apiResponse(res, 200, true, result.message, result.data);
  });
}

export default new AdminController();
