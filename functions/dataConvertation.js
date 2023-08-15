export const kelvinToCelsius = kelvin => {
  if (typeof kelvin !== 'number') {
    throw new Error('Input must be a number');
  }

  if (kelvin < 0) {
    throw new Error('Temperature cannot be negative in Kelvin');
  }

  const celsius = kelvin - 273.15;
  return celsius.toFixed(2);
};

export const kelvinToFahrenheit = kelvin => {
  if (typeof kelvin !== 'number') {
    throw new Error('Input must be a number');
  }

  if (kelvin < 0) {
    throw new Error('Temperature cannot be negative in Kelvin');
  }

  const fahrenheit = (kelvin - 273.15) * (9 / 5) + 32;
  return fahrenheit.toFixed(2);
};
