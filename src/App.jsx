import { useState } from "react"
import SearchForm from "./components/SearchForm"
import WeatherCard from "./components/WeatherCard"
import ForecastList from "./components/ForecastList"
import { getWeather, getForecast } from "./api/getWeather"

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const current = await getWeather(city)
      setWeather(current)

      const forecastData = await getForecast(city)
      setForecast(forecastData)
    } catch (err) {
      setError(err)
      setWeather(null)
      setForecast(null)
    }

    setLoading(false)
  }

  return (
    <div className="app">
      <h1 className="app__title">Weather App</h1>

      <SearchForm
        city={city}
        onCityChange={setCity}
        onSearch={handleSearch}
      />

      {loading && (
        <p className="status-message">Завантаження...</p>
      )}

      {error && (
        <p className="status-message status-message--error">
          Помилка: {error}
        </p>
      )}

      {weather && <WeatherCard weather={weather} />}

      {forecast && <ForecastList forecast={forecast} />}

      <p className="app__footer">
        Дані надані сервісом OpenWeatherMap
      </p>
    </div>
  )
}

export default App
