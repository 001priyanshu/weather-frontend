import React, { useState } from 'react';
import './currentLocationCss.css'
import axios from 'axios';

function WeatherApp() {
  const [city, setCity] = useState('');
  const [nocity,setNocity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
      setCity(res.data.address.city);
      getWeatherData(res.data.address.city);
    });
  };

  const getWeatherData = async (city) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post('https://weather-app-e1hv.onrender.com/weather/', { city }, config);
      console.log(res);
      setWeatherData(res.data);
    } catch (error) {
       setNocity(error);
      console.log("No City found");
    }
  };
  const clear  = async () => {
    setCity('');
    setNocity(null);
    setWeatherData(null);
  }
  return (
    <div className='weather-app'>
      <h1>Current Weather</h1>
      <button onClick={getCurrentLocation}>Get Current Location Weather</button>
      <div className='description'>

      {weatherData && (
        <div>
          <h2>The wheather of  {city} is</h2>
          <h5>Description- {weatherData.weatherDescription}</h5>
          <h5>Temperature - {weatherData.main.temp}</h5>
          <h5>Humidity- {weatherData.main.humidity}</h5>

          <button onClick={clear} >Clear</button>
        </div>
      )}
      </div>
      {nocity && (
        <div>
          <h1>Enter correct city name</h1>
          </div>
      )}

    </div>
  );
}

export default WeatherApp;
