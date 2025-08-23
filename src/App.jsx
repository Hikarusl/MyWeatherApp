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
              temperature={data.current.temperature_2m}
              location={data.city}
              time={data.current.time}
              code={data.current.weather_code}
            />
            <DataBody>
              <WeatherStatsGrid
                className="weather-data__stats"
                humidity={1}
                sunrise={1}
                sunset={1}
                uvIndex={1}
              />
              <ForecastDiagram
                className="weather-data__hourly"
                temps={data.hourly.temperature_2m}
              />
              <RainfallSummary
                className="weather-data__rainfall"
              />
              <WeeklyForecastStrip
                className="weather-data__weekly"
                date={data.current.time}
                temps={data.daily.temperature_2m_max}
                codes={data.daily.weather_code}
              />
            </DataBody>
          </>
        )}




      </main>
    </>
  )
}

export default App
