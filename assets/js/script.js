// global variables

var searchBtn = document.querySelector(".btn");
var baseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&appid=c325d98bc2a304d27df0719cfbbccb4f";
var units = "&units=imperial";

var date = document.getElementById("date");
var timeDate = moment().format('MMMM Do YYYY, h:mma');

var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=";

var searchHistory = [];

// function triggers on button click
function locationSelect(event) {
      event.preventDefault();

      //adding user input to searchhistory array and saving user input to local storage
      var history = {
            previous: document.getElementById("search-input").value
      }
      searchHistory.push(history);
      // console.log(searchHistory);
      localStorage.setItem('City', JSON.stringify(searchHistory))
      
      document.getElementById("sh").textContent = "Search History"
      date.textContent = timeDate;


      // titles displayed once the function is called
      var searchInput = document.querySelector('#search-input').value;
      var fiveHeader = document.getElementById("forcast");
      fiveHeader.textContent = "5 Day Forcast for " + searchInput + ":"

      // if user doesnt type in anything prompt will pop up letting them know. 
      if (!searchInput) {
            confirm('Please select a location');
            return;
      }

      // my api url
      var queryString = baseUrl + searchInput + units + apiKey;
      console.log(queryString)

      fetch(queryString)
            .then(response => response.json()) //converting the response to json
            //.then((weatherData) => {     -->another way to write the above function!
            // })
            .then(function (weatherData) {
                  //pass in data that we are expecting to get back from the fetch request
                  console.log(weatherData)

                  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.city.coord.lat}&lon=${weatherData.city.coord.lon}${apiKey}`)
                        .then(response => response.json())
                        .then(uvData => {
                              var currentUvIndex = document.getElementById("uvIndex");
                              currentUvIndex.textContent = "UV Index: " + uvData.current.uvi;

                        })
                  // current conditions
                  var city = document.getElementById("city");
                  city.textContent = "Current conditions in " + weatherData.city.name + ":";

                  var currentTemp = document.getElementById("temp");
                  currentTemp.textContent = "Temperature: " + weatherData.list[0].main.temp + " F";

                  var currentHumidity = document.getElementById("humidity");
                  currentHumidity.textContent = "Humidity: " + weatherData.list[0].main.humidity;

                  var currentWind = document.getElementById("windspeed");
                  currentWind.textContent = "Wind Speed: " + weatherData.list[0].wind.speed;

                  document.getElementById(`icon`).src = "http://openweathermap.org/img/w/" + weatherData.list[0].weather[0].icon + ".png";


                  //future conditions
                  //for loop- loops through weatherData and adds all results to each days <ul> in html
                  //used template literals to easily access elements
                  //the slice is to keep the date clean in html

                  for (var i = 0; i <= 32; i += 8) {

                        document.getElementById(`day-${i}`).textContent = weatherData.list[i].dt_txt.slice(5, 10);
                        document.getElementById(`icon-${i}`).src = "http://openweathermap.org/img/w/" + weatherData.list[i].weather[0].icon + ".png";
                        document.getElementById(`degrees-${i}`).textContent = "Temp: " + weatherData.list[i].main.temp + "F";
                        document.getElementById(`humid-${i}`).textContent = "Humidity: " + weatherData.list[i].main.humidity;

                        // console.log(weatherData.list[i])
                        if (weatherData.list[i].weather[0].main = "Clouds") {
                              document.getElementById(`icon-${i}`).textContent
                        }
                  }

                  // keeping the data below for myself- good example of how to incoorperate data into above loop.


                  // // today
                  //       var today = document.getElementById("day-0");
                  //       var todayDate = weatherData.list[0].dt_txt;
                  //       today.textContent = todayDate.slice(5, 10);

                  // // //tmrw
                  //       var tmrw = document.getElementById("day-8");
                  //       var tmrwDate = weatherData.list[8].dt_txt;
                  //       tmrw.textContent = tmrwDate.slice(5, 10);

                  // //two-days
                  //       var followingDay = document.getElementById("day-16");
                  //       var followingDayDate = weatherData.list[16].dt_txt;
                  //       followingDay.textContent = followingDayDate.slice(5, 10);
                  // //three-days      
                  //       var threeDays = document.getElementById("day-24");
                  //       var threeDaysDate = weatherData.list[24].dt_txt;
                  //       threeDays.textContent = threeDaysDate.slice(5, 10);
                  // //four-days
                  //       var fourDays = document.getElementById("day-32");
                  //       var fourDaysDate = weatherData.list[32].dt_txt;
                  //       fourDays.textContent = fourDaysDate.slice(5, 10);



            })
            //any errors w api, the function wont run
            .catch(error => console.log(error)) //to catch error

}

//button click to start loactioSelect function 
searchBtn.addEventListener("click", locationSelect);