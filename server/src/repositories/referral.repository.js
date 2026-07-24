import Referral from "../models/Referral.model.js";

class ReferralRepository {
  async getInternalQueue(hospitalId, filters = {}) {
    const query = { 
      fromHospitalId: hospitalId, 
      isActive: true, 
      status: { $in: ["Pending", "Recommendation Ready"] },
      ...filters 
    };
    
    return await Referral.find(query)
      .populate("patientId")
      .populate("doctorId", "fullName")
      .sort({ createdAt: -1 });
  }

  async getIncomingQueue(hospitalId, filters = {}) {
    const query = {
      toHospitalId: hospitalId,
      isActive: true,
      status: "Sent To Hospital",
      ...filters
    };
    
    return await Referral.find(query)
      .populate("patientId")
      .populate("doctorId", "fullName")
      .populate("fromHospitalId", "name")
      .sort({ sentAt: -1 });
  }

  async getHistory(hospitalId, filters = {}) {
    const query = {
      fromHospitalId: hospitalId,
      isActive: true,
      status: { $nin: ["Pending", "Recommendation Ready"] },
      ...filters
    };

    return await Referral.find(query)
      .populate("patientId")
      .populate("doctorId", "fullName")
      .populate("toHospitalId", "name")
      .sort({ updatedAt: -1 });
  }

  async getById(referralId, hospitalId) {
    return await Referral.findOne({
      _id: referralId,
      $or: [{ fromHospitalId: hospitalId }, { toHospitalId: hospitalId }],
      isActive: true,
    })
      .populate("patientId")
      .populate("doctorId", "fullName")
      .populate("fromHospitalId", "name")
      .populate("toHospitalId", "name");
  }

  async updateStatus(referralId, updateData) {
    // Expects updateData to contain status, updatedBy, and any remarks/other fields.
    const { status, updatedBy, remarks, ...otherFields } = updateData;
    
    const update = {
      $set: { status, ...otherFields },
      $push: {
        statusHistory: {
          status,
          updatedBy,
          remarks,
          updatedAt: new Date()
        }
      }
    };

    return await Referral.findOneAndUpdate(
      { _id: referralId, isActive: true },
      update,
      { new: true, runValidators: true }
    );
  }
}

export const referralRepository = new ReferralRepository();
