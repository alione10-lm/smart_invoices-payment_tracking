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

const validateRegister = [
    body("name").trim().notEmpty().withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 4 })
        .withMessage("Password must be at least 6 characters"),
    body("password_confirmation")
        .notEmpty()
        .withMessage("Password confiramtion  is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    "password confiramtion doesn't match the password ",
                );
            }
            return true;
        }),

    body("role")
        .isIn(["client", "admin"])
        .withMessage("Role must be client or admin"),

    handleValidation,
];

const validateLogin = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email format"),

    body("password").notEmpty().withMessage("Password is required"),

    handleValidation,
];

export { handleValidation, validateRegister, validateLogin };
