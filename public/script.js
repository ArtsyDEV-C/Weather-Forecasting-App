document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");
    const videoBackground = document.querySelector("#weather-video");
    const backgroundAudio = document.querySelector("#weather-music");
    const forecastContainer = document.querySelector(".forecast-container");
    const windyMap = document.querySelector(".windy-embed iframe");
    const chatInput = document.querySelector("#chat-input");
    const chatbox = document.querySelector("#chatbox");
    const sendBtn = document.querySelector("#send-btn");

    // ✅ Weather Media Files Mapping
    const weatherBackgrounds = {
        "clear-day": "images/clear-sky-day.jpg",
        "clear-evening": "images/clear-sky-evening.jpg",
        "clear-night": "images/clear-sky-night.jpg",
        "cloudy-day": "images/cloudy-sky-day.jpg",
        "cloudy-evening": "images/cloudy-sky-evening.jpg",
        "cloudy-night": "images/cloudy-sky-night.jpg",
        "foggy-day": "images/foggy-sky-day.jpg",
        "foggy-evening": "images/foggy-sky-evening.jpg",
        "foggy-night": "images/foggy-sky-night.jpg",
        "hazy-day": "images/hazy-sky-day.jpg",
        "hazy-evening": "images/hazy-sky-evening.jpg",
        "hazy-night": "images/hazy-sky-night.jpg",
        "rainy-day": "images/rainy-sky-day.jpg",
        "rainy-evening": "images/rainy-sky-evening.jpg",
        "rainy-night": "images/rainy-sky-night.jpg",
        "snowy-day": "images/snowy-sky-day.jpg",
        "snowy-evening": "images/snowy-sky-evening.jpg",
        "snowy-night": "images/snowy-sky-night.jpg",
        "thunderstorm-day": "images/thunderstorm-sky-day.jpg",
        "thunderstorm-evening": "images/thunderstorm-sky-evening.jpg",
        "thunderstorm-night": "images/thunderstorm-sky-night.jpg",
        "windy-day": "images/windy-sky-day.jpg",
        "windy-evening": "images/windy-sky-evening.jpg",
        "windy-night": "images/windy-sky-night.jpg"
    };

    const weatherVideos = {
        "clear-day": "videos/clear-day-cat.mp4",
        "clear-evening": "videos/clear-evening-cat.mp4",
        "clear-night": "videos/clear-night-cat.mp4",
        "cloudy-day": "videos/cloudy-day-cat.mp4",
        "cloudy-evening": "videos/cloudy-evening-cat.mp4",
        "cloudy-night": "videos/cloudy-night-cat.mp4",
        "foggy-day": "videos/foggy-day-cat.mp4",
        "foggy-evening": "videos/foggy-evening-cat.mp4",
        "foggy-night": "videos/foggy-night-cat.mp4",
        "rainy-day": "videos/rainy-day-cat.mp4",
        "rainy-evening": "videos/rainy-evening-cat.mp4",
        "rainy-night": "videos/rainy-night-cat.mp4",
        "snowy-day": "videos/snowy-day-cat.mp4",
        "snowy-evening": "videos/snowy-evening-cat.mp4",
        "snowy-night": "videos/snowy-night-cat.mp4",
        "thunderstorm-day": "videos/thunderstorm-day-cat.mp4",
        "thunderstorm-evening": "videos/thunderstorm-evening-cat.mp4",
        "thunderstorm-night": "videos/thunderstorm-night-cat.mp4",
        "windy-day": "videos/windy-day-cat.mp4",
        "windy-evening": "videos/windy-evening-cat.mp4",
        "windy-night": "videos/windy-night-cat.mp4",
        "default": "videos/default.mp4"
    };

    const weatherMusic = {
        "clear": "audio/sunny.mp3",
        "cloudy": "audio/cloudy.mp3",
        "foggy": "audio/foggy.mp3",
        "hazy": "audio/hazy.mp3",
        "rainy": "audio/rain.mp3",
        "snowy": "audio/snow.mp3",
        "thunderstorm": "audio/thunderstorm.mp3",
        "windy": "audio/windy.mp3"
    };

    // ✅ Fetch Weather Data
    searchButton.addEventListener("click", async () => {
        const city = searchBar.value.trim();
        if (!city) {
            alert("Please enter a valid city!");
            return;
        }

        document.getElementById("loading").style.display = "block";

        try {
            const response = await fetch(`/weather/${city}`);
            if (!response.ok) throw new Error("Weather data not found");

            const data = await response.json();
            updateWeatherUI(data);
            updateWindyMap(data.lat, data.lon);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data");
        }

        document.getElementById("loading").style.display = "none";
    });

    // ✅ Update Weather UI
    function updateWeatherUI(data) {
        document.querySelector("#city-name").innerText = `${data.city}, ${data.country}`;
        document.querySelector("#weather-temperature").innerText = `${data.temperature}°C`;
        document.querySelector("#weather-description").innerText = `${data.condition}`;
        
        updateBackground(data.condition);
    }

    // ✅ Update Background & Video
    function updateBackground(condition) {
        const timeOfDay = determineTimeOfDay();
        document.body.style.backgroundImage = `url(${weatherBackgrounds[`${condition.toLowerCase()}-${timeOfDay}`] || weatherBackgrounds["clear-day"]})`;

        videoBackground.src = weatherVideos[`${condition.toLowerCase()}-${timeOfDay}`] || weatherVideos["default"];
        videoBackground.play();

        backgroundAudio.src = weatherMusic[condition.toLowerCase()] || weatherMusic["clear"];
        backgroundAudio.play();
    }

    function determineTimeOfDay() {
        const hour = new Date().getHours();
        return hour < 12 ? "day" : hour < 18 ? "evening" : "night";
    }

    // ✅ Update Windy Map
    function updateWindyMap(lat, lon) {
        windyMap.src = `https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&zoom=5&overlay=wind&metricWind=km/h&metricTemp=C`;
    }

    // Chatbot Integration
    const OPENAI_PROXY_API = "/chatbot-response"; // OpenAI API Backend Proxy Route

    sendBtn.addEventListener("click", async () => {
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;

        chatbox.innerHTML += `<div class="chat-message user">${userMessage}</div>`;
        
        try {
            const response = await fetch(OPENAI_PROXY_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            chatbox.innerHTML += `<div class="chat-message bot">${data.response}</div>`;
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            chatbox.innerHTML += `<div class="chat-message bot">Sorry, I'm unable to process your request.</div>`;
        }

        chatInput.value = "";
    });
});
