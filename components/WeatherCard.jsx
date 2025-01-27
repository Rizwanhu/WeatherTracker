'use client';

/**
 * WeatherCard Module
 * Displays weather information for a selected location
 */

// Import dependencies for state management and data handling
import { useState, useEffect } from 'react';
import { fetchWeather } from '@/functions/dataFetching';
import {
  kelvinToCelsius,
  kelvinToFahrenheit,
} from '@/functions/dataConvertation';

// Import styles and related components
import styles from '../public/styles/WeatherCard.module.scss';
import GeocodeInput from './GeocodeInput';

/**
 * EmptyWeatherCard Component
 * Displays placeholder content when no weather data is available
 */
const EmptyWeatherCard = () => {
  return (
    <div className={styles['weather-card']}>
      <h2 className={styles.name}>City</h2>
      <p className={styles.clouds}>Status</p>
      <h1>Track Weather Updates Here</h1>
      <p className={styles.temperature}>Temeparute</p>
      <div className={styles['sun-container']}>
        <p>Sunrise: unknown</p>
        <p>Sunset: unknown</p>
      </div>
    </div>
  );
};

/**
 * WeatherCard Component
 * Main component for weather display and location selection
 */
const WeatherCard = () => {
  // State management for weather data and location
  const [weatherConfig, setWeatherConfig] = useState(null);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  /**
   * Effect hook to fetch weather data when coordinates change
   * Processes and formats the weather data for display
   */
  useEffect(() => {
    if (!address) return;

    const getWeather = async (lat, lng) => {
      const weatherData = await fetchWeather(lat, lng);

      setWeatherConfig({
        name: weatherData.name,
        clouds: {
          main: weatherData.weather[0].main,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        },
        temp: {
          celsius: kelvinToCelsius(weatherData.main.temp),
          fahrenheit: kelvinToFahrenheit(weatherData.main.temp),
        },
        sunrise: {
          date: new Date(weatherData.sys.sunrise * 1000).toLocaleDateString(),
          time: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
        },
        sunset: {
          date: new Date(weatherData.sys.sunset * 1000).toLocaleDateString(),
          time: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(),
        },
      });
      console.log(weatherData);
    };

    getWeather(coordinates.lat, coordinates.lng);
  }, [coordinates]);

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles['form-title']}>Please, type your city name</h2>
        <GeocodeInput
          address={address}
          coordinates={coordinates}
          setAddress={setAddress}
          setCoordinates={setCoordinates}
        />
        {weatherConfig ? (
          <div className={styles['weather-card']}>
            <h2 className={styles.name}>{weatherConfig.name}</h2>
            <p className={styles.clouds}>{weatherConfig.clouds.main}</p>
            <p className={styles.temperature}>
              {`${weatherConfig.temp.celsius}°C or ${weatherConfig.temp.fahrenheit}°F`}
            </p>
            <div className={styles['sun-container']}>
              <p>
                Sunrise: {weatherConfig.sunrise.date},{' '}
                {weatherConfig.sunrise.time}
              </p>
              <p>
                Sunset: {weatherConfig.sunset.date}, {weatherConfig.sunset.time}
              </p>
            </div>
          </div>
        ) : (
          <EmptyWeatherCard />
        )}
      </div>
    </>
  );
};

export default WeatherCard;
