import Hospital from "../models/Hospital.model.js";
import HospitalResource from "../models/HospitalResource.model.js";
import Referral from "../models/Referral.model.js";
import DoctorProfile from "../models/DoctorProfile.model.js";

class HospitalRepository {
  async getHospitalByUserId(userId) {
    return await Hospital.findOne({ userId, isActive: true }).lean();
  }

  async getHospitalProfile(userId) {
    return await Hospital.findOne({ userId, isActive: true }).lean();
  }

  async updateHospitalProfile(userId, profileData) {
    return await Hospital.findOneAndUpdate({ userId, isActive: true }, profileData, { new: true, runValidators: true });
  }

  async getResources(hospitalId) {
    return await HospitalResource.findOne({ hospitalId }).lean();
  }

  async updateResources(hospitalId, resourcesData) {
    return await HospitalResource.findOneAndUpdate({ hospitalId }, resourcesData, { new: true, runValidators: true, upsert: true });
  }

  async createReferral(referralData, session) {
    const referral = new Referral(referralData);
    if (session) {
      return await referral.save({ session });
    }
    return await referral.save();
  }

  async getReferrals(query, options) {
    const { sort, skip, limit } = options;
    const data = await Referral.find({ ...query, isActive: true })
      .populate("patientId", "name age gender")
      .populate("doctorId", "specialization")
      .populate("fromHospitalId", "hospitalName")
      .populate("toHospitalId", "hospitalName")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    
    const total = await Referral.countDocuments({ ...query, isActive: true });
    return { data, total };
  }

  async getReferralById(referralId) {
    return await Referral.findOne({ _id: referralId, isActive: true })
      .populate("patientId", "name age gender phone bloodGroup allergies existingConditions")
      .populate("doctorId", "specialization phone")
      .populate("fromHospitalId", "hospitalName email phone address district state")
      .populate("toHospitalId", "hospitalName email phone address district state")
      .lean();
  }

  async updateReferralStatus(referralId, updateData, session) {
    if (session) {
      return await Referral.findOneAndUpdate({ _id: referralId, isActive: true }, updateData, { new: true, runValidators: true, session });
    }
    return await Referral.findOneAndUpdate({ _id: referralId, isActive: true }, updateData, { new: true, runValidators: true });
  }

  async getDoctors(query, options) {
    const { sort, skip, limit } = options;
    const data = await DoctorProfile.find({ ...query, isActive: true })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await DoctorProfile.countDocuments({ ...query, isActive: true });
    return { data, total };
  }

  async createHospital(hospitalData) {
    const hospital = new Hospital(hospitalData);
    return await hospital.save();
  }

  async getAllHospitals() {
    return await Hospital.find({ isActive: true });
  }

  async getHospitalById(id) {
    return await Hospital.findOne({ _id: id, isActive: true });
  }

  async updateHospital(id, updateData) {
    return await Hospital.findOneAndUpdate({ _id: id, isActive: true }, updateData, { new: true, runValidators: true });
  }

  async deleteHospital(id) {
    return await Hospital.findByIdAndUpdate(id, { isActive: false, deletedAt: new Date() }, { new: true });
  }
}

export const hospitalRepository = new HospitalRepository();
