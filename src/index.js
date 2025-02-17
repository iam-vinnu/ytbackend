import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;





app.listen(PORT , ()=>{
    connectDB();
    console.log(`Server listing at ${PORT}`);
})
