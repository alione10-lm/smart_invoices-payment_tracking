import { loginService, registerService } from "../services/auth.service.js";

const loginController = async (req, res) => {
    try {
        await loginService(req, res);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const registerController = async (req, res) => {
    try {
        await registerService(req, res);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export { loginController, registerController };
