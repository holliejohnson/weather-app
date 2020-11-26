function formatDate(now) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return `${days[now.getDay()]}, 
  ${
    months[now.getMonth()]
  } ${now.getDate()}, ${now.getFullYear()} ${now.toLocaleTimeString()}`;
}

function displayTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${temp}&deg;<br>  🌪`;
}

function handleSearch(event) {
  event.preventDefault();
  let apiKey = "37925f3d062dd55114f89e5051ff5f0f";
  let cityName = document.querySelector("#city-search-input").value;
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  cityDisplay.innerHTML = cityName;
  axios.get(endpoint).then(displayTemperature);
}

function processLocation(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  let myCityName = response.data.name;
  city.innerHTML = myCityName;
  temperature.innerHTML = `${temp}&deg;<br>  🌪`;
}

function getLocation(position) {
  console.log("OK");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "37925f3d062dd55114f89e5051ff5f0f";
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(endpoint).then(processLocation);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let dateTime = document.querySelector("#today");
let currentDateTime = new Date();
dateTime.innerHTML = formatDate(currentDateTime);

let getLocationButton = document.querySelector("#get-location");
getLocationButton.addEventListener("click", getPosition);

let cityDisplay = document.querySelector("#city");
let citySearchForm = document.querySelector("#city-search-form");
citySearchForm.addEventListener("submit", handleSearch);

/*
function toggleFarenheight(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "68&deg;  🌪";
}

function toggleCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = "20&deg;  🌪";
}*/

/*
let fToggle = document.querySelector("#farenheight");
fToggle.addEventListener("click", toggleFarenheight);

let cToggle = document.querySelector("#celcius");
cToggle.addEventListener("click", toggleCelcius);
*/
