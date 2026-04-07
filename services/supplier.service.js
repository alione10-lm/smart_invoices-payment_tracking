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

export { createSupplierService };
