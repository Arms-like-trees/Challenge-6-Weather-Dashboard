//grab current date
var now = dayjs().format('MM/DD/YYYY')

// make a API request (for data - weather)

// Fetch API method
function weatherRequest(city_name) {

    var APIkey = 'b775e2b9ad92ea05a58543913cd30016';

    let currentQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIkey}&units=imperial`;

    //console.log(url);

    // first we grab user input then make GEOCode request


    // Makes an Asynchronous Request 
    fetch(currentQueryURL)      // this call returns a PROMISE 
        .then(function (response) {
            return response.json();   // this converts the incoming data from JSON to a JAvaScript Object
        })
        .then(function (data) {
            console.log("********");
            console.log(data);
            let weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            $('#current-weather').text(`${data.name} (${now})`);
            $('#current-weather-icon').attr("src", weatherIcon);
            $('#temperature').text(`Temp: ${data.main.temp}°F`);
            $('#wind').text(`Wind: ${data.wind.speed} MPH`);
            $('#humidity').text(`Humidity: ${data.main.humidity} %`);
        })
        .catch(function (error) {
            console.log(error);
        });
    //start of the 5 day forecast fetch call
    let forecastQueryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${APIkey}&units=imperial`;
    fetch(forecastQueryURL)      // this call returns a PROMISE 
        .then(function (response) {
            return response.json();   // this converts the incoming data from JSON to a JAvaScript Object
        })
        .then(function (data) {
            console.log("********");
            console.log(data);
            $('#forecast').text('5-Day Forecast:');

            //Day 1 forecast
            $('#current-day+1').text(`${data.list[2].dt_text}`);
            console.log(`${data.list[2].dt_text}`);
            //need to double check on how to do the image
            $('#current-icon+1').attr(`${data.list[2].weather[0].icon}`);
            $('#current-temperature+1').text(`${data.list[2].main.temp}`);
            $('#current-wind+1').text(`${data.list[2].wind.speed}`);
            $('#current-humidity+1').text(`${data.list[2].main.humidity}`);

            //Day 2 forecast
            $('#current-day+2').text(`${data.list[10].dt_text}`);
            $('#current-icon+2').text(`${data.list[10].weather[0].icon}`);
            $('#current-temperature+2').text(`${data.list[10].main.temp}`);
            $('#current-wind+2').text(`${data.list[10].wind.speed}`);
            $('#current-humidity+2').text(`${data.list[10].main.humidity}`);

        })
        .catch(function (error) {
            console.log(error);
        });
}


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
    weatherRequest(cityForm);
    //Adds to searched cities list

    searchedCitiesEl.append('<li>' + cityForm + '</li>');

    //clears form input element
    $('input[name="city-input"]').val('');
}

//Create an eventl listenr on ther button to start search
citySearchEl.on('submit', handleCitySearch);