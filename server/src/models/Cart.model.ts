import mongoose from "mongoose"
import { Images } from "./Product.model";

export type CartType = {
    img: Images,
    title: string,
    cprice: number,
    color: string,
}

const cartSchema = new mongoose.Schema({
  img: {
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
  },
    title: String,
    cprice: Number,
    color: String,
});

const Cart = mongoose.model<CartType>("Cart", cartSchema);

export default Cart;