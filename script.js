let city = document.querySelector(".city");
let time = document.querySelector(".day-hour");
let weatherDescription = document.querySelector(".weather-description");
let temperature = document.querySelector(".temperature");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let feelsLike = document.querySelector(".feels-like");
let iconCard = document.querySelector(".icon");
let input = document.querySelector(".city-input");
let searchBox = document.querySelector(".search-box");
let celcius = document.querySelector(".celcius");
let fahrenheit = document.querySelector(".fahrenheit");
let date;

input.addEventListener("keypress", (e) => {
  if (e.keyCode == "13") {
    getCity(e.target.value);
  }
});

searchBox.addEventListener("submit", (e) => {
  e.preventDefault();
  getCity(input.value);
  input.value = "";
});

async function getCity(cityName) {
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=aa08b1c77fbd6829f2ea13e291373feb`;

  const promise = await fetch(API);
  const response = await promise.json();

  if (response.cod == 404) {
    return;
  }

  city.innerHTML = response.name;
  weatherDescription.innerHTML = response.weather[0].description;
  temperature.innerHTML = Math.round(response.main.temp - 273.15);
  humidity.innerHTML = "Humidity: " + response.main.humidity + " %";
  wind.innerHTML = "Wind: " + response.wind.speed + " km/h";
  feelsLike.innerHTML =
    "Feelslike: " + Math.round(response.main.feels_like - 273.15) + " °C";
  iconCard.src = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;

  formatDate(new Date(response.dt * 1000));
}

function formatDate(date) {
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
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  time.innerHTML = day + " " + hours + ":" + minutes;

  console.log(day + " " + hours + ":" + minutes);
}
