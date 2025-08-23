import './Header.scss'

const Header = ({children}) => {
  return (
    <header className="header container">
      <h1 className="header__title h2">MyWeatherApp</h1>
      <div className="header__search">
        {children}
      </div>
    </header>
  )
}

export default Header