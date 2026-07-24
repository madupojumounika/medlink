import mongoose from "mongoose";
import { hospitalRepository } from "../repositories/hospital.repository.js";
import { patientRepository } from "../repositories/patient.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { REFERRAL_STATUS } from "../constants/referral.js";

const getPaginationOptions = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const sort = query.sort ? { [query.sort]: query.order === "desc" ? -1 : 1 } : { createdAt: -1 };
  return { page, limit, skip, sort };
};

class HospitalService {
  async getHospitalProfile(hospitalId) {
    const profile = await hospitalRepository.getHospitalProfile(hospitalId);
    if (!profile) throw new ApiError(404, "Hospital profile not found");
    return { message: "Hospital profile retrieved successfully", data: profile };
  }

  async updateHospitalProfile(hospitalId, profileData) {
    const profile = await hospitalRepository.updateHospitalProfile(hospitalId, profileData);
    if (!profile) throw new ApiError(404, "Hospital profile not found");
    return { message: "Hospital profile updated successfully", data: profile };
  }

  async getResources(hospitalId) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");
    
    const resources = await hospitalRepository.getResources(hospital._id);
    return { message: "Hospital resources retrieved successfully", data: resources || {} };
  }

  async updateResources(hospitalId, resourcesData) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    const resources = await hospitalRepository.updateResources(hospital._id, resourcesData);
    return { message: "Hospital resources updated successfully", data: resources };
  }

  async createReferral(hospitalId, referralData) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    const activeReferrals = await hospitalRepository.getReferrals({
      patientId: referralData.patientId,
      status: { $in: [REFERRAL_STATUS.PENDING, REFERRAL_STATUS.ACCEPTED, REFERRAL_STATUS.IN_TRANSIT] }
    }, { limit: 1, skip: 0, sort: { createdAt: -1 } });

    if (activeReferrals.total > 0) {
      throw new ApiError(400, "Patient already has an active referral");
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const referral = await hospitalRepository.createReferral({
        ...referralData,
        fromHospitalId: hospital._id
      }, session);

      await patientRepository.updatePatient(referralData.patientId, { needsReferral: false });
      
      await session.commitTransaction();
      return { message: "Referral created successfully", data: referral };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getReferrals(hospitalId, queryParams) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    const options = getPaginationOptions(queryParams);
    const query = {};

    if (queryParams.type === 'incoming') {
      query.toHospitalId = hospital._id;
    } else if (queryParams.type === 'outgoing') {
      query.fromHospitalId = hospital._id;
    } else {
      query.$or = [{ toHospitalId: hospital._id }, { fromHospitalId: hospital._id }];
    }

    if (queryParams.status) {
      query.status = queryParams.status;
    }

    const { data, total } = await hospitalRepository.getReferrals(query, options);
    return { 
      message: "Referrals retrieved successfully", 
      data,
      meta: { total, page: options.page, limit: options.limit }
    };
  }

  async getReferralById(hospitalId, referralId) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    const referral = await hospitalRepository.getReferralById(referralId);
    if (!referral) throw new ApiError(404, "Referral not found");

    const isAuthorized = 
      (referral.fromHospitalId?._id || referral.fromHospitalId).toString() === hospital._id.toString() ||
      (referral.toHospitalId?._id || referral.toHospitalId)?.toString() === hospital._id.toString();
      
    if (!isAuthorized) {
      throw new ApiError(403, "Not authorized to access this referral");
    }

    return { message: "Referral retrieved successfully", data: referral };
  }

  async acceptReferral(hospitalId, referralId, remarks) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    const referral = await hospitalRepository.getReferralById(referralId);
    if (!referral) throw new ApiError(404, "Referral not found");

    if ((referral.toHospitalId?._id || referral.toHospitalId)?.toString() !== hospital._id.toString()) {
      throw new ApiError(403, "Not authorized to accept this referral");
    }

    if (referral.status !== REFERRAL_STATUS.PENDING) {
      throw new ApiError(400, `Cannot accept a referral that is in ${referral.status} state`);
    }

    const updatedReferral = await hospitalRepository.updateReferralStatus(referralId, {
      status: REFERRAL_STATUS.ACCEPTED,
      remarks,
      acceptedAt: new Date()
    });

    return { message: "Referral accepted successfully", data: updatedReferral };
  }

  async rejectReferral(hospitalId, referralId, remarks) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    const referral = await hospitalRepository.getReferralById(referralId);
    if (!referral) throw new ApiError(404, "Referral not found");

    if ((referral.toHospitalId?._id || referral.toHospitalId)?.toString() !== hospital._id.toString()) {
      throw new ApiError(403, "Not authorized to reject this referral");
    }

    if (referral.status !== REFERRAL_STATUS.PENDING) {
      throw new ApiError(400, `Cannot reject a referral that is in ${referral.status} state`);
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const updatedReferral = await hospitalRepository.updateReferralStatus(referralId, {
        status: REFERRAL_STATUS.REJECTED,
        remarks,
      }, session);

      await patientRepository.updatePatient(referral.patientId, { needsReferral: true });

      await session.commitTransaction();
      return { message: "Referral rejected successfully", data: updatedReferral };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async createEmployee(hospitalId, employeeData) {
    const { authRepository } = await import("../repositories/auth.repository.js");
    const { createProfile } = await import("../utils/profile.factory.js");
    const { hashPassword } = await import("../utils/password.js");
    
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const existingUser = await authRepository.findUserByEmail(employeeData.email);
      if (existingUser) {
        throw new ApiError(400, "Email already in use");
      }

      const hashedPassword = await hashPassword(employeeData.password);

      const userForDB = {
        fullName: employeeData.fullName,
        email: employeeData.email,
        password: hashedPassword,
        role: employeeData.role, // e.g. "doctor", "referral_coordinator"
        hospitalId: hospitalId
      };

      const createdUser = await authRepository.createUser(userForDB, session);
      await createProfile(createdUser, session);

      await session.commitTransaction();
      
      const { password, ...userWithoutPassword } = createdUser.toObject ? createdUser.toObject() : createdUser;
      return { message: "Employee created successfully", data: userWithoutPassword };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async getEmployees(hospitalId, queryParams = {}) {
    const options = getPaginationOptions(queryParams);
    const query = { hospitalId: hospitalId };

    if (queryParams.role) {
      query.role = queryParams.role;
    }

    if (queryParams.search) {
      query.fullName = { $regex: queryParams.search, $options: "i" };
    }

    const { data, total } = await hospitalRepository.getEmployees(query, options);
    return { 
      message: "Employees retrieved successfully", 
      data,
      meta: { total, page: options.page, limit: options.limit }
    };
  }

  async updateEmployeeStatus(hospitalId, employeeId, isActive) {
    // We could verify the employee belongs to the hospital here
    const updatedEmployee = await hospitalRepository.updateEmployeeStatus(employeeId, isActive);
    if (!updatedEmployee) {
      throw new ApiError(404, "Employee not found");
    }
    return { message: "Employee status updated successfully", data: updatedEmployee };
  }

  async updateEmployeeDetails(hospitalId, employeeId, details) {
    const { authRepository } = await import("../repositories/auth.repository.js");
    const user = await authRepository.findUserById(employeeId);
    if (!user || user.hospitalId?.toString() !== hospitalId.toString()) {
      throw new ApiError(404, "Employee not found in your hospital");
    }

    const updatedProfile = await hospitalRepository.updateEmployeeProfile(employeeId, user.role, details);
    return { message: "Employee details updated successfully", data: updatedProfile };
  }

  async createHospital(hospitalData) {
    const hospital = await hospitalRepository.createHospital(hospitalData);
    return { message: "Hospital created successfully", data: hospital };
  }

  async getAllHospitals() {
    const hospitals = await hospitalRepository.getAllHospitals();
    return { message: "Hospitals retrieved successfully", data: hospitals };
  }

  async getHospitalById(id) {
    const hospital = await hospitalRepository.getHospitalById(id);
    if (!hospital) {
      throw new ApiError(404, "Hospital not found");
    }
    return { message: "Hospital retrieved successfully", data: hospital };
  }

  async updateHospital(id, updateData) {
    const hospital = await hospitalRepository.updateHospital(id, updateData);
    if (!hospital) {
      throw new ApiError(404, "Hospital not found");
    }
    return { message: "Hospital updated successfully", data: hospital };
  }

  async deleteHospital(id) {
    const hospital = await hospitalRepository.deleteHospital(id);
    if (!hospital) {
      throw new ApiError(404, "Hospital not found");
    }
    return { message: "Hospital deleted successfully", data: hospital };
  }

  async getDashboardStats(hospitalId) {
    const hospital = await hospitalRepository.getHospitalById(hospitalId);
    if (!hospital) throw new ApiError(404, "Hospital not found");

    // Get Resources for ICU Beds
    const resources = await hospitalRepository.getResources(hospitalId);
    const availableICUBeds = resources ? resources.availableICUBeds : 0;
    const totalICUBeds = resources ? resources.totalICUBeds : 0;

    // Get Active Doctors
    const { total: activeDoctorsCount } = await hospitalRepository.getEmployees({
      hospitalId,
      role: "doctor",
      isActive: true
    }, { limit: 1 });

    // Get Active Coordinators
    const { total: activeCoordinatorsCount } = await hospitalRepository.getEmployees({
      hospitalId,
      role: "referral_coordinator",
      isActive: true
    }, { limit: 1 });

    // Get Incoming Referrals awaiting review
    const { total: incomingReferralsCount, data: activeEmergencies } = await hospitalRepository.getReferrals({
      toHospitalId: hospitalId,
      status: REFERRAL_STATUS.SENT_TO_HOSPITAL
    }, { limit: 5, sort: { createdAt: -1 } });

    return {
      message: "Dashboard stats retrieved successfully",
      data: {
        availableICUBeds,
        totalICUBeds,
        activeDoctorsCount,
        activeCoordinatorsCount,
        incomingReferralsCount,
        avgTriageTime: "4.2m", // Placeholder for future complex aggregation
        activeEmergencies
      }
    };
  }
}

export const hospitalService = new HospitalService();
