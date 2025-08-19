import './DataBody.scss'

const DataBody = ({children}) => {

  return (
    <section className="weather-data container">
      <h2 className="visually-hidden">Дополнительная информация о погоде</h2>
      <div className="weather-data__grid">
        {children}
      </div>
    </section>
  )
}

export default DataBody