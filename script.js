function formatDay(day) {
  let dayIndex = day.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[dayIndex]}`;
}

function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "b77cdfa749f410t5o163c305200afe42";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(coordinates) {
  let latitude = coordinates.latitude;
  let longitude = coordinates.longitude;

  let apiKey = "b77cdfa749f410t5o163c305200afe42";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForcast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#actual-degrees");
  let cityElement = document.querySelector("#chosen-city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humid");
  let windElement = document.querySelector("#windy");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} Km/h`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function getLocalTemperature() {
  navigator.geolocation.getCurrentPosition(showLocalTemperature);
}

function showLocalTemperature(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;

  let apiKey = "b77cdfa749f410t5o163c305200afe42";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}
`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#actual-degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheit);
}

function displayCelsius(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#actual-degrees");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayForcast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"];
  let forecastHTML = `<div class="row mt-4">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `              <div class="col-2 days text-center">
    <div>${day}</div>
    <i class="fa-solid fa-cloud-sun"></i>
    <span class="temp-max">15°</span><span class="temp-min">8°</span>
    </div>       
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let date = document.querySelector("#current-day");
let time = document.querySelector("#current-time");
let currentTime = new Date();

date.innerHTML = formatDay(currentTime);
time.innerHTML = formatTime(currentTime);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let localTemperature = document.querySelector("#local-temperature");
localTemperature.addEventListener("click", getLocalTemperature);

search("Rome");
displayForcast();
