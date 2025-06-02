import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios'
import Weather from '../models/weather.model.js';


// export const createWeather=async(req,res)=>{
//   const {city,startDate,endDate}=req.body;
//   if(!city )
//     return res.status(400).json({message:"City is required"});

//   const start = new Date(startDate);
//   const end = new Date(endDate);

//     if(start > end ||   end-start> 5 * 24 * 60 * 60 * 1000) 
//     return res.status(400).json({message:"Invalid data range or the range exceeded 5 days."});
//     try {
//       const geoRes = await axios.get(
//         `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`
//       );
//       if (!geoRes.data || geoRes.data.length === 0) {
//         return res.status(404).json({ error: "Location not found" });
//       }

//       const locationData = geoRes.data[0]; // First match
//       const { lat, lon, name, state } = locationData;
//       const weatherRes = await axios.get(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
//       );

//       const filteredForecast = weatherRes.data.list.filter((item) => {
//         const dt = new Date(item.dt_txt);
//         return dt >= startDate && dt <= endDate;
//       });

//       if (filteredForecast.length === 0) {
//         return res.status(404).json({ error: "No weather data found for the specified date range" });
//       }

//       const record = new Weather(
//         { city,
//           state:state || "",
//           lat,
//           lon,
//           startDate,
//           endDate, 
//           weather_info:filteredForecast 

//         });

//         if(record)
//         await record.save();
//         res.status(200).json(record)
//     } catch (error) {
//         return res(500).json({message:"Error creating weather data", error});
//     }
// }


export const createWeather = async (req, res) => {
  const { city, startDate, endDate } = req.body;

  if (!city || !startDate || !endDate) {
    return res.status(400).json({ message: "City, startDate, and endDate are required" });
  }

  // Convert strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Validation
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (start > end || end - start > 5 * 24 * 60 * 60 * 1000) {
    return res.status(400).json({ message: "Invalid date range or range exceeds 5 days" });
  }

  try {
    const geoRes = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    if (!geoRes.data || geoRes.data.length === 0) {
      return res.status(404).json({ error: "Location not found" });
    }

    const { lat, lon, state = "" } = geoRes.data[0];

    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    // Filter forecasts based on time
    const filteredMap = new Map();
    weatherRes.data.list.forEach(item => {
    const dt = new Date(item.dt_txt);
    if (dt >= start && dt <= end) {
    const dateKey = dt.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    if (!filteredMap.has(dateKey)) {
      filteredMap.set(dateKey, item); // store first entry for the date
       }
     }
    });
   
    const filteredForecast = Array.from(filteredMap.values());

    if (filteredForecast.length === 0) {
      return res.status(404).json({ error: "No weather data found for the specified date range" });
    }

    const record = new Weather({
      city,
      state,
      lat,
      lon,
      startDate: start,
      endDate: end,
      weather_info: filteredForecast,
    });

    await record.save();
    res.status(200).json(record);
  } catch (error) {
    console.error("Weather fetch failed:", error);
    return res.status(500).json({ message: "Error creating weather data", error });
  }
};


export const getWeather=async(req,res)=>{
  try {
    const weatherData = await Weather.find();
    if (!weatherData) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching record', error: err.message });
  }
}


export const updateWeather=async(req,res)=>{
    const {city,startDate,endDate}=req.body;
    try {
    if (!city || !startDate || !endDate || new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ message: 'Invalid input' });
    }
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    const start = new Date(startDate);
    const end = new Date(endDate);

    const filteredForecast = weatherData.data.list.filter((item) => {
    const dt = new Date(item.dt_txt); // forecast datetime
    return dt >= start && dt <= end;
    });


    const updated = await Weather.findByIdAndUpdate(
      req.params.id,
      { city, startDate, endDate, weather_info:filteredForecast },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating record', error: err.message });
  }
}


export const deleteWeather=async(req,res)=>{
  try {
    const deleted = await Weather.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting record', error: err.message });
  }
}
