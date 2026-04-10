export const roleMiddleware = async (req, res, next) => {
    const user = req.user;

    if (user.role !== "admin") {
        return res.status(403).json({
            message: "forbidden access !",
        });
    }
    next();
};
