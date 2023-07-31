import React from 'react';
import styles from '../public/styles/Home.module.scss';
import WeatherCard from './WeatherCard';

const Home = () => {
  return (
    <main className={styles.container}>
      <WeatherCard />
    </main>
  );
};

export default Home;
