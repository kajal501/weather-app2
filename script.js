async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "638641c89c3b7aa826d22db3cb9b34cf"; // 🔑 Replace this with your OpenWeatherMap API key

  if (!city) {
    document.getElementById("result").innerHTML = "<p style='color:red;'>Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("result").innerHTML = "<p style='color:red;'>City not found.</p>";
    } else {
      const { name, main, weather } = data;
      const icon = weather[0].main.toLowerCase();
      let emoji = "🌈";

      // Add emojis based on weather condition
      if (icon.includes("cloud")) emoji = "☁️";
      else if (icon.includes("rain")) emoji = "🌧️";
      else if (icon.includes("clear")) emoji = "☀️";
      else if (icon.includes("snow")) emoji = "❄️";
      else if (icon.includes("storm")) emoji = "⛈️";
      else if (icon.includes("mist") || icon.includes("fog")) emoji = "🌫️";

      document.getElementById("result").innerHTML = `
        <h2>${emoji} ${name}</h2>
        <p>🌡️ ${main.temp}°C</p>
        <p>${emoji} ${weather[0].main}</p>
      `;
    }
  } catch (error) {
    document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching data. Try again.</p>";
  }
}






