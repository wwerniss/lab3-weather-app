function WeatherCard({ weather }) {
  const temperature = Math.round(weather.main.temp)
  const feelsLike = Math.round(weather.main.feels_like)
  const description = weather.weather[0].description
  const city = weather.name
  const icon = weather.weather[0].icon

  const humidity = weather.main.humidity
  const pressure = weather.main.pressure
  const windSpeed = weather.wind?.speed
  const clouds = weather.clouds?.all

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div className="weather-card">
      <h2 className="weather-card__city">{city}</h2>
      <img src={iconUrl} alt="weather icon" className="weather-card__icon" />
      <p className="weather-card__temp">{temperature}°C</p>
      <p className="weather-card__desc">{description}</p>

      <div className="weather-card__details">
        <div className="weather-detail">
          <span className="weather-detail__label">Відчувається як</span>
          <span className="weather-detail__value">{feelsLike}°C</span>
        </div>
        <div className="weather-detail">
          <span className="weather-detail__label">Вітер</span>
          <span className="weather-detail__value">
            {windSpeed} м/с
          </span>
        </div>
        <div className="weather-detail">
          <span className="weather-detail__label">Вологість</span>
          <span className="weather-detail__value">{humidity}%</span>
        </div>
        <div className="weather-detail">
          <span className="weather-detail__label">Тиск</span>
          <span className="weather-detail__value">{pressure} гПа</span>
        </div>
        {typeof clouds === "number" && (
          <div className="weather-detail">
            <span className="weather-detail__label">Хмарність</span>
            <span className="weather-detail__value">{clouds}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default WeatherCard
