import axios from "axios"

export async function getWeather(city) {
  const API_KEY = "a34e43ee259a8be31585183b09923726"

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error.response?.data?.message || "Помилка отримання даних"
  }
}
