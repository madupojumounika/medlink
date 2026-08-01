import axios from 'axios';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../utils/logger.js';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

class AIService {
  async checkAIHealth() {
    try {
      const response = await axios.get(`${AI_SERVICE_URL}/health`, {
        timeout: 30000, // 30 seconds
      });

      return response.data?.success || false;
    } catch (error) {
      logger.warn(
        `[AI_STATUS] AI Service is temporarily offline or unreachable: ${error.message}`
      );
      return false;
    }
  }

  async predictSeverity(patientData) {
    const startTime = performance.now();
    logger.info(`[AI_REQUEST] Severity prediction started.`);
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/predict-severity`, {
        age: patientData.age,
        gender: patientData.gender,
        heart_rate: patientData.vitals.heartRate,
        systolic_bp: patientData.vitals.systolicBP,
        diastolic_bp: patientData.vitals.diastolicBP,
        spo2: patientData.vitals.spo2,
        respiratory_rate: patientData.vitals.respiratoryRate,
        temperature: patientData.vitals.temperature,
      }, { timeout: 30000 });
      
      const executionTime = (performance.now() - startTime).toFixed(2);
      logger.info(`[AI_RESPONSE] Successfully received prediction in ${executionTime}ms. Result: ${response.data.prediction?.severity}`);
      
      return response.data;
    } catch (error) {
      const executionTime = (performance.now() - startTime).toFixed(2);
      logger.error(`[AI_ERROR] Failed after ${executionTime}ms: ${error.message}`);
      
      if (error.response) {
         throw new ApiError(error.response.status, error.response.data.detail || "AI Service prediction failed");
      }
      throw new ApiError(503, "AI Service unavailable or timed out");
    }
  }

  async recommendHospital(requestData) {
    const startTime = performance.now();
    logger.info(`[AI_REQUEST] Hospital recommendation started.`);
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/recommend-hospital`, {
        severity: requestData.severity,
        required_specialty: requestData.specialty,
        latitude: requestData.latitude,
        longitude: requestData.longitude,
      }, { timeout: 10000 });
      
      const executionTime = (performance.now() - startTime).toFixed(2);
      logger.info(`[AI_RESPONSE] Successfully received hospital recommendation in ${executionTime}ms. Result: ${response.data.recommended_hospital?.hospital_name}`);
      
      return response.data;
    } catch (error) {
      const executionTime = (performance.now() - startTime).toFixed(2);
      logger.error(`[AI_ERROR] Hospital recommendation failed after ${executionTime}ms: ${error.message}`);
      
      if (error.response) {
         throw new ApiError(error.response.status, error.response.data.detail || "AI Service hospital recommendation failed");
      }
      throw new ApiError(503, "AI Service unavailable or timed out");
    }
  }

  async getReferralPriority(requestData) {
    const startTime = performance.now();
    logger.info(`[AI_REQUEST] Referral priority assessment started.`);
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/referral-priority`, {
        severity: requestData.severity,
        hospital_score: requestData.hospitalScore,
        distance_km: requestData.distanceKm,
        icu_available: requestData.icuAvailable,
        ambulance_available: requestData.ambulanceAvailable,
        waiting_time_minutes: requestData.waitingTimeMinutes,
      }, { timeout: 30000 });
      
      const executionTime = (performance.now() - startTime).toFixed(2);
      logger.info(`[AI_RESPONSE] Successfully received referral priority in ${executionTime}ms. Priority: ${response.data.priority}`);
      
      return response.data;
    } catch (error) {
      const executionTime = (performance.now() - startTime).toFixed(2);
      logger.error(`[AI_ERROR] Referral priority assessment failed after ${executionTime}ms: ${error.message}`);
      
      if (error.response) {
         throw new ApiError(error.response.status, error.response.data.detail || "AI Service referral priority failed");
      }
      throw new ApiError(503, "AI Service unavailable or timed out");
    }
  }
}

export const aiService = new AIService();
