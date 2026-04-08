import { Router } from "express";

import {
    createInvoiceController,
    getInvoicesController,
    getInvoiceByIdController,
    updateInvoiceController,
    deleteInvoiceController,
} from "../controllers/invoice.controller.js";

import { validateInvoice } from "../middlewares/validateInvoice.middleware.js";
import { invoiceOwnershipMiddleware } from "../middlewares/ownership.middleware.js";
import {
    createPaymentController,
    getPaymentsController,
} from "../controllers/payment.controller.js";

const router = Router();

router.get("/", getInvoicesController);
router.post(
    "/",

    validateInvoice,
    createInvoiceController,
);
router.get("/:id", invoiceOwnershipMiddleware, getInvoiceByIdController);
router.put(
    "/:id",
    invoiceOwnershipMiddleware,
    validateInvoice,
    updateInvoiceController,
);
router.delete("/:id", invoiceOwnershipMiddleware, deleteInvoiceController);

router.post(
    "/:id/payments",
    invoiceOwnershipMiddleware,
    createPaymentController,
);

router.get("/:id/payments", invoiceOwnershipMiddleware, getPaymentsController);

export default router;
