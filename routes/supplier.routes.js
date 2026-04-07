import { Router } from "express";

import {
    createSupplierController,
    getSuppliersController,
    getSupplierByIdController,
    updateSupplierController,
    deleteSupplierController,
} from "../controllers/supplier.controller.js";
import { validateSupplier } from "../middlewares/validateSupplier.middleware.js";

const router = Router();

router.get("/", getSuppliersController);
router.post("/", validateSupplier, createSupplierController);
router.get("/:id", getSupplierByIdController);
router.put("/:id", validateSupplier, updateSupplierController);
router.delete("/:id", deleteSupplierController);

export default router;
