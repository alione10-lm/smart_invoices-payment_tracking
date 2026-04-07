import {
    loginService,
    registerService,
    getProfileService,
} from "../services/auth.service.js";

export const loginController = async (req, res) => {
    try {
        await loginService(req, res);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const registerController = async (req, res) => {
    try {
        await registerService(req, res);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getProfileController = async (req, res) => {
    try {
        await getProfileService(req, res);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
