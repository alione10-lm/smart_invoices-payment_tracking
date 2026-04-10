import { Invoice } from "../models/invoice.model.js";
import { Supplier } from "../models/supplier.model.js";

export const getAdminDashboardController = async (req, res) => {
    const invoices = await Invoice.find();
    const suppliers = await Supplier.find();

    return res.status(200).json({
        message: "Admin dashboard data retrieved successfully",
        data: {
            invoices,
            suppliers,

            invoiceCount: invoices.length,
            supplierCount: suppliers.length,
        },
    });
};
