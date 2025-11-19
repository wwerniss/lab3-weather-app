import axios from "axios"

const API_KEY = "a34e43ee259a8be31585183b09923726"

// Поточна погода
export async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=ua`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Помилка отримання даних про погоду"
  }
}

// Прогноз (5-денний з кроком 3 години, ми з нього виберемо по одному запису на день)
export async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric&lang=ua`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Помилка отримання прогнозу погоди"
  }
}

// Поточна погода за координатами (для геолокації)
export async function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ua`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Помилка отримання даних (геолокація)"
  }
}

// Прогноз за координатами
export async function getForecastByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ua`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Помилка отримання прогнозу (геолокація)"
  }
}
