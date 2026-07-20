class HospitalRepository {
  async getHospitalProfile(hospitalId) {
    throw new Error("Database implementation pending");
  }

  async updateHospitalProfile(hospitalId, profileData) {
    throw new Error("Database implementation pending");
  }

  async getResources(hospitalId) {
    throw new Error("Database implementation pending");
  }

  async updateResources(hospitalId, resourcesData) {
    throw new Error("Database implementation pending");
  }

  async getReferrals(hospitalId, query) {
    throw new Error("Database implementation pending");
  }

  async getReferralById(hospitalId, referralId) {
    throw new Error("Database implementation pending");
  }

  async acceptReferral(hospitalId, referralId, remarks) {
    throw new Error("Database implementation pending");
  }

  async rejectReferral(hospitalId, referralId, remarks) {
    throw new Error("Database implementation pending");
  }

  async getDoctors(hospitalId) {
    throw new Error("Database implementation pending");
  }
}

export const hospitalRepository = new HospitalRepository();
