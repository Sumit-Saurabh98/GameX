
function authorizeRoles(allowedRoles = []) {
    return (req, res, next) => {
        if (!req.roles || !req.roles.some(role => allowedRoles.includes(role))) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        next();
    };
}

export default authorizeRoles