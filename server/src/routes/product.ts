import express, { Request, Response } from "express";
import Product from "../models/Product.model";
import mongoose from "mongoose";

const router = express.Router();

router.get("/products/:id?", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page: string | undefined = req.query.page as string | undefined;

    const PAGE_SIZE = 10;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json({ data: product });
    }

    const skip = page ? (parseInt(page) - 1) * PAGE_SIZE : 0;

    const products = await Product.find().skip(skip).limit(PAGE_SIZE).exec();
    return res.status(200).json({ data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
