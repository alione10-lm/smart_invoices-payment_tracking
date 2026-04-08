import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
    {
        descruption: {
            type: String,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Supplier",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["partially_paid", "paid", "unpaid"],
            default: "unpaid",
        },
    },
    { timestamps: true },
);

export const Invoice = mongoose.model("Invoice", invoiceSchema);
