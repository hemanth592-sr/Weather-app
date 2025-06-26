const apiKey = 'e5c2fa3ca54c06cb86fac101f46c5ea8';

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    document.getElementById('weatherResult').innerHTML = '<p>Please enter a city name.</p>';
    return;
  }
  fetchWeatherByCity(city);
}

function fetchWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  document.getElementById('weatherResult').innerHTML = '<p>Loading...</p>';

  fetch(url)
    .then(response => response.json())
    .then(data => showWeather(data))
    .catch(() => {
      document.getElementById('weatherResult').innerHTML = '<p>⚠️ Error fetching weather data.</p>';
    });
}

function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  document.getElementById('weatherResult').innerHTML = '<p>Loading weather for your location...</p>';

  fetch(url)
    .then(response => response.json())
    .then(data => showWeather(data))
    .catch(() => {
      document.getElementById('weatherResult').innerHTML = '<p>⚠️ Could not fetch location weather.</p>';
    });
}

function showWeather(data) {
  if (data.cod !== 200) {
    document.getElementById('weatherResult').innerHTML = '<p>❌ City not found or invalid location.</p>';
    return;
  }

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const currentDateTime = new Date().toLocaleString();

  const result = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>📅 Date & Time:</strong> ${currentDateTime}</p>
    <img src="${iconUrl}" alt="Weather Icon">
    <p>🌡️ Temp: ${data.main.temp}°C</p>
    <p>🤒 Feels Like: ${data.main.feels_like}°C</p>
    <p>🌥️ Weather: ${data.weather[0].main} - ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
  document.getElementById('weatherResult').innerHTML = result;
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);
      },
      () => {
        document.getElementById('weatherResult').innerHTML = '<p>⚠️ Location access denied.</p>';
      }
    );
  } else {
    document.getElementById('weatherResult').innerHTML = '<p>⚠️ Geolocation not supported by your browser.</p>';
  }
}
