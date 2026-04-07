import { Supplier } from "../models/supplier.model";

const createSupplierService = async (req, res) => {
    const { name, email, phone } = req.body;

    const supplier = await Supplier.create({
        name,
        email,
        phone,
        userId: req.user.id,
    });

    return res.status(201).json({
        message: "Supplier created successfully",
        data: supplier,
    });
};

const getSuppliersService = async (req, res) => {
    const suppliers = await Supplier.find({ userId: req.user.id });

    return res.status(200).json({
        message: "Suppliers retrieved successfully",
        suppliers,
    });
};

const getSupplierByIdService = async (req, res) => {
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

const updateSupplierService = async (req, res) => {
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

export {
    createSupplierService,
    getSuppliersService,
    getSupplierByIdService,
    updateSupplierService,
};
