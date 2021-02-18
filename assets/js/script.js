var time = new Date().toLocaleTimeString();

var searchBtn = document.querySelector(".btn");
var baseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&appid=c325d98bc2a304d27df0719cfbbccb4f";
var units = "&units=imperial";
var date = document.getElementById("date");



function locationSelect(event) {
  event.preventDefault();

  date.textContent = time;

  var searchInput = document.querySelector('#search-input').value;

  if (!searchInput) {
    confirm('Please select a location');
    return;
  }

  var queryString = baseUrl + searchInput + units + apiKey;
  console.log(queryString)

  fetch(queryString) 
    .then(response => response.json()) //converting the response to json
    //.then((weatherData) => {     -->another way to write the above function!
    // })
    .then(function (weatherData) {
      //pass in data that we are expecting to get back from the fetch request
      console.log(weatherData)

    var currentTemp = document.getElementById("temp");
    currentTemp.textContent = "Temperature: " + weatherData.list[0].main.temp + " F";

    var currentHumidity = document.getElementById("humidity");
    currentHumidity.textContent = "Humidity: " + weatherData.list[0].main.humidity;

    var currentWind = document.getElementById("windspeed");
    currentWind.textContent = "Wind Speed: " + weatherData.list[0].wind.speed;

    var currentUvIndex = document.getElementById("uvIndex");
    currentUvIndex.textContent = "UV Index: " + weatherData.list[0].humidity;
    })
    .catch(error => console.log(error)) //to catch error

  


}



searchBtn.addEventListener("click", locationSelect);
