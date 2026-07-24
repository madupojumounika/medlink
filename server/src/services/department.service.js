import { departmentRepository } from "../repositories/department.repository.js";
import { ApiError } from "../utils/ApiError.js";

class DepartmentService {
  async createDepartment(hospitalId, data) {
    try {
      const departmentData = { ...data, hospitalId };
      const dept = await departmentRepository.createDepartment(departmentData);
      return { message: "Department created successfully", data: dept };
    } catch (error) {
      if (error.code === 11000) {
        throw new ApiError(400, "Department with this name already exists in your hospital.");
      }
      throw error;
    }
  }

  async getDepartments(hospitalId) {
    const departments = await departmentRepository.getDepartments(hospitalId);
    return { message: "Departments retrieved successfully", data: departments };
  }

  async getDepartmentById(id, hospitalId) {
    const dept = await departmentRepository.getDepartmentById(id, hospitalId);
    if (!dept) throw new ApiError(404, "Department not found");
    return { message: "Department retrieved successfully", data: dept };
  }

  async updateDepartment(id, hospitalId, updateData) {
    const dept = await departmentRepository.updateDepartment(id, hospitalId, updateData);
    if (!dept) throw new ApiError(404, "Department not found");
    return { message: "Department updated successfully", data: dept };
  }

  async deleteDepartment(id, hospitalId) {
    const dept = await departmentRepository.deleteDepartment(id, hospitalId);
    if (!dept) throw new ApiError(404, "Department not found");
    return { message: "Department deleted successfully", data: dept };
  }
}

export const departmentService = new DepartmentService();
