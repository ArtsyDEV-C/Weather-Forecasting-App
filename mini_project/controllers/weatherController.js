const axios = require('axios');
const Weather = require('../models/Weather');

const getWeather = async (req, res) => {
    try {
        const { city } = req.params;
        const apiKey = process.env.WEATHER_API_KEY;
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(weatherApiUrl);
        const weatherData = response.data;

        const weatherInfo = {
            city: weatherData.name,
            temperature: `${weatherData.main.temp}°C`,
            condition: weatherData.weather[0].description,
        };

        // Save search history
        const newWeather = new Weather({
            userId: req.user.id,
            city: weatherInfo.city,
            temperature: weatherInfo.temperature,
            condition: weatherInfo.condition,
        });

        await newWeather.save();
        res.json(weatherInfo);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch weather data" });
    }
};

module.exports = { getWeather };
