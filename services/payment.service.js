import { Payment } from "../models/payment.model.js";

import { Invoice } from "../models/invoice.model.js";

export const createPaymentService = async (req, res) => {
    const { amount, paymentDate, method, paymentMode, note } = req.body;

    const invoiceId = req.params.id;

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.amount < amount) {
        return res.status(400).json({
            message: "Payment amount exceeds invoice amount",
        });
    }

    if (invoice.amount === amount) {
        invoice.status = "paid";
    }

    if (invoice.amount > amount) {
        invoice.status = "partially_paid";
    }

    await invoice.save();

    const payment = await Payment.create({
        invoiceId,
        amount,
        paymentDate,
        method,
        paymentMode,
        note,
        userId: req.user.id,
    });

    return res.status(201).json({
        message: "Payment created successfully",

        data: {
            payment,
            invoice,
        },
    });
};

export const getPaymentsService = async (req, res) => {
    const payments = await Payment.find({
        userId: req.user.id,
        invoiceId: req.params.id,
    });

    return res.status(200).json({
        message: "Payments retrieved successfully",
        data: payments,
    });
};

export const getPaymentByIdService = async (req, res) => {
    const payment = await Payment.findOne({
        _id: req.params.id,
        userId: req.user.id,
    }).populate("invoiceId", "description");

    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({
        message: "Payment retrieved successfully",
        data: payment,
    });
};

export const updatePaymentService = async (req, res) => {
    const { invoiceId, amount, paymentDate, method, paymentMode, note } =
        req.body;

    const payment = await Payment.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        { invoiceId, amount, paymentDate, method, paymentMode, note },

        { new: true },
    );

    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({
        message: "Payment updated successfully",
        data: payment,
    });
};

export const deletePaymentService = async (req, res) => {
    const payment = await Payment.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
    });

    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({
        message: "Payment deleted successfully",
        data: payment,
    });
};
