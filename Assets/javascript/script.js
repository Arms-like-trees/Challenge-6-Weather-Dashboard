//grab current date
var now = dayjs().format('YYYY-MM-DD')

// make a API request (for data - weather)

// Fetch API method
function weatherRequest(city_name) {

    var APIkey = 'b775e2b9ad92ea05a58543913cd30016';

    let currentQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIkey}&units=imperial`;

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
            let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
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
    let forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${APIkey}&units=imperial`;
    fetch(forecastQueryURL)      // this call returns a PROMISE 
        .then(function (response) {
            return response.json();   // this converts the incoming data from JSON to a JAvaScript Object
        })
        .then(function (data) {
            console.log("********");
            console.log(data);
            $('#forecast').text('5-Day Forecast:');


            // for loop function

            let noonTimeData = data.list.filter((day) => {
                return day.dt_txt.includes("12:00:00")
            });
            console.log(noonTimeData);
           
            for (let i=0; i < noonTimeData.length; i++){
                    //Day 1 forecast
            $(`#current-day-${i}`).text(`${noonTimeData[i].dt_txt.slice(0, 10)}`);
            console.log(`${data.list[2].main.temp}`);
            let weatherIcon = `https://openweathermap.org/img/wn/${noonTimeData[i].weather[0].icon}@2x.png`;
            //need to double check on how to do the image
            $(`#current-icon-${i}`).attr("src", weatherIcon);
            $(`#current-temperature-${i}`).text(`Temp:${noonTimeData[i].main.temp}°F`);
            $(`#current-wind-${i}`).text(`Wind:${noonTimeData[i].wind.speed}MPH`);
            $(`#current-humidity-${i}`).text(`Humidity:${noonTimeData[i].main.humidity}%`);
            }

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

    var citiesArray = JSON.parse(localStorage.getItem('citiesSearched'));
    console.log(citiesArray)||[];
    if (!Array.isArray(citiesArray)){
        citiesArray = []
    }
    citiesArray.push(cityForm)
    localStorage.setItem('citiesSearched', JSON.stringify(citiesArray));

    


    //Adds to searched cities list

    searchedCitiesEl.append('<li><button>' + cityForm + '</buuton></li>');

    //clears form input element
    $('input[name="city-input"]').val('');
}

//Create an eventl listenr on ther button to start search
citySearchEl.on('submit', handleCitySearch);

function createButton () {
    var citiesArray = JSON.parse(localStorage.getItem('citiesSearched'));
    console.log(citiesArray)
    for (var i =0; i = citiesArray.length; i++){
        searchedCitiesEl.append('<li>' + citiesArray[i] + '</li>');
    }
        
    }

    createButton ();
    