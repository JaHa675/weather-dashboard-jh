var APIkey = "2b76560e6c2e7309ad09b0ec095e773b";
var city = "seattle";
var lat = 0;
var lon = 0;

$("#searchBtn").on("click", function (event) {
  event.preventDefault();

  city = $("#cityInput").val();
  console.log(city);

  $("ul").prepend(`<li>${city}</li>`)

    $("ul:first-child").attr("class", "list-group-item my-3")


  getCityCoord();
});

function getCurrentWeather() {
  console.log(lat);
  console.log(lon);

  var queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.weather[0].main);
      console.log(data.weather[0].description);
    });
}

function getCityCoord() {
  var queryUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + APIkey;

  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
      getCurrentWeather();
    });
}

function addToHistory() {

}
