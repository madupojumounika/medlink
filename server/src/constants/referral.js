export const REFERRAL_STATUS = {
  PENDING: "Pending", // Unprocessed in Coordinator Queue
  RECOMMENDATION_READY: "Recommendation Ready", // AI/Dummy suggested hospitals
  SENT_TO_HOSPITAL: "Sent To Hospital", // Forwarded out
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  IN_TRANSIT: "In Transit",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const REFERRAL_SEVERITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  CRITICAL: "Critical",
};

export const REFERRAL_PRIORITY = {
  NORMAL: "Normal",
  URGENT: "Urgent",
  CRITICAL: "Critical",
};

export const PATIENT_STATUS = {
  NEW: "NEW",
  UNDER_OBSERVATION: "UNDER_OBSERVATION",
  READY_FOR_REFERRAL: "READY_FOR_REFERRAL",
  REFERRED_TO_COORDINATOR: "REFERRED_TO_COORDINATOR",
};
