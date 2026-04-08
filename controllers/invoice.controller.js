import {
    createInvoiceService,
    getInvoicesService,
    getInvoiceByIdService,
    updateInvoiceService,
    deleteInvoiceService,
} from "../services/invoice.service.js";

export const createInvoiceController = async (req, res) => {
    try {
        return await createInvoiceService(req, res);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the invoice",
            error: error.message,
        });
    }
};

export const getInvoicesController = async (req, res) => {
    try {
        return await getInvoicesService(req, res);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching invoices",
            error: error.message,
        });
    }
};

export const getInvoiceByIdController = async (req, res) => {
    try {
        return await getInvoiceByIdService(req, res);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching the invoice",
            error: error.message,
        });
    }
};

export const updateInvoiceController = async (req, res) => {
    try {
        return await updateInvoiceService(req, res);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while updating the invoice",
            error: error.message,
        });
    }
};

export const deleteInvoiceController = async (req, res) => {
    try {
        return await deleteInvoiceService(req, res);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while deleting the invoice",
            error: error.message,
        });
    }
};
