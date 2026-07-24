import { ambulanceRepository } from "../repositories/ambulance.repository.js";
import Referral from "../models/Referral.model.js";
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
    const referral = await Referral.findOne({ _id: assignmentId, assignedAmbulance: ambulanceId })
      .populate("patientId")
      .populate("fromHospitalId")
      .populate("toHospitalId");
    if (!referral) throw new ApiError(404, "Assignment not found");
    return { message: "Assignment retrieved successfully", data: referral };
  }

  async acceptAssignment(ambulanceId, assignmentId, remarks) {
    const referral = await Referral.findOneAndUpdate(
      { _id: assignmentId, assignedAmbulance: ambulanceId, ambulanceStatus: "ASSIGNED" },
      { ambulanceStatus: "EN_ROUTE", dispatchTime: new Date() },
      { new: true }
    );
    if (!referral) throw new ApiError(400, "Cannot accept this assignment");
    return { message: "Assignment accepted, en route", data: referral };
  }

  async rejectAssignment(ambulanceId, assignmentId, remarks) {
    const User = (await import("../models/User.model.js")).default;
    // Unassign the ambulance so another can take it
    const referral = await Referral.findOneAndUpdate(
      { _id: assignmentId, assignedAmbulance: ambulanceId, ambulanceStatus: "ASSIGNED" },
      { $unset: { assignedAmbulance: 1 }, ambulanceStatus: "AVAILABLE" },
      { new: true }
    );
    if (!referral) throw new ApiError(400, "Cannot reject this assignment");
    
    // Free the ambulance
    await User.findByIdAndUpdate(ambulanceId, { isAvailable: true });
    
    return { message: "Assignment rejected", data: referral };
  }

  async startTrip(ambulanceId, assignmentId) {
    const referral = await Referral.findOneAndUpdate(
      { _id: assignmentId, assignedAmbulance: ambulanceId, ambulanceStatus: "EN_ROUTE" },
      { ambulanceStatus: "TRANSPORTING", arrivalTime: new Date() },
      { new: true }
    );
    if (!referral) throw new ApiError(400, "Cannot start trip from current status");
    return { message: "Patient picked up, transporting", data: referral };
  }

  async completeTrip(ambulanceId, assignmentId, remarks) {
    const User = (await import("../models/User.model.js")).default;
    const referral = await Referral.findOneAndUpdate(
      { _id: assignmentId, assignedAmbulance: ambulanceId, ambulanceStatus: "TRANSPORTING" },
      { ambulanceStatus: "COMPLETED", status: REFERRAL_STATUS.IN_TRANSIT }, // Keep referral logic intact
      { new: true }
    );
    if (!referral) throw new ApiError(400, "Cannot complete trip from current status");
    
    // Free the ambulance
    await User.findByIdAndUpdate(ambulanceId, { isAvailable: true });
    
    return { message: "Trip completed", data: referral };
  }

  async getTrips(ambulanceId, query) {
    const options = getPaginationOptions(query);
    const filters = { assignedAmbulance: ambulanceId, ambulanceStatus: "COMPLETED" };
    return await ambulanceRepository.getAssignments(filters, options);
  }

  async findAvailableAmbulance(hospitalId) {
    const User = (await import("../models/User.model.js")).default;
    
    // Atomically find an available ambulance and mark it as busy (isAvailable: false)
    const ambulance = await User.findOneAndUpdate(
      { role: "ambulance", hospitalId, isActive: true, isAvailable: true },
      { isAvailable: false },
      { new: true }
    ).lean();
    
    return ambulance || null;
  }
}

export const ambulanceService = new AmbulanceService();
