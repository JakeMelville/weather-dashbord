var searchBtn = document.querySelector(".btn");

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInput = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('Please select a location');
    return;
  }

  var queryString = './search-results.html?q=' + searchInput;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
