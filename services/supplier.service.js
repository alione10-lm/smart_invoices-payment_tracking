import { Invoice } from "../models/invoice.model.js";
import { Supplier } from "../models/supplier.model.js";
import { Payment } from "../models/payment.model.js";

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
    const { name, invoiceId } = req.query;

    const query = {};

    if (name) {
        query.name = name;
    }

    // const suppliers = await Supplier.find({ userId: req.user.id, ...query });

    const suppliersWithInvoices = await Supplier.aggregate([
        {
            $match: {
                userId: req.user.id,
            },
        },
        {
            $group: {
                _id: null,
            },
        },
        // {
        //     $lookup: {
        //         from: "invoices",
        //         localField: "_id",
        //         foreignField: "supplierId",
        //         as: "invoices",
        //     },
        // },
        // {
        //     $project: {
        //         invoices: 1,
        //     },
        // },
    ]);

    return res.status(200).json({
        message: "Suppliers retrieved successfully",
        suppliersWithInvoices,
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

                totalInvoices: { $size: "$invoices" },

                totalAmount: { $sum: "$invoices.amount" },

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
            },
        },
    ]);

    return res.status(200).json({
        message: "Supplier statistics retrieved successfully",
        data: {
            ...supplier[0],

            percentage:
                supplier[0].totalAmount === 0
                    ? 0
                    : (supplier[0].totalPaid / supplier[0].totalAmount) * 100,
        },
    });
};
