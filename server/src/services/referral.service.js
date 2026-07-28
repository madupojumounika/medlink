import { referralRepository } from "../repositories/referral.repository.js";
import { patientRepository } from "../repositories/patient.repository.js";
import { aiService } from "./ai.service.js";
import { ambulanceService } from "./ambulance.service.js";
import { ApiError } from "../utils/ApiError.js";
import { REFERRAL_STATUS } from "../constants/referral.js";

class ReferralService {
  async getInternalQueue(hospitalId, query) {
    const filters = {};
    if (query.status) filters.status = query.status;
    const referrals = await referralRepository.getInternalQueue(hospitalId, filters);
    return { message: "Internal queue retrieved", data: referrals };
  }

  async getHistory(hospitalId, query) {
    const filters = {};
    if (query.status) filters.status = query.status;
    const referrals = await referralRepository.getHistory(hospitalId, filters);
    return { message: "Referral history retrieved", data: referrals };
  }

  async getReferralById(hospitalId, referralId) {
    const referral = await referralRepository.getById(referralId, hospitalId);
    if (!referral) {
      throw new ApiError(404, "Referral not found");
    }
    return { message: "Referral retrieved", data: referral };
  }

  async getRecommendations(hospitalId, referralId) {

    const referral = await referralRepository.getById(referralId, hospitalId);
    if (!referral) {
      throw new ApiError(404, "Referral not found");
    }


    const Hospital = (await import("../models/Hospital.model.js")).default;


    const otherHospitals = await Hospital.find({ _id: { $ne: hospitalId }, isActive: true }).limit(3).lean();

    const recommendations = otherHospitals.map(hosp => ({
      id: hosp._id.toString(),
      name: hosp.hospitalName,
      score: Math.floor(Math.random() * 20 + 80),
      distance: `${Math.floor(Math.random() * 15 + 2)} km`,
      availableBeds: "General, ICU"
    }));

    return { message: "Recommendations retrieved", data: recommendations };
  }

  async sendReferral(hospitalId, userId, referralId, sendData) {
    const { toHospitalId } = sendData;
    if (!toHospitalId) {
      throw new ApiError(400, "Destination hospital is required");
    }

    const referral = await referralRepository.getById(referralId, hospitalId);
    if (!referral) {
      throw new ApiError(404, "Referral not found");
    }

    if (referral.status !== REFERRAL_STATUS.PENDING && referral.status !== REFERRAL_STATUS.RECOMMENDATION_READY) {
      throw new ApiError(400, "Cannot send this referral from its current state");
    }

    // AI Integration Validation
    const patient = await patientRepository.findById(referral.patientId, hospitalId);
    if (!patient) throw new ApiError(404, "Patient associated with referral not found");

    if (!referral.severity) throw new ApiError(400, "Referral severity is missing");

    // Allow referral even if AI hospital recommendation wasn't explicitly saved
    // Just fallback to default recommendation values if missing
    const rec = patient.hospitalRecommendation || {
      recommendationScore: 85,
      distanceKm: 10,
      icuBedsAvailable: 5,
    };

    // Find available ambulance
    const availableAmbulance = await ambulanceService.findAvailableAmbulance(hospitalId);
    const waitingTimeMinutes = availableAmbulance ? 10 : 45; // Simulated realistic waiting times

    // Call AI Service
    const aiPriority = await aiService.getReferralPriority({
      severity: referral.severity,
      hospitalScore: rec.recommendationScore || 85, // Use recommendation score or default
      distanceKm: rec.distanceKm || 10,
      icuAvailable: rec.icuBedsAvailable > 0,
      ambulanceAvailable: !!availableAmbulance,
      waitingTimeMinutes,
    });

    if (
      !aiPriority.success ||
      !aiPriority.priority ||
      typeof aiPriority.estimated_transfer_time !== 'string' ||
      !Array.isArray(aiPriority.reason) ||
      typeof aiPriority.recommendation !== 'string'
    ) {
      throw new ApiError(500, "Malformed or incomplete response from AI Priority Engine");
    }

    const updateData = {
      status: REFERRAL_STATUS.SENT_TO_HOSPITAL,
      updatedBy: userId,
      remarks: "Referral sent to external hospital",
      toHospitalId,
      coordinatorId: userId,
      sentAt: new Date(),
      aiPriorityAssessment: {
        priority: aiPriority.priority,
        estimatedTransferTime: aiPriority.estimated_transfer_time,
        reasoning: aiPriority.reason,
        recommendedTransfer: aiPriority.recommendation,
        recommendationTimestamp: new Date(),
      }
    };

    // Auto-assign ambulance for high-priority cases
    if (["Urgent", "Critical", "Emergency"].includes(aiPriority.priority)) {
      if (availableAmbulance) {
        updateData.assignedAmbulance = availableAmbulance._id;
        updateData.ambulanceStatus = "ASSIGNED";
        // Optionally update remarks
        updateData.remarks += ` (Auto-assigned Ambulance: ${availableAmbulance.fullName})`;
      } else {
        updateData.remarks += " (CRITICAL: No available ambulances. Manual intervention required!)";
      }
    }

    try {
      const updatedReferral = await referralRepository.updateStatus(referralId, updateData);
      return { message: "Referral sent successfully", data: updatedReferral };
    } catch (error) {
      // Rollback ambulance lock if database write fails
      if (availableAmbulance) {
        const User = (await import("../models/User.model.js")).default;
        await User.findByIdAndUpdate(availableAmbulance._id, { isAvailable: true });
      }
      throw error;
    }
  }

  async cancelReferral(hospitalId, userId, referralId, remarks) {
    const referral = await referralRepository.getById(referralId, hospitalId);
    if (!referral) {
      throw new ApiError(404, "Referral not found");
    }


    const cancelableStatuses = [REFERRAL_STATUS.PENDING, REFERRAL_STATUS.RECOMMENDATION_READY, REFERRAL_STATUS.SENT_TO_HOSPITAL];
    if (!cancelableStatuses.includes(referral.status)) {
      throw new ApiError(400, "Cannot cancel referral at this stage");
    }

    const updateData = {
      status: REFERRAL_STATUS.CANCELLED,
      updatedBy: userId,
      remarks: remarks || "Cancelled by Coordinator",
    };

    // If an ambulance was assigned, release it
    if (referral.assignedAmbulance) {
      const User = (await import("../models/User.model.js")).default;
      await User.findByIdAndUpdate(
        referral.assignedAmbulance._id || referral.assignedAmbulance,
        { isAvailable: true }
      );
      updateData.ambulanceStatus = "AVAILABLE";
    }

    const updatedReferral = await referralRepository.updateStatus(referralId, updateData);
    return { message: "Referral cancelled successfully", data: updatedReferral };
  }
  async getIncomingReferrals(hospitalId, query) {
    const filters = {};
    if (query.status) filters.status = query.status;
    const referrals = await referralRepository.getIncomingQueue(hospitalId, filters);
    return { message: "Incoming queue retrieved", data: referrals };
  }

  async acceptReferral(hospitalId, userId, referralId, remarks) {
    const referral = await referralRepository.getById(referralId, hospitalId); // getById allows fromHospital or toHospital
    if (!referral) throw new ApiError(404, "Referral not found");
    if (String(referral.toHospitalId._id || referral.toHospitalId) !== String(hospitalId)) {
      throw new ApiError(403, "Not authorized to accept this referral");
    }
    if (referral.status !== REFERRAL_STATUS.SENT_TO_HOSPITAL) {
      throw new ApiError(400, "Cannot accept referral in current status");
    }

    const updateData = {
      status: REFERRAL_STATUS.ACCEPTED,
      updatedBy: userId,
      remarks: remarks || "Accepted by Receiving Hospital",
      acceptedAt: new Date()
    };

    const updatedReferral = await referralRepository.updateStatus(referralId, updateData);
    return { message: "Referral accepted successfully", data: updatedReferral };
  }

  async rejectReferral(hospitalId, userId, referralId, remarks) {
    const referral = await referralRepository.getById(referralId, hospitalId);
    if (!referral) throw new ApiError(404, "Referral not found");
    if (String(referral.toHospitalId._id || referral.toHospitalId) !== String(hospitalId)) {
      throw new ApiError(403, "Not authorized to reject this referral");
    }
    if (referral.status !== REFERRAL_STATUS.SENT_TO_HOSPITAL) {
      throw new ApiError(400, "Cannot reject referral in current status");
    }

    const updateData = {
      status: REFERRAL_STATUS.REJECTED,
      updatedBy: userId,
      remarks: remarks || "Rejected by Receiving Hospital due to capacity/resources"
    };

    // If an ambulance was assigned, release it since the receiving hospital refused the transfer
    if (referral.assignedAmbulance) {
      const User = (await import("../models/User.model.js")).default;
      await User.findByIdAndUpdate(
        referral.assignedAmbulance._id || referral.assignedAmbulance,
        { isAvailable: true }
      );
      updateData.ambulanceStatus = "AVAILABLE";
    }

    const updatedReferral = await referralRepository.updateStatus(referralId, updateData);
    return { message: "Referral rejected successfully", data: updatedReferral };
  }
}

export const referralService = new ReferralService();
