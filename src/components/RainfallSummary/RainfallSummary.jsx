import './RainfallSummary.scss'

const RainfallSummary = ({className}) => {

  return (
    <div className={`rainfall-summary ${className}`}>
      <dl className="climate-stats">
        <div className="climate-stat">
          <dt className="climate-stat__label">
            Осадки за месяц
          </dt>
          <dd className="climate-stat__value">
            <span className="number">45</span>
            <span className="unit">мм</span>
          </dd>
        </div>

        <div className="climate-stat">
          <dt className="climate-stat__label">
            В этом году
          </dt>
          <dd className="climate-stat__value">
            <span className="number">+17</span>
            <span className="unit">%</span>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default RainfallSummary