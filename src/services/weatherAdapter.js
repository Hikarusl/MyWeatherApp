const WEEK_DAYS = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];


export function adaptWeatherData(apiResponse, cityName, lat, lon) {
  const TODAY = new Date(apiResponse.current.time).getDay()

  return {
    city: cityName,
    current: {
      temp: apiResponse.current.temperature_2m,
      time: apiResponse.current.time,
      weather_code: apiResponse.current.weather_code,
      wind: apiResponse.current.wind_speed_10m,
      precipitation: apiResponse.current.precipitation,
      humidity: apiResponse.current.relative_humidity_2m,

      uvIndex: apiResponse.daily.uv_index_max[0],
      sunset: apiResponse.daily.sunset[0].split('T')[1],
      sunrise: apiResponse.daily.sunrise[0].split('T')[1],
    },
    week: apiResponse.daily.time.map((date, i) => ({
      day: WEEK_DAYS[(TODAY+i)%7],
      weather_code: apiResponse.daily.weather_code[i] ,
      temperature:  Math.round(+apiResponse.daily.temperature_2m_max[i]),
    })),
    hourly: apiResponse.hourly.time.map((date, i) => ({
      time: date.split('T')[1],
      temperature: Math.round(+apiResponse.hourly.temperature_2m[i]),
      rain: Math.round(+apiResponse.hourly.rain[i]),
    })),
  };
}