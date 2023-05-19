import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  FaSpinner,
  FaTemperatureHigh as ThermometherIcon,
  FaWind as WindIcon,
} from "react-icons/fa";

function App() {
  const [searchedCity, setSearchedCity] = useState("Campinas");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setCity(searchedCity);
    console.log(searchedCity);
  }

  useEffect(() => {
    async function getCityWeather() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://goweather.herokuapp.com/weather/${searchedCity}`
        );
        const data = await response.json();
        setWeather(data);
        console.log(data);
      } catch (error) {
        alert("API Error!");
      } finally {
        setIsLoading(false);
      }
    }
    getCityWeather();
  }, [city]);

  return (
    <div className="App">
      <h1>{"Weather App".toUpperCase()}</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ex: Curitiba"
          value={searchedCity}
          onChange={(event) => setSearchedCity(event.target.value)}
        />
        <button type="submit">
          {
            isLoading ? <FaSpinner className="loading" /> : <span>Search Location</span>
          }
        </button>
      </form>

      {city && weather && (
        <>
          <h1>{city}</h1>
          <h2>Actual Weather</h2>
          <p>{weather.temperature}</p>
          <p>{weather.description}</p>

          <h2>Prediction</h2>
          <ol>
            {weather.forecast.map((dayForecast, index) => {
              return (
                <li key={uuid()}>
                  <h3>
                    {index == 0
                      ? "Tomorrow"
                      : Intl.DateTimeFormat("en", { weekday: "long" }).format(
                          new Date().setDate(new Date().getDate() + index + 1)
                        )}
                  </h3>
                  <div>
                    <ThermometherIcon />
                    <p>{dayForecast.temperature}</p>
                  </div>
                  <div>
                    <WindIcon />
                    <p>{dayForecast.wind}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </>
      )}
      <h1></h1>
    </div>
  );
}

export default App;
