var searchBtn = document.querySelector(".btn");
// var futureBtn = document.getElementById("future");
var baseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&appid=c325d98bc2a304d27df0719cfbbccb4f";
var units = "&units=imperial";

var date = document.getElementById("date");
var timeDate = moment().format('MMMM Do YYYY, h:mma');
// var tmrwDay = moment().add(1, 'days').calendar;
// var followingDay = moment().add(2, 'days').calendar;


var uvUrl = "https://api.openweathermap.org/data/2.5/onecall?"
var lat = "lat=";
var lon = "&lon=";

var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=";

// var latSearch = 0;
// var lonSearch = 0;


function locationSelect(event) {
  event.preventDefault();

  date.textContent = timeDate;
  

  var searchInput = document.querySelector('#search-input').value;
  var fiveHeader = document.getElementById("forcast");
  fiveHeader.textContent = "5 Day Forcast for " + searchInput + ":"

  if (!searchInput) {
    confirm('Please select a location');
    return;
  }

  var stringQuery = fiveDay + searchInput + apiKey;
  console.log(stringQuery)
  var queryString = baseUrl + searchInput + units + apiKey;
  console.log(queryString)

  fetch(queryString)
    .then(response => response.json()) //converting the response to json
    //.then((weatherData) => {     -->another way to write the above function!
    // })
    .then(function (weatherData) {
      //pass in data that we are expecting to get back from the fetch request
      console.log(weatherData)
// current conditions
      var city = document.getElementById("city");
      city.textContent = "Current conditions in " + weatherData.city.name + ":";

      var currentTemp = document.getElementById("temp");
      currentTemp.textContent = "Temperature: " + weatherData.list[0].main.temp + " F";

      var currentHumidity = document.getElementById("humidity");
      currentHumidity.textContent = "Humidity: " + weatherData.list[0].main.humidity;

      var currentWind = document.getElementById("windspeed");
      currentWind.textContent = "Wind Speed: " + weatherData.list[0].wind.speed;

      var currentUvIndex = document.getElementById("uvIndex");
      currentUvIndex.textContent = "UV Index: " + weatherData.list[0].humidity;
//future conditions
      var today = document.getElementById("today");
      var todayDate = weatherData.list[0].dt_txt;
      today.textContent = todayDate.slice(0, 10);

      var tmrw = document.getElementById("tmrw");
      var tmrwDate = weatherData.list[8].dt_txt;
      tmrw.textContent = tmrwDate.slice(0, 10);

      var followingDay = document.getElementById("two-days");
      var followingDayDate = weatherData.list[16].dt_txt;
      followingDay.textContent = followingDayDate.slice(0, 10);
      
      var threeDays = document.getElementById("three-days");
      var threeDaysDate = weatherData.list[24].dt_txt;
      threeDays.textContent = threeDaysDate.slice(0, 10);

      var fourDays = document.getElementById("four-days");
      var fourDaysDate = weatherData.list[32].dt_txt;
      fourDays.textContent = fourDaysDate.slice(0, 10);


      // var todayIcon = weatherData.list[0].weather[0].icon;
      // if (todayIcon = "04d") {
      //   today.textContent = todayIcon;
      // }
      console.log("today icon:", todayIcon);
      today.textContent = "Todays Weather : " + weather
    })
    .catch(error => console.log(error)) //to catch error

  // fetch(stringQuery)
  //   .then(response => response.json())
  //   .then(function (data) {
      
  //     var forecast = document.getElementById("five-day");
  //     console.log(data)
  //   })
}


searchBtn.addEventListener("click", locationSelect);


