import User from "../models/User.model.js";
import DoctorProfile from "../models/DoctorProfile.model.js";
import Patient from "../models/Patient.model.js";
import Referral from "../models/Referral.model.js";

export class DoctorRepository {
  async getDoctorProfileByUserId(userId) {
    const profile = await DoctorProfile.findOne({ userId, isActive: true })
      .populate("userId", "fullName email role onDuty isAvailable")
      .populate("hospitalId", "hospitalName email phone")
      .lean();
    if (profile && profile.userId) {
      profile.onDuty = profile.onDuty ?? profile.availability ?? profile.userId.onDuty ?? profile.userId.isAvailable ?? true;
      profile.availability = profile.availability ?? profile.onDuty ?? profile.userId.isAvailable ?? profile.userId.onDuty ?? true;
    }
    return profile;
  }

  async updateDoctorProfile(userId, updateData) {
    if (updateData.onDuty !== undefined || updateData.availability !== undefined) {
      const duty = updateData.onDuty ?? updateData.availability;
      await User.findByIdAndUpdate(userId, { onDuty: duty, isAvailable: duty });
      if (updateData.onDuty === undefined) updateData.onDuty = duty;
      if (updateData.availability === undefined) updateData.availability = duty;
    }
    return await DoctorProfile.findOneAndUpdate({ userId, isActive: true }, updateData, { new: true, runValidators: true });
  }

  async updateDutyStatus(userId, onDuty) {
    await User.findByIdAndUpdate(userId, { onDuty, isAvailable: onDuty });
    return await DoctorProfile.findOneAndUpdate(
      { userId, isActive: true },
      { onDuty, availability: onDuty },
      { new: true, runValidators: true }
    )
      .populate("userId", "fullName email role onDuty isAvailable")
      .populate("hospitalId", "hospitalName email phone")
      .lean();
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
