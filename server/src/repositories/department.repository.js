import Department from "../models/Department.model.js";

class DepartmentRepository {
  async createDepartment(departmentData) {
    const dept = new Department(departmentData);
    return await dept.save();
  }

  async getDepartments(hospitalId) {
    return await Department.find({ hospitalId, isActive: true })
      .populate("headOfDepartment", "fullName qualifications")
      .lean();
  }

  async getDepartmentById(id, hospitalId) {
    return await Department.findOne({ _id: id, hospitalId, isActive: true })
      .populate("headOfDepartment", "fullName qualifications")
      .lean();
  }

  async updateDepartment(id, hospitalId, updateData) {
    return await Department.findOneAndUpdate(
      { _id: id, hospitalId, isActive: true },
      updateData,
      { new: true, runValidators: true }
    );
  }

  async deleteDepartment(id, hospitalId) {
    return await Department.findOneAndUpdate(
      { _id: id, hospitalId, isActive: true },
      { isActive: false },
      { new: true }
    );
  }
}

export const departmentRepository = new DepartmentRepository();
