export const API_CONFIG = {
  openCage: {
    apiKey: "42a5235d6e4f4872b1122616dfd3d838",
    baseUrl: "https://api.opencagedata.com/geocode/v1/json",
    params: "no_annotations=1&no_dedupe=1&limit=1",
  },
  openMeteo: {
    baseUrl: "https://api.open-meteo.com/v1/forecast",
    lastUrl: "daily=weather_code,temperature_2m_max&hourly=temperature_2m,rain,apparent_temperature&current=temperature_2m,rain,weather_code,wind_speed_10m",
    params:
      "daily=weather_code,temperature_2m_max,sunrise,sunset,uv_index_max&hourly=temperature_2m,rain&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&forecast_hours=24&temporal_resolution=hourly_3",
  },
};