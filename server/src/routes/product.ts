import express, {Request, Response} from "express";
import Cart from "../models/Cart.model";
import verifyToken from "../middlewares/auth";

const router = express.Router();

router.get('/products', (req, res) => {
    
})