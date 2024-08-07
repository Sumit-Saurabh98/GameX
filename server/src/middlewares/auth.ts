import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface CustomJwtPayload extends JwtPayload {
  userId: string;
  username: string;
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string = req.cookies.gamexauthtoken;

    if (!token) {
      return res.status(401).json({message:"Please login"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal server error during authentication" });
  }
};

export default authenticate;