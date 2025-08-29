import './RainfallSummary.scss'

const RainfallSummary = ({className, currentData: {wind, precipitation}}) => {

  return (
    <div className={`rainfall-summary ${className}`}>
      <h3 className="visually-hidden">Информация о влажности и ветре</h3>
      <dl className="climate-stats">
        <div className="climate-stat">
          <dt className="climate-stat__label">
            Уровень осадков
          </dt>
          <dd className="climate-stat__value">
            <span className="number">{precipitation}</span>
            <span className="unit">мм</span>
          </dd>
        </div>

        <div className="climate-stat">
          <dt className="climate-stat__label">
            Скорость ветра
          </dt>
          <dd className="climate-stat__value">
            <span className="number">{wind}</span>
            <span className="unit">м/с</span>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default RainfallSummary