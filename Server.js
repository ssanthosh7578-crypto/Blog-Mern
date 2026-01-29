import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Router from "./Routes.js";

dotenv.config();
const PORT = 1000;

const app = express();

/* CORS */
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,          // allow cookies
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    allowedHeaders: ["Content-Type", "Authorization"] // allowed headers
}));

/* Body parser */
app.use(express.json());

/* Cookie parser */
app.use(cookieParser());

/* Routes */
app.use("/api/auth", Router);
app.use("/Uploads", express.static("Uploads"));
/* Start server */
app.listen(PORT, () => console.log("Server running on", PORT));

/* MongoDB */
mongoose.connect("mongodb://127.0.0.1:27017/blog")
    .then(() => console.log("Mongo connected"))
    .catch(err => console.log(err));
