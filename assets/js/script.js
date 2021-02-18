var searchBtn = document.querySelector(".btn");
var baseUrl = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "&appid=c325d98bc2a304d27df0719cfbbccb4f";
var units = "&units=imperial";
var currentConditions = document.getElementById("current-conditions");
var temp = document.getElementById("current");


function locationSelect(event) {
  event.preventDefault();

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
      // console.log(weatherData.list[0].main.temp)
    var currentTemp = document.createElement("h1");
    currentTemp.textContent = weatherData.list[0].main.temp;
    temp.append(currentTemp)
    console.log(currentTemp);
    })
    .catch(error => console.log(error)) //to catch error

  


}



searchBtn.addEventListener("click", locationSelect);
