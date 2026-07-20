class AmbulanceRepository {
  async getAmbulanceProfile(ambulanceId) {
    throw new Error("Database implementation pending");
  }

  async updateAmbulanceProfile(ambulanceId, profileData) {
    throw new Error("Database implementation pending");
  }

  async getStatus(ambulanceId) {
    throw new Error("Database implementation pending");
  }

  async updateStatus(ambulanceId, statusData) {
    throw new Error("Database implementation pending");
  }

  async getAssignments(ambulanceId, query) {
    throw new Error("Database implementation pending");
  }

  async getAssignmentById(ambulanceId, assignmentId) {
    throw new Error("Database implementation pending");
  }

  async acceptAssignment(ambulanceId, assignmentId, remarks) {
    throw new Error("Database implementation pending");
  }

  async rejectAssignment(ambulanceId, assignmentId, remarks) {
    throw new Error("Database implementation pending");
  }

  async startTrip(ambulanceId, assignmentId) {
    throw new Error("Database implementation pending");
  }

  async completeTrip(ambulanceId, assignmentId, remarks) {
    throw new Error("Database implementation pending");
  }

  async getTrips(ambulanceId, query) {
    throw new Error("Database implementation pending");
  }
}

export const ambulanceRepository = new AmbulanceRepository();
