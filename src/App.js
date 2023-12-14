import "./App.css";
import { useState } from "react";

const api = {
  key: "e31ae81f538d69c1803b997ab8940545",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPressed = () => {
    setLoading(true);
    setError(null);

    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch weather data. Status: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPressed();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Live Weather</h1>
        <p>Enter a location to find out.</p>
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={searchPressed} disabled={loading}>
            Search
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {error && <p>Error: {error}</p>}

        {typeof weather.main !== "undefined" && !loading && !error && (
          <div>
            <p>{weather.name}</p>
            <p>{weather.main.temp}°C</p>
            <p>{weather.weather[0].main}</p>
            <p>({weather.weather[0].description})</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
