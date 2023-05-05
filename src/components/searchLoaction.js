import React, { useState } from 'react';
import axios from 'axios';
import './searchLocationCss.css'


function WeatherSearch() {
  const [city, setCity] = useState('');
  const [nocity, setNocity] = useState(null);

  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post('https://weather-app-e1hv.onrender.com/weather/', { city }, config);
      setWeatherData(res.data);
      // console.log(res.data);
    } catch (error) {
      setNocity(error);

      console.log("No City found");
    }
  };
  const clear = async () => {
    setCity('');
    setNocity(null);
    setWeatherData(null);
  }

  return (
    <div className='weather-search'>
      <h1>Weather Search</h1>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div className='description'>

        {weatherData && (
          <div>
            <h1>The Weather of {city} is</h1>
            <h5>Description- {weatherData.weatherDescription}</h5>
            <h5>Temperature - {weatherData.main.temp}</h5>
            <h5>Humidity- {weatherData.main.humidity}</h5>

            <button onClick={clear} >Clear</button>
          </div>
        )}
      </div>
      {nocity && (
        <div>
          <h3>Enter correct city name</h3>
          <button onClick={clear} >Clear</button>
        </div>
      )}
    </div>
  );
}

export default WeatherSearch;
