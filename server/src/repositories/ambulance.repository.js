import Referral from "../models/Referral.model.js";
import { ApiError } from "../utils/ApiError.js";

class AmbulanceRepository {
  async getAmbulanceProfile(ambulanceId) {
    throw new ApiError(501, "Not Implemented");
  }

  async updateAmbulanceProfile(ambulanceId, profileData) {
    throw new ApiError(501, "Not Implemented");
  }

  async getStatus(ambulanceId) {
    throw new ApiError(501, "Not Implemented");
  }

  async updateStatus(ambulanceId, statusData) {
    throw new ApiError(501, "Not Implemented");
  }

  async getAssignments(query, options) {
    const { sort, skip, limit } = options;
    const data = await Referral.find({ ...query, isActive: true })
      .populate("patientId", "name age gender")
      .populate("fromHospitalId", "hospitalName address")
      .populate("toHospitalId", "hospitalName address")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Referral.countDocuments({ ...query, isActive: true });
    return { data, total };
  }

  async getAssignmentById(ambulanceId, assignmentId) {
    throw new ApiError(501, "Not Implemented");
  }

  async acceptAssignment(ambulanceId, assignmentId, remarks) {
    throw new ApiError(501, "Not Implemented");
  }

  async rejectAssignment(ambulanceId, assignmentId, remarks) {
    throw new ApiError(501, "Not Implemented");
  }

  async startTrip(ambulanceId, assignmentId) {
    throw new ApiError(501, "Not Implemented");
  }

  async completeTrip(ambulanceId, assignmentId, remarks) {
    throw new ApiError(501, "Not Implemented");
  }

  async getTrips(ambulanceId, query) {
    throw new ApiError(501, "Not Implemented");
  }
}

export const ambulanceRepository = new AmbulanceRepository();
