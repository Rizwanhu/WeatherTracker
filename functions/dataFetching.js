export const getEncodedQueries = (lat, lon) => {
  return `lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
};

export const fetchWeather = async (lat, lon) => {
  const queryString = getEncodedQueries(lat, lon);
  const response = await fetch(`api/get-weather-data?${queryString}`);
  const data = await response.json();
  return data;
};
