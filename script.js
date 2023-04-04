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

function searchTheCity(event) {
  event.preventDefault();

  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let city = document.querySelector("#the-new-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveTemp);
}

function retrieveTemp(response) {
  document.querySelector("#chosen-city").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".actual-degrees");
  currentTemp.innerHTML = `${temperature}°C`;
  document.querySelector(
    "#humid"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#windy").innerHTML = `${Math.round(
    response.data.wind.speed
  )} Km/h`;
}

function getLocalTemperature() {
  navigator.geolocation.getCurrentPosition(showLocalTemperature);
}

function showLocalTemperature(response) {
  let latitude = response.coords.latitude;
  let longitude = response.coords.longitude;

  let apiKey = "ebef9ca4a8de66ed586fac628fade056";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(retrieveTemp);
}

function changeToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector(".actual-degrees");
  temperature.innerHTML = "17°C";
}
function changeToFaren(event) {
  event.preventDefault();
  let temperature = document.querySelector(".actual-degrees");
  temperature.innerHTML = "68°F";
}

let date = document.querySelector("#current-day");
let time = document.querySelector("#current-time");
let currentTime = new Date();

date.innerHTML = formatDay(currentTime);
time.innerHTML = formatTime(currentTime);

let city = document.querySelector("#search-city");
city.addEventListener("submit", searchTheCity);

let celsiusDegrees = document.querySelector("#celsius");
let farenDegrees = document.querySelector("#faren");

let localTemperature = document.querySelector("#local-temperature");

celsiusDegrees.addEventListener("click", changeToCelsius);
farenDegrees.addEventListener("click", changeToFaren);
localTemperature.addEventListener("click", getLocalTemperature);
