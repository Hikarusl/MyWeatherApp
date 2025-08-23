import { API_CONFIG } from "../config/api.js";

export async function fetchWeather(lat, lon) {
  const res = await fetch(
    `${API_CONFIG.openMeteo.baseUrl}?latitude=${lat}&longitude=${lon}&${API_CONFIG.openMeteo.params}`
  );

  if (!res.ok) throw new Error("Ошибка при получении прогноза погоды");

  return res.json();
}