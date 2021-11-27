//Global Variables//
var currentCityEl = document.querySelector("#current-city");
var currentIconEl = document.querySelector("#current-icon");
var temperatureEl = document.querySelector("#temperature");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");
var searchBtnEl = document.querySelector("#search-btn");
var searched = document.querySelector("#search-city");
var fiveDayContainer = document.querySelector("#forecast-section");
var API_KEY = "9ee8642695c7bb9e77c98b6a3388381c";

searchBtnEl.addEventListener("click", getCity);

function getCity() {
  var currentCity = searched.value;
  getCurrentWeather(currentCity);
}

function getCurrentWeather(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      API_KEY +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("current", data);

      var latitude = data.coord.lat;
      var longitude = data.coord.lon;
      getFiveDay(latitude, longitude);

      currentCityEl.textContent = data.name;
      temperatureEl.textContent = data.main.temp;
      windEl.textContent = data.wind.speed;
      humidityEl.textContent = data.main.humidity;
    });
}

function getFiveDay(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("5day", data);

      uvEl.textContent = data.current.uvi;
      if (data.current.uvi < 3) {
        uvEl.setAttribute("class", "favorable");
      }
      // rest of your if checks for uv color

      for (var i = 0; i < 5; i++) {
        var fiveDayCard = document.createElement("div");
        fiveDayCard.setAttribute("class", "card");
        fiveDayContainer.append(fiveDayCard);

        var date = document.createElement("h3");
        date.textContent = moment()
          .add(i + 1, "days")
          .format("dddd");
        fiveDayCard.prepend(date);

        // data.daily[i]. for every piece of info you need
      }
    });
}
