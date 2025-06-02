import express from 'express';
import cors from 'cors';
import axios from 'axios';
import weatherRoutes from './routes/weather.routes.js';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
dotenv.config();
const app=express()
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use(express.json());    
app.use('/api',weatherRoutes)

// const weatherRes = await axios.get(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=7cf8042d643e6bcfa1c39c08f30b56b5&units=metric`
//   );

//   console.log(weatherRes.data)
app.listen(process.env.PORT,()=>{
    console.log("Server is running on port",process.env.PORT);
    connectDB();
})

