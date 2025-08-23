import './PictureContainer.scss'
import ForecastIcon from "../ForecastIcon/ForecastIcon.jsx";

export default function PictureContainer( { temperature = 13,
                                            location = "Санкт-Петербург",
                                            time = "2025-11-15T12:00:00Z",
                                            code}) {
  return (
    <section className="picture-info container">
      <h2 className="visually-hidden">Погода сегодня</h2>
      <div className="picture-info__box ">
        <div className="picture-info__left">
          <ForecastIcon
            code={code}
          ></ForecastIcon>
          <div className="picture-info__temperature">
            <span className="number">{Math.round(temperature)}</span>
            <span className="unit">°C</span>
          </div>
          <div
            className="picture-info__place"
          >
            {formatCityName(location)}
          </div>
        </div>
        <div className="picture-info__right">
          <div className="picture-info__date">
            <time
              dateTime="2025-11-15"
              className="current-date"
            >
              {formatDate(new Date(time))}
            </time>
          </div>
        </div>
      </div>
    </section>
  )
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function formatCityName(city) {
  const match = city.match(/^([^,]*,[^,]*)(?:,|$)/);
  return match ? match[1] : city;
}