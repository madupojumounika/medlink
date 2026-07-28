import AdminProfile from "../models/AdminProfile.model.js";
import DoctorProfile from "../models/DoctorProfile.model.js";
import CoordinatorProfile from "../models/CoordinatorProfile.model.js";
import { ApiError } from "./ApiError.js";

/**
 * Profile Factory to create role-specific profiles.
 * This ensures cleaner code and avoids repetitive if/else blocks across services.
 * 
 * @param {Object} user - The newly created User object.
 * @param {Object} session - Mongoose session for transaction.
 */
export const createProfile = async (user, session, extraData = {}) => {
  if (!user || !user.role) {
    throw new ApiError(500, "Cannot create profile: Invalid user data.");
  }

  const baseProfileData = {
    userId: user._id,
    hospitalId: user.hospitalId,
  };

  switch (user.role) {
    case "hospital_admin":
      return await AdminProfile.create([baseProfileData], { session });
      
    case "doctor":
      return await DoctorProfile.create([{
        ...baseProfileData,
        phone: extraData.phone || user.phone || "",
        department: extraData.specialist || extraData.specialization || extraData.department || "General Medicine",
        qualifications: extraData.qualifications ? [extraData.qualifications] : ["MBBS"],
        licenseNumber: extraData.licenseNumber || `LIC-${user._id}`
      }], { session });
      
    case "referral_coordinator":
      return await CoordinatorProfile.create([baseProfileData], { session });
      
    case "system_admin":
    case "ambulance":
      // These roles might not need workspace profiles in the same way, or handle them elsewhere.
      return null;
      
    default:
      throw new ApiError(500, `Cannot create profile: Unknown role ${user.role}`);
  }
};
