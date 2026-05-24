const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const protect = async (req, res, next) => {
    try {

        let token = null;

        // Cookie token
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // Header token
        if (!token && req.headers.authorization) {

            if (req.headers.authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
            } else {
                token = req.headers.authorization;
            }

        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel
            .findById(decoded.id)
            .select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};


function authorized(...roles) {
    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next(); // ✅ VERY IMPORTANT
    };
}

module.exports = { protect, authorized };