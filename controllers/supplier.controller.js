import {
    getSuppliersService,
    createSupplierService,
    updateSupplierService,
    getSupplierByIdService,
    deleteSupplierService,
} from "../services/supplier.service.js";

export const createSupplierController = async (req, res) => {
    try {
        await createSupplierService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const getSupplierByIdController = async (req, res) => {
    try {
        await getSupplierByIdService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const getSuppliersController = async (req, res) => {
    try {
        console.log(req.user);

        await getSuppliersService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const updateSupplierController = async (req, res) => {
    try {
        await updateSupplierService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const deleteSupplierController = async (req, res) => {
    try {
        await deleteSupplierService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
