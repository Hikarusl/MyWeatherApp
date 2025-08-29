import './ForecastIcon.scss'
import weatherCodes from "../../assets/data/weather-codes.json";

const ForecastIcon = ({code, addClass='', small=false}) => {
  const weather = weatherCodes[code]
  const size = small ? 25 : 60
  return (
    <div className={`forecast-icon ${addClass}`}>
      <img
        className="forecast-icon__img"
        src={weather.image}
        alt={weather.description}
        style={{ width: size, height: size }}
      />
      <span className="forecast-icon__text">{weather.description}</span>
    </div>
  )
}

export default ForecastIcon