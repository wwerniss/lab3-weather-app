function getDailyForecast(list) {
// list – це масив з /forecast (кожні 3 години)
// Вибираємо максимум 5–7 унікальних дат
  if (!Array.isArray(list)) return []

  const result = []
  const usedDates = new Set()

  for (const item of list) {
    const [date] = item.dt_txt.split(" ") // "2025-11-19 12:00:00" -> "2025-11-19"
    if (!usedDates.has(date)) {
      result.push(item)
      usedDates.add(date)
    }
    if (result.length >= 7) break
  }

  return result
}

function formatDayName(dtTxt) {
  const date = new Date(dtTxt)
  return date.toLocaleDateString("uk-UA", { weekday: "short" }) // пн, вт, ср...
}

function ForecastList({ forecast }) {
  if (!forecast || !Array.isArray(forecast.list)) return null

  const days = getDailyForecast(forecast.list)
  const todayDate = new Date().toISOString().split("T")[0]

  if (days.length === 0) return null

  return (
    <div className="forecast">
      <h3 className="forecast__title">Прогноз на тиждень</h3>
      <div className="forecast__list">
        {days.map((item) => {
          const dayName = formatDayName(item.dt_txt)
          const tempMin = Math.round(item.main.temp_min)
          const tempMax = Math.round(item.main.temp_max)
          const icon = item.weather[0].icon
          const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`

          const [dateOnly] = item.dt_txt.split(" ")
          const isToday = dateOnly === todayDate

          return (
            <div
              className={`forecast-day ${
                isToday ? "forecast-day--today" : ""
              }`}
              key={item.dt}
            >
              <span className="forecast-day__name">{dayName}</span>
              <img
                src={iconUrl}
                alt="icon"
                className="forecast-day__icon"
              />
              <span className="forecast-day__temp">
                {tempMax}° / {tempMin}°
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastList
