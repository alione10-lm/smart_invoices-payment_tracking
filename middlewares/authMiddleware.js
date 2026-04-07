import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ");

    if (!token) {
        res.status(401).json({
            message: "not authorized, no token provided !",
        });
    }
    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(404).json({
                message: "user not found  !",
            });
        }

        req.user = user;

        next();
    } catch (err) {
        res.status(401).json("invalid token ");
    }
};
