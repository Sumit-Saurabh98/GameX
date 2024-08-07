import mongoose from "mongoose"
require("dotenv").config()

const connection = async (): Promise<void> =>{
 try {
    await mongoose.connect(process.env.MONGODB_URL as string)
    console.log("Connected to MongoDB");
 } catch (error) {
    console.log("Couldn't connect to MongoDB: " + error)
 }
}

export default connection