import { Router } from "express";

const router = Router();
import {
    loginController,
    registerController,
} from "../controllers/auth.controller.js";
import {
    handleValidation,
    validateLogin,
    validateRegister,
} from "../middlewares/userValidator.middleware.js";

router.post("/login", validateLogin, handleValidation, loginController);
router.post(
    "/register",
    validateRegister,
    handleValidation,
    registerController,
);

export default router;
