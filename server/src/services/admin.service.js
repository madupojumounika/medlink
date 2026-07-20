import adminRepository from '../repositories/admin.repository.js';

class AdminService {
  async getDashboardOverview() {
    return {
      message: 'Dashboard data will be available after MongoDB integration.',
      data: {
        totalUsers: 0,
        totalDoctors: 0,
        totalHospitals: 0,
        totalAmbulances: 0,
        activeEmergencies: 0,
      },
    };
  }

  async getAllUsers(filters, pagination) {
    return {
      message: 'User list will be available after MongoDB integration.',
      data: [],
    };
  }

  async getUserById(id) {
    return {
      message: 'User details will be available after MongoDB integration.',
      data: { id },
    };
  }

  async updateUser(id, updateData) {
    return {
      message: 'User update will be functional after MongoDB integration.',
      data: { id, ...updateData },
    };
  }

  async deleteUser(id) {
    return {
      message: 'User deletion will be functional after MongoDB integration.',
      data: null,
    };
  }

  async getAllDoctors(filters, pagination) {
    return {
      message: 'Doctor list will be available after MongoDB integration.',
      data: [],
    };
  }

  async getDoctorById(id) {
    return {
      message: 'Doctor details will be available after MongoDB integration.',
      data: { id },
    };
  }

  async updateDoctor(id, updateData) {
    return {
      message: 'Doctor update will be functional after MongoDB integration.',
      data: { id, ...updateData },
    };
  }

  async getAllHospitals(filters, pagination) {
    return {
      message: 'Hospital list will be available after MongoDB integration.',
      data: [],
    };
  }

  async getHospitalById(id) {
    return {
      message: 'Hospital details will be available after MongoDB integration.',
      data: { id },
    };
  }

  async updateHospital(id, updateData) {
    return {
      message: 'Hospital update will be functional after MongoDB integration.',
      data: { id, ...updateData },
    };
  }

  async getAllAmbulances(filters, pagination) {
    return {
      message: 'Ambulance list will be available after MongoDB integration.',
      data: [],
    };
  }

  async getAmbulanceById(id) {
    return {
      message: 'Ambulance details will be available after MongoDB integration.',
      data: { id },
    };
  }

  async updateAmbulance(id, updateData) {
    return {
      message: 'Ambulance update will be functional after MongoDB integration.',
      data: { id, ...updateData },
    };
  }

  async getSettings() {
    return {
      message: 'System settings will be available after MongoDB integration.',
      data: {
        applicationName: 'MedLink AI',
        maintenanceMode: false,
        supportEmail: 'support@medlink.ai',
        emergencyContact: '911',
      },
    };
  }

  async updateSettings(settingsData) {
    return {
      message: 'Settings update will be functional after MongoDB integration.',
      data: { ...settingsData },
    };
  }

  async getReports(reportType, startDate, endDate) {
    return {
      message: 'Reports will be available after MongoDB integration.',
      data: {
        reportType,
        startDate,
        endDate,
        results: [],
      },
    };
  }
}

export default new AdminService();
