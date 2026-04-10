import { Router } from "express";

const router = Router();

import { getAdminDashboardController } from "../controllers/admin.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

router.get("/", authMiddleware, roleMiddleware, getAdminDashboardController);
export default router;
