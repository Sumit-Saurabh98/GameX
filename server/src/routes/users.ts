import express, { Request, Response } from "express";
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("country", "Country is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(500).json({ message: "already reistered user" });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      const userResponse = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        country: user.country,
        email: user.email,
      };

      return res.status(200).json({ message: "Registration Successful", user:userResponse});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went Wrong" });
    }
  }
);

export default router;
