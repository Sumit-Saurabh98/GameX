import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()
import connection from "./database/db.js"
import authRouter from "./routes/authRoutes.js"

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cookieParser()); 
app.use(express.json()); 
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));


app.use("/user", authRouter);

app.get("/test", (req, res) => {
    res.status(200).json({ message: "Test route" });
})


app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

connection().then(()=>{
    try {
        app.listen(PORT, ()=>{
            console.log(`Server connected to http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log('Cannot connect to the server')
    }
}).catch(error => console.log(error));