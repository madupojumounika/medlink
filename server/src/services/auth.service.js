import { authRepository } from "../repositories/auth.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import { createProfile } from "../utils/profile.factory.js";

class AuthService {
  async register(userData) {
    const session = await authRepository.startTransaction();
    try {
      // Basic check
      const existingUser = await authRepository.findUserByEmail(userData.email);
      if (existingUser) {
        throw new ApiError(400, "Email already in use");
      }

      const hashedPassword = await hashPassword(userData.password);

      let createdUser;

      if (userData.role === "hospital") {
        // Registering a new Hospital Organization
        const hospitalData = {
          hospitalName: userData.hospitalName,
          hospitalCode: userData.registrationNumber, // using registrationNumber as code for now
          email: userData.email, // admin email
          phone: userData.phone,
          address: userData.address || "Pending Address",
          district: "Pending District",
          state: "Pending State"
        };
        
        const hospital = await authRepository.createHospital(hospitalData, session);

        const userForDB = {
          fullName: userData.adminName || userData.hospitalName,
          email: userData.email,
          password: hashedPassword,
          role: "hospital_admin",
          hospitalId: hospital._id
        };

        createdUser = await authRepository.createUser(userForDB, session);
        await createProfile(createdUser, session);

      } else {
        // Future extensions (Ambulance, etc.)
        throw new ApiError(400, `Self-registration for role '${userData.role}' is not supported yet.`);
      }

      await session.commitTransaction();
      session.endSession();

      return {
        message: "Registration successful",
        user: createdUser
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async login(email, password) {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
      throw new ApiError(403, "Account is deactivated");
    }

    const token = generateAccessToken({ 
      id: user._id, 
      role: user.role,
      hospitalId: user.hospitalId 
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    return {
      user: userWithoutPassword,
      token
    };
  }

  async logout() {
    return true;
  }

  async getProfile(userId) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { password, ...userWithoutPassword } = user.toObject ? user.toObject() : user;
    return userWithoutPassword;
  }

  async refreshToken(oldToken) {
    throw new ApiError(501, "Refresh token functionality not implemented yet");
  }
}

export const authService = new AuthService();
