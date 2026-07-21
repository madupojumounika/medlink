import DoctorProfile from "../models/DoctorProfile.model.js";
import Patient from "../models/Patient.model.js";
import Referral from "../models/Referral.model.js";

export class DoctorRepository {
  async getDoctorProfileByUserId(userId) {
    return await DoctorProfile.findOne({ userId, isActive: true }).populate("hospitalId", "name email phone").lean();
  }

  async updateDoctorProfile(userId, updateData) {
    return await DoctorProfile.findOneAndUpdate({ userId, isActive: true }, updateData, { new: true, runValidators: true });
  }

  async createPatient(patientData) {
    const patient = new Patient(patientData);
    return await patient.save();
  }

  async getPatients(query, options) {
    const { sort, skip, limit } = options;
    const data = await Patient.find({ ...query, isActive: true })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Patient.countDocuments({ ...query, isActive: true });
    return { data, total };
  }

  async getPatientById(patientId) {
    return await Patient.findOne({ _id: patientId, isActive: true }).lean();
  }

  async updatePatient(patientId, updateData) {
    return await Patient.findOneAndUpdate({ _id: patientId, isActive: true }, updateData, { new: true, runValidators: true });
  }

  async getReferrals(query, options) {
    const { sort, skip, limit } = options;
    const data = await Referral.find({ ...query, isActive: true })
      .populate("patientId", "name age gender")
      .populate("fromHospitalId", "name email")
      .populate("toHospitalId", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
      
    const total = await Referral.countDocuments({ ...query, isActive: true });
    return { data, total };
  }

  async getReferralById(referralId) {
    return await Referral.findOne({ _id: referralId, isActive: true })
      .populate("patientId", "name age gender bloodGroup allergies existingConditions phone")
      .populate("fromHospitalId", "name email phone")
      .populate("toHospitalId", "name email phone")
      .lean();
  }
}

export const doctorRepository = new DoctorRepository();
