import { useState } from "react"
import SearchForm from "./components/SearchForm"
import WeatherCard from "./components/WeatherCard"
import ForecastList from "./components/ForecastList"
import {
  getWeather,
  getForecast,
  getWeatherByCoords,
  getForecastByCoords,
} from "./api/getWeather"

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [backgroundMode, setBackgroundMode] = useState("default")

  const updateBackground = (data) => {
    const main = data?.weather?.[0]?.main?.toLowerCase() || ""
    let mode = "default"

    if (main.includes("clear")) mode = "clear"
    else if (main.includes("cloud")) mode = "clouds"
    else if (main.includes("rain") || main.includes("drizzle"))
      mode = "rain"
    else if (main.includes("snow")) mode = "snow"
    else if (main.includes("thunder")) mode = "storm"

    setBackgroundMode(mode)
  }

  const handleSearch = async () => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const current = await getWeather(city)
      setWeather(current)
      updateBackground(current)

      const forecastData = await getForecast(city)
      setForecast(forecastData)
    } catch (err) {
      const message =
        typeof err === "string"
          ? err
          : err?.message || "Сталася помилка під час отримання даних"
      setError(message)
      setWeather(null)
      setForecast(null)
    }

    setLoading(false)
  }

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError("Геолокація не підтримується у цьому браузері")
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const current = await getWeatherByCoords(latitude, longitude)
          setWeather(current)
          setCity(current.name || "")
          updateBackground(current)

          const forecastData = await getForecastByCoords(
            latitude,
            longitude,
          )
          setForecast(forecastData)
        } catch (err) {
          const message =
            typeof err === "string"
              ? err
              : err?.message ||
                "Сталася помилка під час отримання даних за геолокацією"
          setError(message)
          setWeather(null)
          setForecast(null)
        }

        setLoading(false)
      },
      () => {
        setLoading(false)
        setError(
          "Не вдалося отримати геолокацію (заборонено доступ або сталася помилка).",
        )
      },
    )
  }

  return (
    <div className={`app app--${backgroundMode}`}>
      <h1 className="app__title">Weather App</h1>

      <SearchForm
        city={city}
        onCityChange={setCity}
        onSearch={handleSearch}
        onUseLocation={handleUseLocation}
      />

      {loading && (
        <div className="loader-wrapper">
          <div className="loader" />
          <p className="status-message">Завантаження...</p>
        </div>
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
