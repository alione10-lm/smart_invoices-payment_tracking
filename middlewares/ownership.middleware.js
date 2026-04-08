import { Supplier } from "../models/supplier.model.js";
import { Invoice } from "../models/invoice.model.js";
import { Payment } from "../models/payment.model.js";

export const supplierOwnershipMiddleware = async (req, res, next) => {
    const { id } = req.user;

    const supplierId = req.params.id;
    const supplier = await Supplier.findById(supplierId);

    if (!supplier) {
        return res.status(404).json({
            success: false,
            message: "Supplier not found",
        });
    }

    if (supplier.userId.toString() !== id) {
        return res.status(403).json({
            success: false,
            message: "You don't have permission to access this resource",
        });
    }

    next();
};

export const invoiceOwnershipMiddleware = async (req, res, next) => {
    const { id } = req.user;

    const invoiceId = req.params.id;

    const invoice = await Invoice.findById(invoiceId);

    if (invoice.userId.toString() !== id) {
        return res.status(403).json({
            success: false,
            message: "You don't have permission to access this resource",
        });
    }

    next();
};

export const paymentOwnershipMiddleware = async (req, res, next) => {
    const { id } = req.user;

    const paymentId = req.params.id;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
        return res.status(404).json({
            success: false,
            message: "Payment not found",
        });
    }

    console.log(payment);
    if (payment.userId.toString() !== id) {
        return res.status(403).json({
            success: false,
            message: "You don't have permission to access this resource",
        });
    }

    next();
};
