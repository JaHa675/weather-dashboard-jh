var APIkey = "2b76560e6c2e7309ad09b0ec095e773b";
var city = "seattle";
var lat = 0;
var lon = 0;
var pastList = document.getElementById("pastList");
var savedList = [];
var compareList = [];

// what runs when the search button is clicked
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  
  city = $("#cityInput").val();
  console.log(city);
  savedList.push(city)
  compareList.push(city)
  addToHistory();
  $("ul").prepend(`<li>${city}</li>`);
  
  $("li:first-child").addClass("list-group-item my-3 history-item");
  
  getCityCoord();
});

// get actual weather data
function getCurrentWeather() {  
  var queryUrl ="https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +lat +"&lon=" +lon +"&appid=" +APIkey;
  
  fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var iconCode = data.current.weather[0].icon;
    console.log(data);

      $('#currentIcon').attr('src', 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png')
      $("#tempDisplay").text("Temp: " + data.current.temp);
      $("#windDisplay").text("Wind: " + data.current.wind_speed);
      $("#humidityDisplay").text("Humidity: " + data.current.humidity);
      $("#uvDisplay").text("UV Index: " + data.current.uvi);
      $("#currentDate").text(moment().format("MM/DD/YYYY"))
      $("#currentCityDisplay").text(city);
      if (data.current.uvi < 2){
        $("#uvDisplay").attr('style', 'background-color:green')
      } else if (data.current.uvi > 6){
        $("#uvDisplay").attr('style', 'background-color:red')
      } else {
        $("#uvDisplay").attr('style', 'background-color:yellow')
      }


      for (let i = 1; i < 6; i++) {
        $(`#futureDate${i}`).text(moment.unix(data.daily[i].dt).format("MM/DD/YY"));
        $(`#futureTempDisplay${i}`).text("Temp: " + data.daily[i].temp.day);
        $(`#futureWindDisplay${i}`).text("Wind: " + data.daily[i].wind_speed);
        $(`#futureHumidityDisplay${i}`).text("Humidity: " + data.daily[i].humidity);
        $(`#futureIcon${i}`).attr('src', 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png')
      }
    });
  }

// get lat and lon
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
// when you click on an item in the list this runs
$(pastList).on("click", function (event) {
    city = event.target.textContent;
    console.log(event.target.textContent)
  if (compareList.includes(city)){
    getCityCoord();
  }
});
// save function
function addToHistory() {
  localStorage.setItem("storedList", JSON.stringify(savedList))
}
// load function 
function loadList() {
  var loadingList = JSON.parse(localStorage.getItem("storedList"))
  for (let i = 0; i < loadingList.length; i++) {
    
    $("ul").prepend(`<li>${loadingList[i]}</li>`);
    $("li:first-child").addClass("list-group-item my-3 history-item");
  }
  compareList.push(...loadingList);
}
loadList();