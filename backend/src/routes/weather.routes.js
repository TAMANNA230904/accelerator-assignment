import express from 'express';
import { createWeather, deleteWeather, getWeather, updateWeather } from '../controllers/weather.controllers.js';
const router=express.Router();

router.post('/createWeather',createWeather)
router.get('/getAllWeather',getWeather)
router.put('/updateWeather/:id',updateWeather)
router.delete('/deleteWeather/:id',deleteWeather)

export default router;