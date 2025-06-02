import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';
import WeatherForm from './components/weatherForm.jsx';
import WeatherWidget from './components/weatherWidget.jsx';
import { createWeather, deleteWeather, getAllWeather, updateWeather } from './services/weatherServices.jsx';




function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [editingData, setEditingData] = useState(null);

  const fetchWeather = async () => {
    try {
      const res = await getAllWeather();
      setWeatherData(res);
    } catch (err) {
      console.error('Error fetching weather records:', err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const handleAddOrUpdate = async (formData) => {
    try {
      if (editingData) {
        await updateWeather(editingData._id, formData);
        setEditingData(null);
      } else {
        await createWeather(formData);
      }
      fetchWeather();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (data) => {
    setEditingData({ ...data });
  };

  const handleDelete = async (id) => {
    await deleteWeather(id);
    fetchWeather();
  };

  return (
  
    <div>
      <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Weather App</h1>
      <WeatherForm onSubmit={handleAddOrUpdate} initialData={editingData} />
      <div className="grid gap-4">
        {weatherData.map((record) => (
          <WeatherWidget key={record._id} data={record} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>   
    </div>
   
  )
}

export default App
