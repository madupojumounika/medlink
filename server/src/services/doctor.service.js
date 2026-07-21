import { doctorRepository } from "../repositories/doctor.repository.js";
import { ApiError } from "../utils/ApiError.js";

const getPaginationOptions = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const sort = query.sort ? { [query.sort]: query.order === "desc" ? -1 : 1 } : { createdAt: -1 };
  return { page, limit, skip, sort };
};

class DoctorService {
  async getDoctorProfile(userId) {
    const profile = await doctorRepository.getDoctorProfileByUserId(userId);
    if (!profile) throw new ApiError(404, "Doctor profile not found");
    return { message: "Profile retrieved successfully", data: profile };
  }

  async updateDoctorProfile(userId, updateData) {
    const profile = await doctorRepository.updateDoctorProfile(userId, updateData);
    if (!profile) throw new ApiError(404, "Doctor profile not found");
    return { message: "Profile updated successfully", data: profile };
  }

  async createPatient(userId, patientData) {
    const doctorProfile = await doctorRepository.getDoctorProfileByUserId(userId);
    if (!doctorProfile) throw new ApiError(404, "Doctor profile not found");

    const newPatientData = {
      ...patientData,
      createdByDoctorId: doctorProfile._id,
      currentHospitalId: doctorProfile.hospitalId?._id || doctorProfile.hospitalId,
    };
    const patient = await doctorRepository.createPatient(newPatientData);
    return { message: "Patient created successfully", data: patient };
  }

  async getPatients(userId, queryParams = {}) {
    const doctorProfile = await doctorRepository.getDoctorProfileByUserId(userId);
    if (!doctorProfile) throw new ApiError(404, "Doctor profile not found");

    const options = getPaginationOptions(queryParams);
    const query = { createdByDoctorId: doctorProfile._id };

    if (queryParams.search) {
      query.name = { $regex: queryParams.search, $options: "i" };
    }
    if (queryParams.needsReferral) {
      query.needsReferral = queryParams.needsReferral === 'true';
    }

    const { data, total } = await doctorRepository.getPatients(query, options);
    return { 
      message: "Patients retrieved successfully", 
      data,
      meta: { total, page: options.page, limit: options.limit }
    };
  }

  async getPatientById(userId, patientId) {
    const patient = await doctorRepository.getPatientById(patientId);
    if (!patient) throw new ApiError(404, "Patient not found");
    
    const doctorProfile = await doctorRepository.getDoctorProfileByUserId(userId);
    if (patient.createdByDoctorId.toString() !== doctorProfile._id.toString()) {
      throw new ApiError(403, "Not authorized to access this patient");
    }

    return { message: "Patient retrieved successfully", data: patient };
  }

  async updatePatient(userId, patientId, updateData) {
    const patient = await doctorRepository.getPatientById(patientId);
    if (!patient) throw new ApiError(404, "Patient not found");
    
    const doctorProfile = await doctorRepository.getDoctorProfileByUserId(userId);
    if (patient.createdByDoctorId.toString() !== doctorProfile._id.toString()) {
      throw new ApiError(403, "Not authorized to update this patient");
    }

    const updatedPatient = await doctorRepository.updatePatient(patientId, updateData);
    return { message: "Patient updated successfully", data: updatedPatient };
  }

  async getReferrals(userId, queryParams = {}) {
    const doctorProfile = await doctorRepository.getDoctorProfileByUserId(userId);
    if (!doctorProfile) throw new ApiError(404, "Doctor profile not found");

    const options = getPaginationOptions(queryParams);
    const query = { doctorId: doctorProfile._id };

    if (queryParams.status) {
      query.status = queryParams.status;
    }

    const { data, total } = await doctorRepository.getReferrals(query, options);
    return { 
      message: "Referrals retrieved successfully", 
      data,
      meta: { total, page: options.page, limit: options.limit }
    };
  }

  async getReferralById(userId, referralId) {
    const referral = await doctorRepository.getReferralById(referralId);
    if (!referral) throw new ApiError(404, "Referral not found");

    const doctorProfile = await doctorRepository.getDoctorProfileByUserId(userId);
    if (referral.doctorId.toString() !== doctorProfile._id.toString()) {
      throw new ApiError(403, "Not authorized to access this referral");
    }

    return { message: "Referral retrieved successfully", data: referral };
  }
}

export const doctorService = new DoctorService();
