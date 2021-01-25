const submitButton = document.getElementById('submit-btn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city-name');
const data_hide = document.querySelector('.middle-layer');
const temp = document.querySelector('#temp span');
const weatherApi = 'ac5b703292b4af77f9d107fd168f904d';
celsuisConverter = (k) => (k - 273.15).toPrecision(2);
const dayView = document.getElementById('day');
const dateView = document.getElementById('today-day');
const date = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day = days[date.getDay()];
const month = months[date.getMonth()];
const currentDate = date.getDate();
const weatherIcon = {
    'clear sky': 'weatherAssets/sun.png',
    'few clouds': 'weatherAssets/cloudy.png',
    'scattered clouds': 'weatherAssets/cloudy_sun.png',
    'broken clouds': 'weatherAssets/cloudy_wind.png',
    'showers': 'weatherAssets/raining_sun.png',
    'rainy': 'weatherAssets/raining.png',
    'stormy': 'weatherAssets/lighting.png',
    'snow': 'weatherAssets/snow.png',
    'fog': 'weatherAssets/cloudy_night.png',
    'mist': 'weatherAssets/wind.png',
}
cityName.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        alert('ccc');
    }
});
window.navigator.geolocation.getCurrentPosition(success, fail);

//
async function btnclick() {
    let cityVal = cityName.value;
    if (cityVal === '') {
        city_name.innerHTML = 'Please write the name before search'
    } else {
        try {
            let location_url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${weatherApi}`;
            let res = await fetch(location_url);
            res.json().then(value => {
                data_hide.classList.remove('data-hide');
                city_name.innerHTML = cityVal;
                temp.innerHTML = celsuisConverter(value.main.temp);
                console.log(value);
                document.querySelector('.temp-icon').src = weatherIcon[value.weather[0].description];
            });
        } catch (e) {
            console.log(e)
            data_hide.classList.add('data-hide');
            city_name.innerHTML = 'Please enter check your city name';
        }

    }
}

submitButton.addEventListener('click', btnclick);

function fail(value) {
    alert('fail to get your location please')
    console.log(value)
}

async function success(Coords) {
    const {latitude, longitude} = Coords.coords;
    let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApi}`;
    let res = await fetch(weatherUrl);
    res.json().then(value => {
        data_hide.classList.remove('data-hide');
        city_name.innerHTML = value.name;
        temp.innerHTML = celsuisConverter(value.main.temp);
        console.log(celsuisConverter(value));
        console.log(weatherIcon[value.weather[0].description])
        document.querySelector('.temp-icon').src = weatherIcon[value.weather[0].description];
    });
}

dayView.innerHTML = day;
dateView.innerHTML = `${currentDate} ${month}`