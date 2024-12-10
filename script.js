function weatherData(response) {
  let temperatureElement = document.querySelector(".weather-temperature");
  let temperature = Math.round(response.data.temperature.current);

  temperatureElement.innerHTML = temperature;
  let cityElement = document.querySelector("#city-element");
  cityElement.innerHTML = response.data.city;
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
