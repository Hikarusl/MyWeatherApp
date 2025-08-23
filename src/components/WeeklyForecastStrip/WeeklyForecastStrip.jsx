import './WeeklyForecastStrip.scss'
import ForecastIcon from "../ForecastIcon/ForecastIcon.jsx";

const WeeklyForecastStrip = ({className, weekData}) => {

  return (
    <ul className={`week ${className}`}>
      {weekData.map((data) => (
        <li className="week__item" key={data.day}>
          <h4 className="week__day">{data.day}</h4>
          <ForecastIcon
            code={data.weather_code}
          ></ForecastIcon>
          <div className="week__temp">
            {data.temperature} °C
          </div>
        </li>
      ))}
    </ul>
  )
}

export default WeeklyForecastStrip