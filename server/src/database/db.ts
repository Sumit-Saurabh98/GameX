import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connection = async()=>{
    try {
         await mongoose.connect(process.env.MONGODB_URL as string)
         console.log("Database Connected")
    } catch (error) {
        console.error("Error occurred while connecting to Database", error)
    }
}

export default connection;