import express from 'express';
import { SchoolRouter } from './routes/schoolRoutes.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.use('/schools', SchoolRouter);

app.listen(3000, (req,res)=>{
    console.log("Server at 3000");
})