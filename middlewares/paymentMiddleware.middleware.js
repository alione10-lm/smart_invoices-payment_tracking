import { Invoice } from "../models/invoice.model";

export const validatePayment = async (req, res, next) => {
    const { amount } = req.body;

    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
        return res.status(404).json({ message: "Invoice not found" });
    }

    const totalPayments = await Payment.aggregate([
        { $match: { invoiceId: invoice._id } },
        { $group: { _id: "$invoiceId", totalPaid: { $sum: "$amount" } } },
    ]);

    const totalPaid = totalPayments.length > 0 ? totalPayments[0].totalPaid : 0;

    if (invoice.amount < amount) {
        return res.status(400).json({
            message: "Payment amount exceeds invoice amount",
        });
    }

    if (totalPaid + amount > invoice.amount) {
        return res.status(400).json({
            message: "Total payments exceed invoice amount",
        });
    }

    next();
};
