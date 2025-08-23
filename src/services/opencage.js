import { API_CONFIG } from "../config/api.js";

export async function fetchCoordinates(city) {
  const res = await fetch(
    `${API_CONFIG.openCage.baseUrl}?q=${encodeURIComponent(
      city
    )}&key=${API_CONFIG.openCage.apiKey}&${API_CONFIG.openCage.params}`
  );

  if (!res.ok) throw new Error("Ошибка при получении координат");

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("Город не найден");
  }

  const firstResult = data.results[0];
  return {
    lat: firstResult.geometry.lat,
    lon: firstResult.geometry.lng,
    cityName: firstResult.formatted,
  };
}