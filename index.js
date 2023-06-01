const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '19eaa10e32630ce740441284ba5dc68c';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const minTemp = document.querySelector('.weather-details .min span');
            const maxTemp = document.querySelector('.weather-details .max span');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            console.log(json.weather[0].main);
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.svg';
                    break;

                case 'Rain':
                    image.src = 'rain.svg';
                    break;

                case 'Thunderstorm':
                        image.src = 'rain.svg';
                        break;
                case 'Snow':
                    image.src = 'snow.svg';
                    break;

                case 'Clouds':
                    image.src = 'cloud.svg';
                    break;

                case 'Haze':
                    image.src = 'mist.svg';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${(((parseInt(json.main.temp)) * (9/5))+32).toFixed(1)}<span>°F</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${(parseInt(json.wind.speed)/1.609).toFixed(1)}Mph`;
            minTemp.innerHTML =  `${(((parseInt(json.main.temp_min)) * (9/5))+32).toFixed(1)}<span>°F</span>`;
            maxTemp.innerHTML = `${(((parseInt(json.main.temp_max)) * (9/5))+32).toFixed(1)}<span>°F</span>`;


            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});