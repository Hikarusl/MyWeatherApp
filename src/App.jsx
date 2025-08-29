import { useState } from 'react'
import Header from "./components/Header/Header";
import PictureContainer
  from "./components/PictureContainer/PictureContainer";
import DataBody from "./components/DataBody/DataBody";
import WeatherStatsGrid
  from "./components/WeatherStatsGrid/WeatherStatsGrid.jsx";
import WeeklyForecastStrip
  from "./components/WeeklyForecastStrip/WeeklyForecastStrip.jsx";
import RainfallSummary from "./components/RainfallSummary/RainfallSummary.jsx";
import ForecastDiagram
  from "./components/ForecastDiagram/ForecastDiagram.jsx";
import {useWeather} from "./hooks/useWeather.js";
import Loader from "./components/Loader/Loader.jsx";

function App() {
  const [city, setCity] = useState('Санкт-Петербург')
  const { data, loading, error } = useWeather(city);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.elements.city.value.trim();
    if (value) setCity(value);
  };

  return (
    <>
      <Header handleSearch={handleSearch}></Header>
      <main>
        {loading && <Loader/>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data &&  (
          <>
            <PictureContainer
              currentData={data.current}
              location={data.city}
            />
            <DataBody>
              <WeatherStatsGrid
                className="weather-card weather-data__stats"
                currentData={data.current}
              />
              <ForecastDiagram
                className="weather-card weather-data__hourly"
                hourlyData={data.hourly}
              />
              <RainfallSummary
                className="weather-card weather-card--gradient weather-data__rainfall"
                currentData={data.current}
              />
              <WeeklyForecastStrip
                className="weather-card weather-card--colored weather-data__weekly"
                weekData={data.week}
              />
            </DataBody>
          </>
        )}
      </main>
    </>
  )
}

export default App
