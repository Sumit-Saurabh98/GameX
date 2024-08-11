import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;


const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

     if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' })
    }
  try {
    const decoded = jwt.verify(accessToken, JWT_ACCESS_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Extract only the desired properties from the user object
    req.userId = user.id;
    req.username = user.username;
    req.roles = user.roles; 

    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error during authentication" });
  }
};

export default authenticate;
