import './WeeklyForecastStrip.scss'
import ForecastIcon from "../ForecastIcon/ForecastIcon.jsx";

const WeeklyForecastStrip = ({className, weekData}) => {
  return (
    <>
      <h3 className="visually-hidden">Погода на неделю</h3>
      <ul className={`week ${className}`}>
        {weekData.map((data) => (
          <li className="week__item" key={data.day}>
            <h4 className="week__day">{data.day}</h4>
            <ForecastIcon
              code={data.weather_code}
              small={document.documentElement.clientWidth <= 700}
            ></ForecastIcon>
            <div className="week__temp">
              {data.temperature} °C
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default WeeklyForecastStrip