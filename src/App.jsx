import { useState } from "react"
import SearchForm from "./components/SearchForm"
import WeatherCard from "./components/WeatherCard"
import { getWeather } from "./api/getWeather"

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const data = await getWeather(city)
      setWeather(data)
    } catch (err) {
      setError(err)
      setWeather(null)
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

      <p className="app__footer">
        Дані надані сервісом OpenWeatherMap
      </p>
    </div>
  )
}

export default App
