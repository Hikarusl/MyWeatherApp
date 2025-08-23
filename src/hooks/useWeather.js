import { useState, useEffect } from "react";
import {fetchCoordinates} from "../services/opencage.js";
import {fetchWeather} from "../services/openmeteo.js";

export function useWeather(city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const loadWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const { lat, lon, cityName } = await fetchCoordinates(city);
        const weatherData = await fetchWeather(lat, lon);

        setData({
          city: cityName,
          lat,
          lon,
          ...weatherData,
        });
      } catch (err) {
        setError(err.message || "Неизвестная ошибка");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [city]);

  return {data, loading, error};
}