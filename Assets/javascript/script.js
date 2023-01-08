// make a API request (for data - weather)

// Fetch API method

let lat = '40.73';
let lon = '-73.93';
let APIkey = 'b775e2b9ad92ea05a58543913cd30016';

let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${APIkey}`;

console.log(url);

// first we grab user input then make GEOCode request

let testingUrl = 'https://jsonplaceholder.typicode.com/albums'

// Makes an Asynchronous Request 
fetch(testingUrl)      // this call returns a PROMISE 
    .then(function(response) {
        // console.log(response);
        return response.json();   // this converts the incoming data from JSON to a JAvaScript Object
    })
    .then(function(data) {
        console.log("********");
        console.log(data);

        let test = data[0];
        console.log(test);

        console.log('I am IN the FETCH Call')

        // here is where make a second API call (if this call depends on DATA from the FIRST API CALL)
    })
    .catch(function(error) {
        console.log(error);
    });

    
console.log("I am after the FETCH call");

var searchedCitiesEl = $('#searched-cities-list');
var citySearchEl = $('#city-search');

//To handle the city search
function handleCitySearch(event) {
    event.preventDefault();

    //select the city search id to send to local storage and use the API
    var cityForm = $('input[name="city-input"]').val();

    if (!cityForm) {
        console.log('No city inputted');
        return;
    }

    //Adds to searched cities list

    searchedCitiesEl.append('<li>' + cityForm + '</li>');

    //clears form input element
    $('input[name="city-input"]').val('');
}

//Create an eventl listenr on ther button to start search
citySearchEl.on('submit', handleCitySearch);