import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL;

const connection = async () =>{
 try {
    await mongoose.connect(MONGODB_URL)
    console.log("Connected to MongoDB");
 } catch (error) {
    console.log("Couldn't connect to MongoDB: " + error)
 }
}

export default connection