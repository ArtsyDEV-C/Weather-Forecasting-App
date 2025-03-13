const axios = require('axios');

const fetchWeather = async (city) => {
    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        return response.data;
    } catch (error) {
        throw new Error("Unable to fetch weather data");
    }
};

module.exports = { fetchWeather };
