import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the specifications schema
const specificationsSchema = new Schema({
  processor: { type: String, required: true },
  windows: { type: String, required: true },
  screen: { type: Number, required: true },
  force: { type: String, required: true },
  storage: { type: String, required: true },
});

// Define the images schema
const imagesSchema = new Schema({
  img1: { type: String, required: true },
  img2: { type: String, required: true },
  img3: { type: String, required: true },
  img4: { type: String, required: true },
  img5: { type: String, required: true },
});

// Define the main product schema
const productSchema = new Schema({
  img: { type: imagesSchema, required: true },
  title: { type: String, required: true },
  specifications: { type: specificationsSchema, required: true },
  price: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Create the model
const Product = mongoose.model('Product', productSchema);

export default Product;