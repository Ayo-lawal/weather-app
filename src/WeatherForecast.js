// WeatherForecast.js

import React, { useState, useEffect } from 'react';

const WeatherForecast = ({ city, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getForecastData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      } finally {
        setLoading(false);
      }
    };

    getForecastData();
  }, [city, apiKey]);

  return (
    <div className="forecast">
      <h2>Weather Forecast</h2>
      {loading && <p>Loading forecast...</p>}
      {forecastData && (
        <div>
          {forecastData.list.map((forecast) => (
            <div key={forecast.dt} className="forecast-day">
              <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {forecast.main.temp} °C</p>
              <p>Weather: {forecast.weather[0].description}</p>
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;
