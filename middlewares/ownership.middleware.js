import { Supplier } from "../models/supplier.model.js";

export const supplierOwnershipMiddleware = async (req, res, next) => {
    const { id } = req.user;

    console.log(req.params);

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
