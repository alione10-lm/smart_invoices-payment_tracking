import { Router } from "express";

import {
    createSupplierController,
    getSuppliersController,
    getSupplierByIdController,
    updateSupplierController,
    deleteSupplierController,
    supplierStatisticsController,
} from "../controllers/supplier.controller.js";
import { validateSupplier } from "../middlewares/validateSupplier.middleware.js";

import { supplierOwnershipMiddleware } from "../middlewares/ownership.middleware.js";

const router = Router();

router.get("/", getSuppliersController);
router.post("/", validateSupplier, createSupplierController);
router.get("/:id", supplierOwnershipMiddleware, getSupplierByIdController);
router.put(
    "/:id",
    supplierOwnershipMiddleware,
    validateSupplier,
    updateSupplierController,
);
router.delete("/:id", supplierOwnershipMiddleware, deleteSupplierController);

router.get(
    "/:id/stats",
    supplierOwnershipMiddleware,
    supplierStatisticsController,
);

export default router;
