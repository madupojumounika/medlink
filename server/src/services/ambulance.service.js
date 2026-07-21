import { ambulanceRepository } from "../repositories/ambulance.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { REFERRAL_STATUS } from "../constants/referral.js";

const getPaginationOptions = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const sort = query.sort ? { [query.sort]: query.order === "desc" ? -1 : 1 } : { createdAt: -1 };
  return { page, limit, skip, sort };
};

class AmbulanceService {
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

  async getAssignments(ambulanceId, queryParams = {}) {
    const options = getPaginationOptions(queryParams);
    const query = { status: REFERRAL_STATUS.ACCEPTED };

    const { data, total } = await ambulanceRepository.getAssignments(query, options);
    return { 
      message: "Assignments retrieved successfully", 
      data,
      meta: { total, page: options.page, limit: options.limit }
    };
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

export const ambulanceService = new AmbulanceService();
