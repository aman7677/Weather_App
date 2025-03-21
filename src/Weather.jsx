import { useState } from "react";
import './Weather.css';

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apikey = "6a9c335e04a4582cdd81f3344e890ef9";

  const getWeatherData = async (cityValue) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather({
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        details: [
          `Feels like: ${Math.round(data.main.feels_like)}°C`,
          `Humidity: ${data.main.humidity}%`,
          `Wind speed: ${data.wind.speed} m/s`,
        ],
      });
      setError(null);
    } catch (err) {
      setWeather(null);
      setError("City not found. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) getWeatherData(city);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter City"
        />
        <input type="submit" value="Get Weather" />
      </form>
      <div id="weather-data">
        {error && <div className="description">{error}</div>}
        {weather && (
          <>
            <div className="icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                alt="Weather Icon"
              />
            </div>
            <div className="temperature">{weather.temperature}°C</div>
            <div className="description">{weather.description}</div>
            <div className="details">
              {weather.details.map((detail, index) => (
                <div key={index}>{detail}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
