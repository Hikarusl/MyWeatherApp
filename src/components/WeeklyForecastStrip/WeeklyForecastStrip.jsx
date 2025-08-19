import './WeeklyForecastStrip.scss'
import ForecastIcon from "../ForecastIcon/ForecastIcon.jsx";

const WeeklyForecastStrip = ({className}) => {
  const weekData = [
    {
      day: 'ПН',
      weather: 'cloudy',
      temperature: 12
    },
    {
      day: 'ВТ',
      weather: 'rainy',
      temperature: 10
    },
    {
      day: 'СР',
      weather: 'sunny',
      temperature: 18
    },
    {
      day: 'ЧТ',
      weather: 'partly-cloudy',
      temperature: 15
    },
    {
      day: 'ПТ',
      weather: 'cloudy',
      temperature: 14
    },
    {
      day: 'СБ',
      weather: 'sunny',
      temperature: 20
    },
    {
      day: 'ВС',
      weather: 'rainy',
      temperature: 11
    },
  ];

  return (
    <ul className={`week ${className}`}>
      {weekData.map((data) => (
        <li className="week__item" key={data.day}>
          <h4 className="week__day">{data.day}</h4>
          <ForecastIcon
            image='cloudy.svg'
            tooltip='Облачно'
            addClass='day-0'
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