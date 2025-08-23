import './ForecastIcon.scss'
import weatherCodes from "../../assets/data/weather-codes.json";

const ForecastIcon = ({code, addClass=''}) => {
  const weather = weatherCodes[code]
  return (
    <div className={`forecast-icon ${addClass}`}>
      <img
        className="forecast-icon__img"
        src={weather.image}
        alt={weather.description}
      />
      <span className="forecast-icon__text">{weather.description}</span>
    </div>
  )
}

export default ForecastIcon