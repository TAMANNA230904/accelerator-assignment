export default function WeatherWidget({ data, onEdit, onDelete }) {

    const { city, state, startDate, endDate, weather_info, _id } = data;
    const uniqueDailyForecasts = [];
    const seenDates = new Set();
  
    for (const item of weather_info) {
      const date = new Date(item.dt_txt).toLocaleDateString();
      if (!seenDates.has(date)) {
        seenDates.add(date);
        uniqueDailyForecasts.push({
          date,
          temp: item.main.temp,
          feels_like: item.main.feels_like,
          humidity: item.main.humidity,
          description: item.weather[0].description,
        });
      }
    }
  
    return (
    <div  className="bg-gray-800 text-white p-4 rounded-lg shadow">
      <div >
      <h2  className="text-xl font-semibold capitalize">{city}</h2>
      <p className="text-sm mb-2">
        Date: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
      </p>

      <div className="space-y-2">
        {uniqueDailyForecasts.map((forecast, idx) => (
          <div key={idx} className="border-b border-gray-600 pb-2">
            <p className="font-medium">{forecast.date}</p>
            <p>🌡️ Temp: {forecast.temp}°C</p>
            <p>🥵 Feels Like: {forecast.feels_like}°C</p>
            <p>💧 Humidity: {forecast.humidity}%</p>
            <p>☁️ {forecast.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onEdit(data)}
          className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(data._id)}
          className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>

       
      </div>
      <iframe
  className="w-full h-64 mt-4 rounded"
  loading="lazy"
  allowFullScreen
  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAJeC5B1rb51dKKJP5uz44LvXi6skPJnbk&q=${city}`}>
</iframe>
</div>
    </div>
  );
};

  