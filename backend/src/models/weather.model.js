import mongoose from 'mongoose'


const weatherSchema=new mongoose.Schema(
    {
         city: {
            type: String,
            required: true,
          },
          state:{
            type: String,
          },
  
          lat: {
            type: Number,
            required: true,
          },
          lon: {
            type: Number,
            required: true,
          },
          startDate: {
            type: Date,
            required:true,
          },
          endDate: {
            type: Date,
            required: true,
          },
          weather_info:Object
          
    },
    {timestamps:true}
)

const Weather=mongoose.model("Weather",weatherSchema)
export default Weather;