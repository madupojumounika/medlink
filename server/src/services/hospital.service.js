import { hospitalRepository } from "../repositories/hospital.repository.js";
import { ApiError } from "../utils/ApiError.js";

class HospitalService {
  async getHospitalProfile(hospitalId) {
    
    return { message: "Hospital profile retrieved successfully (Pending DB)", data: {} };
  }

  async updateHospitalProfile(hospitalId, profileData) {

    return { message: "Hospital profile updated successfully (Pending DB)", data: profileData };
  }

  async getResources(hospitalId) {
  
    return { message: "Hospital resources retrieved successfully (Pending DB)", data: {} };
  }

  async updateResources(hospitalId, resourcesData) {
   
    return { message: "Hospital resources updated successfully (Pending DB)", data: resourcesData };
  }

  async getReferrals(hospitalId, query) {

    return { message: "Referrals retrieved successfully (Pending DB)", data: [] };
  }

  async getReferralById(hospitalId, referralId) {
  
    return { message: "Referral retrieved successfully (Pending DB)", data: { id: referralId } };
  }

  async acceptReferral(hospitalId, referralId, remarks) {
 
    return { message: "Referral accepted successfully (Pending DB)", data: { id: referralId, remarks } };
  }

  async rejectReferral(hospitalId, referralId, remarks) {

    return { message: "Referral rejected successfully (Pending DB)", data: { id: referralId, remarks } };
  }

  async getDoctors(hospitalId) {
    return { message: "Doctors retrieved successfully (Pending DB)", data: [] };
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
}

export const hospitalService = new HospitalService();
