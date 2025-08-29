import './DataBody.scss'

const DataBody = ({children, layout="weather"}) => {

  return (
    <section className="weather-data container">
      <h2 className="visually-hidden">Дополнительная информация о погоде</h2>
      <div className={`weather-data__grid weather-data__grid--${layout}`}>
        {children}
      </div>
    </section>
  )
}

export default DataBody