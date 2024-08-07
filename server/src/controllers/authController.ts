import { Request, Response } from "express";
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
require("dotenv").config();

export const signup = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { email, password, username } = req.body;

    // if user already exists with username
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(422)
        .json({ message: "User already exists with this username" });
    }

    // if user already exists with email
    const user2 = await User.findOne({ email });
    if (user2) {
      return res
        .status(422)
        .json({ message: "User already exists with this email" });
    }

    // hashing password
    const hashed_password = await bcrypt.hash(password, 10);

    // create new user
    const new_user = new User({
      username,
      email,
      password: hashed_password,
    });
    await new_user.save();

    res.status(200).json({ message: "Signup successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error during signup" });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User is not registered with this email" });
    }

    // comparing passwords
    const correct_password = await bcrypt.compare(password, user.password);

    if (!correct_password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.cookie("gamexauthtoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });
    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error during login" });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const token = req.cookies.gamexauthtoken;
    res.cookie("gamexauthtoken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error during logout" });
  }
};
