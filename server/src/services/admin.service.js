import adminRepository from '../repositories/admin.repository.js';
import { aiService } from './ai.service.js';
import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const getPaginationOptions = (query = {}) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 20;
  const skip = (page - 1) * limit;
  const sort = query.sort ? { [query.sort]: query.order === 'desc' ? -1 : 1 } : { createdAt: -1 };
  return { page, limit, skip, sort };
};

class AdminService {
  async getDashboardOverview() {
    const startTime = performance.now();
    try {
      // Execute DB aggregations and AI health check in parallel
      const [dbData, aiHealth] = await Promise.all([
        adminRepository.getDashboard(),
        aiService.checkAIHealth()
      ]);

      const { userStats, hospitalStats, patientStats, referralData, recentActivity } = dbData;

      const systemStats = {
        totalDoctors: userStats?.doctors?.[0]?.count || 0,
        totalHospitals: hospitalStats?.count || 0,
        totalAmbulances: userStats?.ambulances?.[0]?.count || 0,
        totalPatients: patientStats?.count || 0,
        totalReferrals: referralData?.statusCounts?.reduce((sum, item) => sum + item.count, 0) || 0,
        pendingReferrals: referralData?.statusCounts?.find(s => s._id === 'Pending')?.count || 0,
        completedReferrals: referralData?.statusCounts?.find(s => s._id === 'Completed')?.count || 0,
        cancelledReferrals: referralData?.statusCounts?.find(s => s._id === 'Cancelled')?.count || 0,
        rejectedReferrals: referralData?.statusCounts?.find(s => s._id === 'Rejected')?.count || 0,
        emergencyReferrals: referralData?.priorityCounts?.find(s => s._id === 'Emergency' || s._id === 'Critical')?.count || 0, // Fallback if Critical/Emergency mapped together
        criticalReferrals: referralData?.priorityCounts?.find(s => s._id === 'Critical')?.count || 0,
      };

      const aiAnalytics = {
        severityDistribution: (referralData?.severityCounts || []).map(item => ({ name: item._id || 'Unknown', value: item.count })),
        priorityDistribution: (referralData?.priorityCounts || []).map(item => ({ name: item._id || 'Unknown', value: item.count })),
        predictionSuccessCount: systemStats.totalReferrals, // Assuming successfully processed referrals used AI
      };

      const ambulanceAnalytics = {
        ambulanceStatusDistribution: (userStats?.ambulanceStatus || []).map(item => ({ name: item._id ? 'Available' : 'Busy', value: item.count })),
        assignedAmbulances: referralData?.ambulanceStatusCounts?.find(s => s._id === 'ASSIGNED')?.count || 0,
        enRouteAmbulances: referralData?.ambulanceStatusCounts?.find(s => s._id === 'EN_ROUTE')?.count || 0,
        transportingAmbulances: referralData?.ambulanceStatusCounts?.find(s => s._id === 'TRANSPORTING')?.count || 0,
        completedTrips: referralData?.ambulanceStatusCounts?.find(s => s._id === 'COMPLETED')?.count || 0,
      };

      const hospitalAnalytics = {
        hospitalReferralDistribution: (referralData?.hospitalCounts || []).map(item => ({ name: item._id ? item._id.toString().substring(0, 5) : 'Unknown', value: item.count })),
      };

      const systemHealth = {
        nodeBackend: 'Online',
        mongoDB: mongoose.connection.readyState === 1 ? 'Online' : 'Offline',
        fastAPI: aiHealth ? 'Online' : 'Offline',
        currentServerTime: new Date().toISOString(),
      };

      const executionTime = (performance.now() - startTime).toFixed(2);
      logger.info(`[ADMIN_DASHBOARD] Analytics generated in ${executionTime}ms`);

      return {
        message: 'Dashboard data retrieved successfully.',
        data: {
          systemStats,
          aiAnalytics,
          ambulanceAnalytics,
          hospitalAnalytics,
          systemHealth,
          recentActivity,
        },
      };
    } catch (error) {
      logger.error(`[ADMIN_DASHBOARD] Aggregation error: ${error.message}`);
      throw error;
    }
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

  async getAllDoctors(filters = {}, pagination = {}) {
    const options = getPaginationOptions(pagination);
    const { data, total } = await adminRepository.getDoctors(filters, options);
    return {
      message: 'Doctors retrieved successfully.',
      data,
      meta: {
        page: options.page,
        limit: options.limit,
        total,
        totalPages: Math.ceil(total / options.limit) || 1,
      },
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
