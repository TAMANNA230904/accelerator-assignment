import axios from 'axios';

//const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = '/api';;

export const createWeather = async (payload) => {
  const res = await axios.post(`${BASE_URL}/createWeather`, payload);
  return res.data;
};

export const deleteWeather = async (id) => {
  const res = await axios.delete(`${BASE_URL}/deleteWeather/${id}`);
  return res.data;
};

export const updateWeather = async (id, payload) => {
  const res = await axios.put(`${BASE_URL}/updateWeather/${id}`, payload);
  return res.data;
};

// export const getWeather = async (id) => {
//   const res = await axios.get(`${BASE_URL}/getWeather/${id}`);
//   return res.data;
// };

export const getAllWeather = async () => {
  const res = await axios.get(`${BASE_URL}/getAllWeather`);
  return res.data;
};

