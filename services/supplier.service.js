import { Invoice } from "../models/invoice.model.js";
import { Supplier } from "../models/supplier.model.js";
import mongoose from "mongoose";

export const createSupplierService = async (req, res) => {
    const { name, email, phone, contact, adress } = req.body;

    const supplier = await Supplier.create({
        name,
        email,
        phone,
        contact,
        adress,
        userId: req.user.id,
    });

    return res.status(201).json({
        message: "Supplier created successfully",
        data: supplier,
    });
};

export const getSuppliersService = async (req, res) => {
    const suppliers = await Supplier.find({ userId: req.user.id });

    return res.status(200).json({
        message: "Suppliers retrieved successfully",
        suppliers,
    });
};

export const getSupplierByIdService = async (req, res) => {
    const supplier = await Supplier.findOne({
        _id: req.params.id,
        userId: req.user.id,
    });

    if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
        message: "Supplier retrieved successfully",
        data: supplier,
    });
};

export const updateSupplierService = async (req, res) => {
    const supplier = await Supplier.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true },
    );

    if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
        message: "Supplier updated successfully",
        data: supplier,
    });
};

export const deleteSupplierService = async (req, res) => {
    const supplier = await Supplier.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.id,
    });

    if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
    }

    return res.status(200).json({
        message: "Supplier deleted successfully",
    });
};

export const supplierStatisticsService = async (req, res) => {
    const supplier = await Supplier.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.id),
                userId: new mongoose.Types.ObjectId(req.user.id),
            },
        },
        {
            $lookup: {
                from: "invoices",
                localField: "_id",
                foreignField: "supplierId",
                as: "invoices",
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,

                // total invoices
                totalInvoices: { $size: "$invoices" },

                // total amount
                totalAmount: { $sum: "$invoices.amount" },

                // total paid
                totalPaid: {
                    $sum: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$invoices",
                                    as: "inv",
                                    cond: { $eq: ["$$inv.status", "paid"] },
                                },
                            },
                            as: "inv",
                            in: "$$inv.amount",
                        },
                    },
                },

                // total remaining
                totalRemaining: {
                    $sum: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$invoices",
                                    as: "inv",
                                    cond: { $ne: ["$$inv.status", "paid"] },
                                },
                            },
                            as: "inv",
                            in: "$$inv.amount",
                        },
                    },
                },

                // percentage (fixed)
                percentage: {
                    $cond: {
                        if: { $eq: [{ $sum: "$invoices.amount" }, 0] },
                        then: 0,
                        else: {
                            $multiply: [
                                {
                                    $divide: [
                                        {
                                            $sum: {
                                                $map: {
                                                    input: {
                                                        $filter: {
                                                            input: "$invoices",
                                                            as: "inv",
                                                            cond: {
                                                                $eq: [
                                                                    "$$inv.status",
                                                                    "paid",
                                                                ],
                                                            },
                                                        },
                                                    },
                                                    as: "inv",
                                                    in: "$$inv.amount",
                                                },
                                            },
                                        },
                                        { $sum: "$invoices.amount" },
                                    ],
                                },
                                100,
                            ],
                        },
                    },
                },
            },
        },
    ]);

    return res.status(200).json({
        message: "Supplier statistics retrieved successfully",
        data: { supplier },
    });
};
