import Hospital from "../models/Hospital.model.js";
import HospitalResource from "../models/HospitalResource.model.js";
import Referral from "../models/Referral.model.js";
import DoctorProfile from "../models/DoctorProfile.model.js";
import AdminProfile from "../models/AdminProfile.model.js";
import CoordinatorProfile from "../models/CoordinatorProfile.model.js";
import User from "../models/User.model.js";

class HospitalRepository {
  async getHospitalByUserId(userId) {
    return await Hospital.findOne({ userId, isActive: true }).lean();
  }

  async getHospitalProfile(hospitalId) {
    return await Hospital.findOne({ _id: hospitalId, isActive: true }).lean();
  }

  async updateHospitalProfile(hospitalId, profileData) {
    return await Hospital.findOneAndUpdate({ _id: hospitalId, isActive: true }, profileData, { new: true, runValidators: true });
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

  async getEmployees(query, options) {
    const { sort, skip, limit } = options;
    const data = await User.find({ ...query, isActive: true })
      .select("-password")
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();
    const total = await User.countDocuments({ ...query, isActive: true });
    return { data, total };
  }

  async updateEmployeeStatus(employeeId, isActive) {
    return await User.findByIdAndUpdate(
      employeeId,
      { isActive },
      { new: true, runValidators: true }
    );
  }

  async updateEmployeeProfile(employeeId, role, details) {
    let Model;
    switch (role) {
      case "doctor":
        Model = DoctorProfile;
        break;
      case "referral_coordinator":
        Model = CoordinatorProfile;
        break;
      case "hospital_admin":
        Model = AdminProfile;
        break;
      default:
        throw new Error("Invalid employee role for profile update");
    }

    return await Model.findOneAndUpdate(
      { userId: employeeId },
      details,
      { new: true, runValidators: true }
    );
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
