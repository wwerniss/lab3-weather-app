function SearchForm({ city, onCityChange, onSearch }) {
  return (
    <div className="search-form">
      <input
        type="text"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  )
}

export default SearchForm
