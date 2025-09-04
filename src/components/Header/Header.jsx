import './Header.scss';
import SearchBar from '../SearchBar/SearchBar.jsx';

const Header = ({ handleSearch }) => {
  return (
    <header className="header container">
      <h1 className="header__title h2">MyWeatherApp</h1>
      <div className="header__search">
        <SearchBar handleSearch={handleSearch} />
      </div>
    </header>
  );
};

export default Header;
