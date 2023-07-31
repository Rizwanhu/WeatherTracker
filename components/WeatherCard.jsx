'use client';

const WeatherCard = () => {
  const coords = {
    lat: 48.450001,
    lon: 34.983334,
  };

  const queryString = Object.keys(coords)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(coords[key])}`)
    .join('&');

  const fetchWeather = async () => {
    const response = await fetch(`api/get-weather-data?${queryString}`);
    const data = await response.json();
    console.log(data);
  };

  return (
    <section>
      <button onClick={fetchWeather}>Get weather info!</button>
    </section>
  );
};

export default WeatherCard;
