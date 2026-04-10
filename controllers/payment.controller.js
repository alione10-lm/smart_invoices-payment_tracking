import {
    createPaymentService,
    updatePaymentService,
    deletePaymentService,
    getPaymentsService,
    getPaymentByIdService,
} from "../services/payment.service.js";

export const createPaymentController = async (req, res) => {
    try {
        await createPaymentService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

export const getPaymentsController = async (req, res) => {
    try {
        await getPaymentsService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",

            error: error.message,
        });
    }
};

export const getPaymentByIdController = async (req, res) => {
    try {
        await getPaymentByIdService(req, res);
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
