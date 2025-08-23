import { useState } from 'react'
import SearchBar from "./components/SearchBar/SearchBar.jsx";
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
      <Header>
        <SearchBar handleSearch={handleSearch}></SearchBar>
      </Header>
      <main>
        {loading && <p>Загрузка...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {data &&  (
          <>
            <PictureContainer
              currentData={data.current}
              location={data.city}
            />
            <DataBody>
              <WeatherStatsGrid
                className="weather-data__stats"
                currentData={data.current}
              />
              <ForecastDiagram
                className="weather-data__hourly"
                hourlyData={data.hourly}
              />
              <RainfallSummary
                className="weather-data__rainfall"
                currentData={data.current}
              />
              <WeeklyForecastStrip
                className="weather-data__weekly"
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
