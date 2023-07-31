const getWeatherData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data;
};

export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const response = await getWeatherData(lat, lon);
  res.status(200).json(response);
}
