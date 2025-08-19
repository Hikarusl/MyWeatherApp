import './PictureContainer.scss'
import ForecastIcon from "../ForecastIcon/ForecastIcon.jsx";

export default function PictureContainer() {
  return (
    <section className="picture-info container">
      <h2 className="visually-hidden">Погода сегодня</h2>
      <div className="picture-info__box ">
        <div className="picture-info__left">
          <ForecastIcon
            image='cloudy.svg'
            tooltip='Облачно'
          ></ForecastIcon>
          <div className="picture-info__temperature">
            <span
              className="number"
              id="temperature"
            >13</span>
            <span className="unit">°C</span>
          </div>
          <div
            className="picture-info__place"
            id="location"
          >
            Санкт-Петербург
          </div>
        </div>
        <div className="picture-info__right">
          <div className="picture-info__date">
            <time
              dateTime="2025-11-15"
              className="current-date"
            >
              <span
                className="date"
                id="date"
              >среда, 15 ноября</span>
            </time>
          </div>
        </div>
      </div>
    </section>
  )
}