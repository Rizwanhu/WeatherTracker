/**
 * Weather Data API Module
 * Handles fetching weather data from OpenWeatherMap API
 */

/**
 * Fetches weather data for given coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data from OpenWeatherMap
 */
const getWeatherData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`
  );
  const data = await response.json();
  return data;
};

/**
 * API Route Handler
 * @param {Object} req - Next.js API request object
 * @param {Object} res - Next.js API response object
 */
export default async function handler(req, res) {
  const { lat, lon } = req.query;
  const response = await getWeatherData(lat, lon);
  res.status(200).json(response);
}
