'use client';

import { useState, useEffect } from 'react';
import { fetchWeather } from '@/functions/dataFetching';
import {
  kelvinToCelsius,
  kelvinToFahrenheit,
} from '@/functions/dataConvertation';

import styles from '../public/styles/WeatherCard.module.scss';
import GeocodeInput from './GeocodeInput';

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

const WeatherCard = () => {
  const [weatherConfig, setWeatherConfig] = useState(null);
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

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
