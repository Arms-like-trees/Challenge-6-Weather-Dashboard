//grab current date
var now = dayjs().format('YYYY-MM-DD')

// make a API request (for data - weather)

// Fetch API method
function weatherRequest(city_name) {
    city_name = city_name.toLowerCase();
    var APIkey = 'b775e2b9ad92ea05a58543913cd30016';



    //console.log(url);

    // first we grab user input then make GEOCode request

    let GeoCode = `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${APIkey}`;

    fetch(GeoCode)
        .then(function (response) {
            if (response.status !== 200) {
                window.alert('please enter valid city')
            } else
                return response.json();
            console.log(response.json())
        })
        .then(function (data) {
            if (data === undefined) {
                return
            }

            var lat = data[0].lat
            var lon = data[0].lon
            let currentQueryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
            // Makes an Asynchronous Request 
            fetch(currentQueryURL)      // this call returns a PROMISE 
                .then(function (response) {
                    return response.json(); // this converts the incoming data from JSON to a JAvaScript Object
                })
                .then(function (data) {
                    if (data === undefined) {
                        return
                    }
                    console.log("********");
                    console.log(data);
                    let weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                    $('#current-weather').text(`${data.name} (${now})`);
                    $('#current-weather-icon').attr("src", weatherIcon);
                    $('#temperature').text(`Temp: ${data.main.temp}°F`);
                    $('#wind').text(`Wind: ${data.wind.speed} MPH`);
                    $('#humidity').text(`Humidity: ${data.main.humidity} %`);

                    var citiesArray = JSON.parse(localStorage.getItem('citiesSearched'));
                    console.log(citiesArray) || [];
                    if (!Array.isArray(citiesArray)) {
                        citiesArray = []
                    } if (!citiesArray.includes(city_name.toLowerCase())) {
                        citiesArray.push(city_name)
                        localStorage.setItem('citiesSearched', JSON.stringify(citiesArray));
                        searchedCitiesEl.append('<li><button>' + city_name + '</button></li>');
                        var cityButtonsLoadedLi = $('#searched-cities-list > li > button').last();
                        cityButtonsLoadedLi.on('click', buttonHandleCitySearch);


                    }


                }
                )
                .catch(function (error) {
                    console.log(error);
                });

                let forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`;
                fetch(forecastQueryURL)      // this call returns a PROMISE 
                    .then(function (response) {
                        return response.json();   // this converts the incoming data from JSON to a JAvaScript Object
                    })
                    .then(function (data) {
                        if (data === undefined) {
                            return
                        }
                        console.log("********");
                        console.log(data);
                        $('#forecast').text('5-Day Forecast:');
            
            
                        // for loop function
            
                        let noonTimeData = data.list.filter((day) => {
                            return day.dt_txt.includes("12:00:00")
                        });
                        console.log(noonTimeData);
            
                        for (let i = 0; i < noonTimeData.length; i++) {
                            //Day 1 forecast
                            $(`#current-day-${i}`).text(`${noonTimeData[i].dt_txt.slice(0, 10)}`);
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

        })

   
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



    //clears form input element
    $('input[name="city-input"]').val('');
}

//Create an eventl listenr on ther button to start search
citySearchEl.on('submit', handleCitySearch);

function createButton() {
    var citiesArray = JSON.parse(localStorage.getItem('citiesSearched')) || [];
    console.log(citiesArray)
    for (var i = 0; i < citiesArray.length; i++) {
        searchedCitiesEl.append('<li><button>' + citiesArray[i] + '</button></li>');

    }

}

createButton();



var cityButtonsLoadedLi = $('#searched-cities-list > li > button')
cityButtonsLoadedLi.on('click', buttonHandleCitySearch);

//To handle the city search with button
function buttonHandleCitySearch(event) {
    // event.preventDefault();
    console.log(event.target.textContent)
    // select the city search id to send to local storage and use the API
    // var buttonCityName = cityButtonsLoadedLi.txt();

    weatherRequest(event.target.textContent);

}

