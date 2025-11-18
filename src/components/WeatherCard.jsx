function WeatherCard({ weather }) {
  const temperature = Math.round(weather.main.temp)
  const description = weather.weather[0].description
  const city = weather.name
  const icon = weather.weather[0].icon

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`

  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <img src={iconUrl} alt="weather icon" />
      <p className="temp">{temperature}°C</p>
      <p className="desc">{description}</p>
    </div>
  )
}

export default WeatherCard
