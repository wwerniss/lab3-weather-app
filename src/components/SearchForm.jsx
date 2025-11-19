function SearchForm({ city, onCityChange, onSearch, onUseLocation }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch()
    }
  }

  return (
    <div className="search-form">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch}>Search</button>
      <button
        type="button"
        className="search-form__geo-btn"
        onClick={onUseLocation}
      >
        🌍
      </button>
    </div>
  )
}

export default SearchForm
