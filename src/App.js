import React from 'react';
import CurrentLocation from './components/currentLocation';
import WeatherSearch from './components/searchLoaction';

import './App.css';

function App() {


  return (
    <div className='parent'>
      <h1>WeatherApp</h1>
    <div className='App'>
      {/* <h1>WeatherApp</h1> */}
      <CurrentLocation/>
      <WeatherSearch/>
    </div>
    </div>
  );
}

export default App;
