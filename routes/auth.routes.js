import { Router } from "express";

const router = Router();
import {
    getProfileController,
    loginController,
    registerController,
} from "../controllers/auth.controller.js";
import {
    handleValidation,
    validateLogin,
    validateRegister,
} from "../middlewares/userValidator.middleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

router.post("/login", validateLogin, handleValidation, loginController);
router.post(
    "/register",
    validateRegister,
    handleValidation,
    registerController,
);

router.get("/me", authMiddleware, getProfileController);

export default router;
