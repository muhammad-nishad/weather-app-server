const axios = require('axios');
const Weather = require('../models/weather');

const getWeatherData = async (city) => {
  console.log('inside this');
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    const { temp } = response.data.main;
    const { description } = response.data.weather[0];
    const icon = response.data.weather[0].icon;
    
    const weatherData = new Weather({
      city,
      temperature: temp,
      description,
      icon,
      date: new Date().toISOString().split('T')[0],
    });

    await weatherData.save();
    return weatherData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = { getWeatherData };
