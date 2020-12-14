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

let currentUnit = "c";
function displayInfo(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  currentUnit = "c";
  temperature.innerHTML = temp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = `${new Date((response.data.sys.sunrise) * 1000).getHours()}:${new Date((response.data.sys.sunrise) * 1000).getMinutes()}`;

  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `${new Date((response.data.sys.sunset) * 1000).getHours()}:${new Date((response.data.sys.sunset) * 1000).getMinutes()}`;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);

  let message = document.querySelector("#message");
  message.innerHTML = response.data.weather[0].main;
}

function handleSearch(event) {
  event.preventDefault();
  let apiKey = "37925f3d062dd55114f89e5051ff5f0f";
  let cityName = document.querySelector("#city-search-input").value;
  let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  cityDisplay.innerHTML = cityName;
  axios.get(endpoint).then(displayInfo);
}

function processLocation(response) {
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temp");
  let myCityName = response.data.name;
  city.innerHTML = myCityName;
  temperature.innerHTML = temp;
  currentUnit = "c";
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = `${new Date((response.data.sys.sunrise) * 1000).getHours()}:${new Date((response.data.sys.sunrise) * 1000).getMinutes()}`;

  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `${new Date((response.data.sys.sunset) * 1000).getHours()}:${new Date((response.data.sys.sunset) * 1000).getMinutes()}`;

  let icon = document.querySelector("#icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);


  let message = document.querySelector("#message");
  message.innerHTML = response.data.weather[0].main;
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


function toggleFarenheight(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  if(currentUnit === "c"){
    temperature.innerHTML = Math.round((temperature.innerHTML *(9/5)) + 32);
    currentUnit = "f";
  }
}

function toggleCelcius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  if(currentUnit === "f"){
    temperature.innerHTML = Math.round((temperature.innerHTML -32) *(5/9));
    currentUnit = "c";
  }
}


let fToggle = document.querySelector("#farenheight");
fToggle.addEventListener("click", toggleFarenheight);

let cToggle = document.querySelector("#celcius");
cToggle.addEventListener("click", toggleCelcius);

