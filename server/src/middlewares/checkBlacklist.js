// middleware/checkBlacklist.ts

import BlacklistedToken from '../models/BlacklistedToken.model.js';

export const checkBlacklist = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const blacklistedToken = await BlacklistedToken.findOne({ token });

  if (blacklistedToken) {
    return res.status(401).json({ message: "Token has been revoked" });
  }

  next();
};