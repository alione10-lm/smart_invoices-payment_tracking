import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        invoiceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Invoice",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        note: {
            type: String,
        },

        paymentDate: {
            type: Date,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        paymentMode: {
            type: String,
            enum: ["cash", "check", "bank_transfer"],
            required: true,
        },
    },
    { timestamps: true },
);

export const Payment = mongoose.model("Payment", paymentSchema);
