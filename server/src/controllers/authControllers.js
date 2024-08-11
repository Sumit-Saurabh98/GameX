
import User from "../models/User.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv"
dotenv.config()
import BlacklistedToken from "../models/BlacklistedToken.model.js";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;


export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(422).json({
        message: "Please fill in all fields (username, email and password)",
      });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(422).json({ 
        message: existingUser.username === username 
          ? "User already exists with this username" 
          : "User already exists with this email" 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: "Internal server error during signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        message: "Please provide both email and password",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, roles: user.roles },
      JWT_ACCESS_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_REFRESH_SECRET,
      { expiresIn: "1w" }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Login Successful",
      accessToken,
      refreshToken,
      id: user._id,
      name: user.username,
      profileImageUrl: user.profileImage,
      email: user.email,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: "Internal server error during login" });
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.userId;
    const token = req.headers.authorization?.split(' ')[1];

    if (!userId || !token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find the user and clear their refresh token
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the current access token to the blacklist
    const decodedToken = jwt.verify(token, JWT_ACCESS_SECRET);
  
  if (decodedToken && decodedToken.exp) {
    await BlacklistedToken.create({
      token,
      expiresAt: new Date(decodedToken.exp * 1000) // Convert UNIX timestamp to Date
    });
  }

    user.refreshToken = "";
    await user.save();

    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'none', secure: true });
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'none', secure: true });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: "Internal server error during logout" });
  }
};

export const generateRefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Verify the refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Check if the user exists and the refresh token matches
    const user = await User.findOne({ _id: decoded.userId, refreshToken });

    if (!user) {
      return res.status(401).json({ message: "User not found or token revoked" });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign(
      { userId: user._id, username: user.username, roles: user.roles },
      JWT_ACCESS_SECRET,
      { expiresIn: "30m" }
    );

    const newRefreshToken = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Update the refresh token in the database
    user.refreshToken = newRefreshToken;
    await user.save();

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(500).json({ message: "Internal server error during token refresh" });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.userId); // Use userId from the request body
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the new role already exists
    if (!user.roles.includes("admin")) {
      // Update the user's role
      user.roles.push("admin"); // Add the new role
    }

    await user.save(); // Save the updated user

    // Generate new access and refresh tokens
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, roles: user.roles },
      JWT_ACCESS_SECRET,
      { expiresIn: "30m" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Update the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({
      message: "Role changed successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Change role error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
