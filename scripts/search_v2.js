import { drawDiagram } from './diagram.js';

// Конфигурация API
const API_CONFIG = {
  openCage: {
    apiKey: '42a5235d6e4f4872b1122616dfd3d838',
    baseUrl: 'https://api.opencagedata.com/geocode/v1/json',
    params: 'no_annotations=1&no_dedupe=1&limit=1'
  },
  openMeteo: {
    baseUrl: 'https://api.open-meteo.com/v1/forecast',
    params: 'daily=weather_code,temperature_2m_max&hourly=temperature_2m,rain,apparent_temperature&current=temperature_2m,rain,weather_code,wind_speed_10m'
  }
};

// Элементы DOM
const elements = {
  searchButton: document.getElementById('searchButton'),
  searchInput: document.getElementById('citySearch'),
  location: document.getElementById('location'),
  temperature: document.getElementById('temperature'),
  date: document.getElementById('date')
};

// Обработчик поиска
elements.searchButton.addEventListener('click', async (event) => {
  event.preventDefault();
  
  const location = elements.searchInput.value.trim();
  if (!location) {
    alert('Пожалуйста, введите название города');
    return;
  }

  try {
    toggleLoadingState(true);
    const coords = await getCoordinates(location);
    const weatherData = await getHourlyWeather(coords.lat, coords.lon);
    await updateWeatherUI(coords.name, weatherData);
  } catch (error) {
    handleApiError(error);
  } finally {
    toggleLoadingState(false);
  }
});

// Получение координат города
async function getCoordinates(city) {
  const url = `${API_CONFIG.openCage.baseUrl}?q=${encodeURIComponent(city)}&key=${API_CONFIG.openCage.apiKey}&${API_CONFIG.openCage.params}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка API: ${response.status}`);
  }

  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error('Город не найден');
  }

  const firstResult = data.results[0];
  return {
    name: firstResult.formatted,
    lat: firstResult.geometry.lat,
    lon: firstResult.geometry.lng
  };
}

// Получение данных о погоде
async function getHourlyWeather(lat, lon) {
  const url = `${API_CONFIG.openMeteo.baseUrl}?latitude=${lat}&longitude=${lon}&${API_CONFIG.openMeteo.params}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Ошибка погодного API: ${response.status}`);
  }

  return await response.json();
}

// Обновление интерфейса
async function updateWeatherUI(city, weatherData) {
  updateMainWeatherInfo(city, weatherData);
  updateWeekForecast(weatherData.daily);
  await updateWeatherIcons(weatherData.daily.weather_code);
  drawDiagram(weatherData.hourly.temperature_2m.slice(0, 9));
}

function updateMainWeatherInfo(city, weatherData) {
  elements.location.textContent = formatCityName(city);
  elements.temperature.textContent = Math.round(weatherData.current.temperature_2m);
  elements.date.textContent = formatDate(new Date(weatherData.current.time));
}

function formatCityName(city) {
  const match = city.match(/^([^,]*,[^,]*)(?:,|$)/);
  return match ? match[1] : city;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

function updateWeekForecast(dailyData) {
  const weekItems = document.querySelectorAll('.week__item');
  
  weekItems.forEach((item, index) => {
    const tempElement = item.querySelector('.week__temp');
    tempElement.textContent = `${Math.round(dailyData.temperature_2m_max[index])}°C`;
  });
}

async function updateWeatherIcons(weatherCodes) {
  try {
    const weatherIcons = await loadWeatherIcons();
    const iconContainers = document.querySelectorAll('.tooltip');
    
    iconContainers.forEach((container, index) => {
      const dayIndex = container.classList.contains('picture-info__icon-box') ? 0 : index;
      const weatherCode = weatherCodes[dayIndex] || 0;
      renderWeatherIcon(container, weatherIcons[weatherCode]);
    });
  } catch (error) {
    console.error('Не удалось загрузить иконки погоды:', error);
  }
}

async function loadWeatherIcons() {
  const response = await fetch('../data/weather-codes.json');
  return await response.json();
}


function renderWeatherIcon(container, weather) {
  if (!weather) {
    console.error('Invalid weather data:', container);
    container.innerHTML = '<span class="error-icon">⚠</span>';
    return;
  }
 
  container.innerHTML = `
    <img src="${weather.image}" 
         alt="${weather.description}"
         loading="lazy">
    <span class="tooltip__text">${weather.description}</span>
  `;
}

function toggleLoadingState(isLoading) {
  elements.searchButton.disabled = isLoading;
  elements.searchInput.disabled = isLoading;
}

function handleApiError(error) {
  console.error('Ошибка:', error);
  alert(error.message || 'Произошла ошибка при загрузке данных');
}