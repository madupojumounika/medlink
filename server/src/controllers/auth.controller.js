import { authService } from "../services/auth.service.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);
    return apiResponse(res, 201, true, result.message);
  });

  login = asyncHandler(async (req, res) => {
    const identifier = req.body.email || req.body.username || req.body.identifier || req.body.userId;
    const { password } = req.body;
    const { user, token } = await authService.login(identifier, password);
    return apiResponse(res, 200, true, "Login successful", { user, token });
  });

  logout = asyncHandler(async (req, res) => {
    await authService.logout();
    return apiResponse(res, 200, true, "Logged out successfully");
  });

  getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user.id);
    return apiResponse(res, 200, true, "Profile retrieved successfully", { user });
  });

  refreshToken = asyncHandler(async (req, res) => {
    const oldToken = req.body.token;
    await authService.refreshToken(oldToken);
    return apiResponse(res, 200, true, "Token refreshed");
  });
}

export const authController = new AuthController();
