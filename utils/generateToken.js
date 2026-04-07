import jwt from "jsonwebtoken";

export const generateToken = ({ id, role }) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET_KEY, {
        expiresIn: "7d",
    });
};

export const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        return null;
    }
};

export const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};
