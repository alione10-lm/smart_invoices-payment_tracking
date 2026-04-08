import { body, validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
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

const validateSupplier = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("phone")
        .optional()
        .isMobilePhone("ar-MA")
        .trim()
        .withMessage("Invalid phone number format"),

    body("email").optional().isEmail().withMessage("Invalid email format"),

    body("adress").optional().trim(),

    body("contact").optional().trim(),

    handleValidation,
];

export { validateSupplier };
