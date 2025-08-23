import { useState, useEffect } from "react";
import {fetchCoordinates} from "../services/opencage.js";
import {fetchWeather} from "../services/openmeteo.js";
import {adaptWeatherData} from "../services/weatherAdapter.js";

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
        const apiResponse = await fetchWeather(lat, lon);

        // Адаптация здесь
        const normalizedData = adaptWeatherData(apiResponse, cityName, lat, lon);

        setData(normalizedData);

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