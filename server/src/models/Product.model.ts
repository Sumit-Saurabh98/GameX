import mongoose from "mongoose"

export interface Images{
    img1: string,
    img2: string,
    img3: string,
    img4: string,
    img5: string,
}

export interface Specifications{
  processor: string,
  windows: string,
  screen: number,
  force: string,
  storage: string
}

export type ProductType = {
    img: Images,
    specifications: Specifications,
    title: string,
    price: number,
    cprice: number,
    color: string,
    quantity: number,

}

const productSchema = new mongoose.Schema({
  img: {
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
  },
    title: String,
    secifications: {
      processor: String,
      windows: String,
      screen: Number,
      force: String,
      storage: String
    },
    price: Number,
    cprice: Number,
    color: String,
    quantity: Number,
});

const Product = mongoose.model<ProductType>("Product", productSchema);

export default Product;