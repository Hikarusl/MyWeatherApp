import './ForecastIcon.scss'

const ForecastIcon = ({image, tooltip, addClass}) => {
  return (
    <div className={`forecast-icon ${addClass}`}>
      <img
        src="/src/assets/images/cloudy.svg"
        alt="cloudy"
      />
      <span className="forecast-icon__text">{tooltip}</span>
    </div>
  )
}

export default ForecastIcon