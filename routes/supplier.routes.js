import { Router } from "express";

import {
    createSupplierController,
    getSuppliersController,
    getSupplierByIdController,
    updateSupplierController,
    deleteSupplierController,
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

export default router;
