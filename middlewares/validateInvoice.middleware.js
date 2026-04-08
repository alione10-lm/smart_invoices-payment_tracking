import { body, validationResult } from "express-validator";

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((e) => ({
                field: e.path,
                message: e.msg,
            })),
        });
    }
    next();
};

export const validateInvoice = [
    body("supplierId").trim().notEmpty().withMessage("Supplier ID is required"),

    body("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be a positive number"),

    body("dueDate").isDate().withMessage("Invalid due date format"),

    body("description").optional().trim(),

    handleValidation,
];
