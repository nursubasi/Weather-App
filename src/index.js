import "./styles.css";

let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let dayinfo = document.querySelector("#weekday");
dayinfo.innerHTML = `${day} ${hours}:${minutes}`;

let fahrenheitElement = document.getElementById(`fahrenheit`);
let celciusElement = document.getElementById(`celcius`);

function placeSearch(response) {
  // event.preventDefault();
  let placeInput = document.querySelector("#input-entry");
  let place = document.querySelector("#weather-place");
  let weatherDescription = document.querySelector(".image-description");
  let windSpeed = document.querySelector("#wind-speed");
  let imageElement = document.querySelector("#first-image");
  if (placeInput.value) {
    let cityInput = placeInput.value;
    let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
    function placeName(response) {
      let cityName = response.data.name;
      place.innerHTML = `${cityName}`;
    }
    axios.get(apiUrl).then(placeName);
    function enterTemperature(response) {
      console.log(apiUrl);
      let currentTemp = Math.round(response.data.main.temp);
      console.log(currentTemp);
      let temperatureElement = document.querySelector("#default-degree");
      temperatureElement.innerHTML = `${currentTemp}`;
      celciusElement.style.removeProperty("color");
      celciusElement.style.color = "black";
      fahrenheitElement.style.color = "#43c2e3";
    }
    axios.get(apiUrl).then(enterTemperature);

    function getWeatherDescription(response) {
      let currentDescription = response.data.weather[0].main;
      console.log(currentDescription);
      weatherDescription.innerHTML = `${currentDescription}`;
    }
    axios.get(apiUrl).then(getWeatherDescription);

    function getWindSpeed(response) {
      let currentWindSpeed = Math.round(response.data.wind.speed);
      console.log(currentWindSpeed);
      windSpeed.innerHTML = `${currentWindSpeed}`;
    }
    axios.get(apiUrl).then(getWindSpeed);

    function getImage(response) {
      let imageNumber = response.data.weather[0].icon;
      console.log(imageNumber);
      imageElement.setAttribute("src", `img/${imageNumber}.jpg`);
    }
    axios.get(apiUrl).then(getImage);
  } else {
    weatherDescription.innerHTML = `Sunny`;
    imageElement.setAttribute("src", `img/01d.jpg`);
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", placeSearch);
form.addEventListener("click", placeSearch);

function getFahrenheit(response) {
  let placeInput = document.querySelector("#input-entry");
  let temperatureElement = document.querySelector("#default-degree");
  if (placeInput.value) {
    let cityInput = placeInput.value;
    let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
    let otherUnit = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${otherUnit}&appid=${apiKey}`;
    function placeName(response) {
      let currentFahrenheit = Math.round(response.data.main.temp);
      temperatureElement.innerHTML = `${currentFahrenheit}`;
      fahrenheitElement.style.removeProperty("color");
      fahrenheitElement.style.color = "black";
      celciusElement.style.color = "#43c2e3";
    }
    axios.get(apiUrl).then(placeName);
  } else {
    temperatureElement.innerHTML = `35`;
  }
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", getFahrenheit);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", placeSearch);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let place = document.querySelector("#weather-place");
  let weatherDescription = document.querySelector(".image-description");
  let windSpeed = document.querySelector("#wind-speed");
  let imageElement = document.querySelector("#first-image");
  let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  function placeName(response) {
    let cityName = response.data.name;
    place.innerHTML = `${cityName}`;
  }
  axios.get(apiUrl).then(placeName);
  function enterTemperature(response) {
    console.log(apiUrl);
    let currentTemp = Math.round(response.data.main.temp);
    console.log(currentTemp);
    let temperatureElement = document.querySelector("#default-degree");
    temperatureElement.innerHTML = `${currentTemp}`;
    celciusElement.style.removeProperty("color");
    celciusElement.style.color = "black";
    fahrenheitElement.style.color = "#43c2e3";
  }
  axios.get(apiUrl).then(enterTemperature);

  function getWeatherDescription(response) {
    let currentDescription = response.data.weather[0].main;
    console.log(currentDescription);
    weatherDescription.innerHTML = `${currentDescription}`;
  }
  axios.get(apiUrl).then(getWeatherDescription);

  function getWindSpeed(response) {
    let currentWindSpeed = Math.round(response.data.wind.speed);
    console.log(currentWindSpeed);
    windSpeed.innerHTML = `${currentWindSpeed}`;
  }
  axios.get(apiUrl).then(getWindSpeed);

  function getImage(response) {
    let imageNumber = response.data.weather[0].icon;
    console.log(imageNumber);
    imageElement.setAttribute("src", `img/${imageNumber}.jpg`);
  }
  axios.get(apiUrl).then(getImage);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLink = document.querySelector("#current-button");
currentLink.addEventListener("click", getCurrentPosition);
