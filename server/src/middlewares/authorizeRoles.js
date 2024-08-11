import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

function authorizeRoles(roles = []) {
    return (req, res, next) => {
        const authHeader = req.cookies.accessToken;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Access token is missing" });
        }

        try {
            const payload = jwt.verify(accessToken, JWT_ACCESS_SECRET);
            console.log(payload);

            // Check if any of the user's roles match the allowed roles
            if (!roles.some(role => payload.roles.includes(role))) {
                return res.status(403).json({ message: "Forbidden: You do not have access to this resource" });
            }

            req.user = payload;
            next();
        } catch (error) {
            console.error("JWT verification error:", error);
            return res.status(401).json({ message: "Invalid access token" });
        }
    };
}

export default authorizeRoles;