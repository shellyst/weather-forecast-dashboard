//Global Variables//
var currentCityEl = document.querySelector("#current-city");
var currentIconEl = document.querySelector("#current-icon");
var temperatureEl = document.querySelector("#temperature");
var windEl = document.querySelector("#wind");
var humidityEl = document.querySelector("#humidity");
var uvEl = document.querySelector("#uv");
var iconEl = document.querySelector("#current-icon");
var searchBtnEl = document.querySelector("#search-btn");
var searched = document.querySelector("#search-city");
var fiveDayContainer = document.querySelector("#forecast-section");
var API_KEY = "9ee8642695c7bb9e77c98b6a3388381c";

//Event Listener
searchBtnEl.addEventListener("click", getCity);

//Main function to retrieve value of input from user, and pass that value into the getCurrentWeather function.
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

      temperatureEl.textContent = "Temp: " + data.main.temp + "°C";
      windEl.textContent = "Wind: " + data.wind.speed + " MPH";
      humidityEl.textContent = "Humidity: " + data.main.humidity + " %";
    });
}

//Function to call api and retrieve data for a five-day forecast.
function getFiveDay(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      API_KEY +
      "&units=metric"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("5day", data);

      uvEl.textContent = data.current.uvi;
      if (data.current.uvi < 3) {
        uvEl.setAttribute("class", "favorable");
      } else {
        if (data.current.uvi > 3 && data.current.uvi < 7) {
          uvEl.setAttribute("class", "moderate");
        } else {
          uvEl.setAttribute("class", "severe");
        }
      }

      //For loop to cycle through each of the 5 days, attached each element to a card, and set each piece of information needed for the forecast.
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
        var dailyTemp = document.createElement("p");
        dailyTemp.setAttribute("class", "daily-temp");
        dailyTemp.textContent = data.daily[i].temp.day;
        fiveDayCard.appendChild(dailyTemp);

        var dailyWind = document.createElement("p");
        dailyWind.setAttribute("class", "daily-wind");
        dailyWind.textContent = data.daily[i].wind_speed;
        fiveDayCard.appendChild(dailyWind);

        var dailyHumidity = document.createElement("p");
        dailyHumidity.setAttribute("class", "daily-humid");
        dailyHumidity.textContent = data.daily[i].humidity;
        fiveDayCard.appendChild(dailyHumidity);
      }
    });
}
