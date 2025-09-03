import './ErrorMessage.scss'

export default function ErrorMessage({message}) {
  const PoliteError = {
    "Ошибка при получении координат": "Не удалось определить координаты города. Попробуйте позже.",
    "Город не найден": "Такой город не найден. Проверьте правильность написания.",
    "Ошибка при получении прогноза погоды":"Не удалось загрузить прогноз. Попробуйте обновить страницу.",
    "Неизвестная ошибка": "Произошла непредвиденная ошибка. Попробуйте еще раз."
  }
  return (
    <div className="container">
      <div className="error-message " role="alert">
        <span className="error-message__icon">⚠️</span>
        <p className="error-message__text">{PoliteError[message]}</p>
      </div>
    </div>
  );
}