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
        const decoded = jwt.decode(token[1], process.env.JWT_SECRET_KEY);

        console.log(decoded);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "user not found  !",
            });
        }

        req.user = user;

        console.log(user);

        next();
    } catch (err) {
        res.status(401).json({ message: "invalid token", error: err.message });
    }
};
