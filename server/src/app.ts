import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import connection from "./database/db";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use('/api/auth', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, async () => {
  try {
    connection()
    console.log(`server listening on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
