import axios from "axios"

const API_KEY = "a34e43ee259a8be31585183b09923726"
const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather"
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"

// Поточна погода
export async function getWeather(city) {
  const url = `${CURRENT_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=ua`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log("Current weather error:", error.response?.data || error.message)
    throw error.response?.data?.message || "Помилка отримання даних про погоду"
  }
}

// Прогноз (5-денний з кроком 3 години, ми з нього виберемо по одному запису на день)
export async function getForecast(city) {
  const url = `${FORECAST_URL}?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=ua`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log("Forecast error:", error.response?.data || error.message)
    throw error.response?.data?.message || "Помилка отримання прогнозу погоди"
  }
}
