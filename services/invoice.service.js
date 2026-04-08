import { Invoice } from "../models/invoice.model";
import { Supplier } from "../models/supplier.model.js";

export const createInvoiceService = async (req, res) => {
    const { supplierId, amount, dueDate, description } = req.body;

    const supplier = await Supplier.findOne({
        _id: supplierId,
        userId: req.user.id,
    });

    if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
    }

    const invoice = await Invoice.create({
        supplierId,
        amount,
        dueDate,
        description,
        userId: req.user.id,
    });

    return res.status(201).json({
        message: "Invoice created successfully",
        data: invoice,
    });
};

export const getInvoicesService = async (req, res) => {
    const invoices = await Invoice.find({ userId: req.user.id }).populate(
        "supplierId",
        "name",
    );

    return res.status(200).json({
        message: "Invoices retrieved successfully",
        data: invoices,
    });
};

export const getInvoiceByIdService = async (req, res) => {
    const invoice = await Invoice.findOne({
        _id: req.params.id,
        userId: req.user.id,
    }).populate("supplierId", "name");

    if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json({
        message: "Invoice retrieved successfully",
        data: invoice,
    });
};

export const updateInvoiceService = async (req, res) => {
    const invoice = await Invoice.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true },
    );

    if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json({
        message: "Invoice updated successfully",
        data: invoice,
    });
};

export const deleteInvoiceService = async (req, res) => {
    const invoice = await Invoice.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
    });

    if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    return res.status(200).json({
        message: "Invoice deleted successfully",
        data: invoice,
    });
};
