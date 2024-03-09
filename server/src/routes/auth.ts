import express, {Request, Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import verifyToken from "../middlewares/auth";


const router = express.Router();

router.post('/login', [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
], async (req:Request, res:Response) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const {email, password} = req.body;

    try {
        
        const user = await User.findOne({ email});

        if(!user){
            return res.status(400).json({ message:"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

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

      res.status(200).json({user: userResponse});

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }

})

router.get("/validate-token", verifyToken, (req:Request, res:Response)=>{
  res.status(200).send({userId: req.userId})
})

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.status(200).json({message:"Logout Successful"});
});

export default router;