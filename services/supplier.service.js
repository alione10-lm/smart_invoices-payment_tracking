import { Supplier } from "../models/supplier.model.js";

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
    const { name, email, phone } = req.body;

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
