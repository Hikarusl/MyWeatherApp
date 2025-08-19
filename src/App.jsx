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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <main>
        <PictureContainer></PictureContainer>
        <DataBody>
          <WeatherStatsGrid className="weather-data__stats " />
          <ForecastDiagram className="weather-data__hourly" />
          <RainfallSummary className="weather-data__rainfall" />
          <WeeklyForecastStrip className="weather-data__weekly" />
        </DataBody>
      </main>
    </>
  )
}

export default App
