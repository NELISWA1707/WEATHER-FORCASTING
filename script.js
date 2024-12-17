function weatherData(response) {
  let temperatureElement = document.querySelector(".weather-temperature");
  let temperature = Math.round(response.data.temperature.current);

  temperatureElement.innerHTML = temperature;
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector(".humidity-percent");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector(".wind-speed");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconImage = document.querySelector("#weather-app-icon");
  iconImage.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon"/>`;
  document.body.className = response.data.condition.icon;
  let body = document.querySelector("body");
  let icon = response.data.condition.icon;
  if (icon.includes("night")) {
    body.classList.add("dark");
  }
  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "69486f3703b7o03b7a5448ae33t4c4f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherData);
}
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city-element");
  city.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getForecast(city) {
  let apiKey = "69486f3703b7o03b7a5448ae33t4c4f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector(".weather-forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
        <div class="weather-forecast-date">Tues</div>
        <div class="weather-forecast-icon"><img src="${
          day.condition.icon_url
        }"/> </div>
        <div class="temperatures">
          <div class="temperature1">${Math.round(
            day.temperature.maximum
          )}&deg;</div>
          <div class="temperature2">${Math.round(
            day.temperature.minimum
          )}&deg;</div>
        </div>
      </div>`;
  });

  forecast.innerHTML = forecastHtml;
}
searchCity("Paris");
displayForecast("Paris");
