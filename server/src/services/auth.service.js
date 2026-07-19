import { authRepository } from "../repositories/auth.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";

class AuthService {
  async register(userData) {
    const hashedPassword = await hashPassword(userData.password);

    const userForDB = {
      ...userData,
      password: hashedPassword,
    };

    await authRepository.createUser(userForDB);

    return {
      message: "Authentication module is ready. User persistence will be enabled after MongoDB integration."
    };
  }

  async login(email, password) {
    await authRepository.findUserByEmail(email);
    throw new ApiError(501, "Authentication service is ready. Login will be available after MongoDB integration.");
  }

  async logout() {
    return true;
  }

  async getProfile(userId) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async refreshToken(oldToken) {
    throw new ApiError(501, "Refresh token functionality not implemented yet");
  }
}

export const authService = new AuthService();
