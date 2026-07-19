import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation, validate } from "../validations/auth.validation.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.post("/register", registerValidation, validate, authController.register);
router.post("/login", loginValidation, validate, authController.login);
router.post("/logout", authenticate, authController.logout);
router.get("/profile", authenticate, authController.getProfile);
router.post("/refresh-token", authController.refreshToken);

export default router;
