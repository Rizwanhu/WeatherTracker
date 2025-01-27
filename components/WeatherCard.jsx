/**
 * WeatherCard Component - Main weather display component
 * Handles weather data fetching and display for a given location
 */

'use client';

// Import necessary dependencies and utilities
import { useState, useEffect } from 'react';
import { fetchWeather } from '@/functions/dataFetching';
import {
  kelvinToCelsius,
  kelvinToFahrenheit,
} from '@/functions/dataConvertation';

// Import styles and sub-components
import styles from '../public/styles/WeatherCard.module.scss';
import GeocodeInput from './GeocodeInput';

/**
 * EmptyWeatherCard Component
 * Displays placeholder content when no weather data is available
 * @returns {JSX.Element} Placeholder weather card
 */
const EmptyWeatherCard = () => {
  return (
    <div className={styles['weather-card']}>
      <h2 className={styles.name}>City</h2>
      <p className={styles.clouds}>Status</p>
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
 * Main component that manages weather data and user interaction
 * @returns {JSX.Element} Weather information display
 */
const WeatherCard = () => {
  // State management for weather data and location
  const [weatherConfig, setWeatherConfig] = useState(null);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  /**
   * Effect hook to fetch weather data when coordinates change
   * Transforms raw weather data into formatted display data
   */
  useEffect(() => {
    if (!address) return;

    /**
     * Fetches and formats weather data for given coordinates
     * @param {number} lat - Latitude
     * @param {number} lng - Longitude
     */
    const getWeather = async (lat, lng) => {
      const weatherData = await fetchWeather(lat, lng);

      // Transform and structure weather data for display
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
        {/* Location input section */}
        <h2 className={styles['form-title']}>Please, type your city name</h2>
        <GeocodeInput
          address={address}
          coordinates={coordinates}
          setAddress={setAddress}
          setCoordinates={setCoordinates}
        />
        
        {/* Conditional rendering of weather information */}
        {weatherConfig ? (
          // Display weather data when available
          <div className={styles['weather-card']}>
            {/* Weather information display */}
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
          // Display placeholder when no data is available
          <EmptyWeatherCard />
        )}
      </div>
    </>
  );
};

export default WeatherCard;
