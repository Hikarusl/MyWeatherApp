import './WeeklyForecastStrip.scss'
import ForecastIcon from "../ForecastIcon/ForecastIcon.jsx";


const days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

const WeeklyForecastStrip = ({className,
                             date,
                             temps,
                             codes}) => {
  const d = (new Date(date)).getDay();
  const weekData = temps.map((temp, i) => {
      return {
        day: days[(d+i)%7],
        temperature: Math.round(temp),
        code: codes[i]
      }
  })

  return (
    <ul className={`week ${className}`}>
      {weekData.map((data) => (
        <li className="week__item" key={data.day}>
          <h4 className="week__day">{data.day}</h4>
          <ForecastIcon
            code={data.code}
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