import React, { useState, useEffect } from "react";
import axios from "axios";

function Weather(){
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState(""); // Default city
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // Your API key

  useEffect(() => {
    const fetchWeather = async () => {
      if (city.trim() === "") return; // Don't fetch if city is empty

      try {
        setLoading(true);
        setError(null); // Clear previous errors

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => setCity(e.target.value);

  // Function to convert wind degrees to compass direction
  const getWindDirection = (deg) => {
    if (deg >= 348.75 || deg < 11.25) return "N";
    if (deg >= 11.25 && deg < 33.75) return "NNE";
    if (deg >= 33.75 && deg < 56.25) return "NE";
    if (deg >= 56.25 && deg < 78.75) return "ENE";
    if (deg >= 78.75 && deg < 101.25) return "E";
    if (deg >= 101.25 && deg < 123.75) return "ESE";
    if (deg >= 123.75 && deg < 146.25) return "SE";
    if (deg >= 146.25 && deg < 168.75) return "SSE";
    if (deg >= 168.75 && deg < 191.25) return "S";
    if (deg >= 191.25 && deg < 213.75) return "SSW";
    if (deg >= 213.75 && deg < 236.25) return "SW";
    if (deg >= 236.25 && deg < 258.75) return "WSW";
    if (deg >= 258.75 && deg < 281.25) return "W";
    if (deg >= 281.25 && deg < 303.75) return "WNW";
    if (deg >= 303.75 && deg < 326.25) return "NW";
    if (deg >= 326.25 && deg < 348.75) return "NNW";
    return "Unknown";
  };

  return (
    <div className="animate-swipeUp flex justify-center">
      <div className="w-full max-w-2xl px-4 sm:px-8 lg:px-16 mt-12">
        <div className="flex flex-col items-center p-6 bg-blue-200 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Weather Information
          </h1>
          <input
            type="text"
            value={city}
            placeholder="Enter city"
            onChange={handleCityChange}
            className="mb-6 p-3 border border-gray-300 rounded-lg w-full text-center"
          />
          {loading ? (
            <p className="text-gray-700">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : weatherData ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
              <img
                className="block mx-auto my-4"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Direction: {getWindDirection(weatherData.wind.deg)}</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              {weatherData.rain ? (
                <p>Precipitation (last 1h): {weatherData.rain["1h"]} mm</p>
              ) : (
                <p>No precipitation data available</p>
              )}
            </div>
          ) : (
            <p className="text-gray-500">
              Enter a city to get weather information.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Weather;
