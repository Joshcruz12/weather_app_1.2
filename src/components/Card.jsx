import axios from "axios";
import React, { useState, useEffect } from "react";


const WeatherCard = () => {

    const [weather, setWeather] = useState({});
    const [isCelsius, setIsCelsius] = useState(true);
    const apiToken = "f40b1a382f651703fd8144f42a40d2fc";
    //useEffect para acceder a las cordenadas del usuario
    useEffect(() => {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            //API del clima y metodo para acceder:
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${apiToken}`)
                .then((res) => setWeather(res.data))
        }
        //Esta función nos retorna error si no se pudo acceder a sus cordenadas
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        navigator.geolocation.getCurrentPosition(success, error, options);
    }, [])
    //Cambia de Farenheit a Celsius con un click a F o C sin embargo falta averiguar como hacer sin que retorne el valor contrario
    const changeUnit = () => {
        setIsCelsius(!isCelsius);
    }


        //Esta sección es para incrustrar el tiempo y acceder al hora, día y minutos del usuario

        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = new Date();
        const dayOfWeek = weekday[day.getDay()]
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const time = hours + ':' + minutes;
        console.log(new Date())

        let celsius = Math.trunc((weather.main?.temp - 273.15));
        const farenheit = Math.trunc(weather.main?.temp);

        return (
            <div className='container'>
                <div className='panel-container'>

                    <div className='panel'>
                        <h2 className='location'> {weather.name}, {weather.sys?.country}</h2>

                    </div>
                    <div className='weather-container'>
                        <div className='group secondary'>
                            <h3 className='date-weather'>{dayOfWeek}: {time}</h3>

                            <h3 id='description'>{weather.weather?.[0].description}</h3>
                        </div>

                        <div className='group secondary'>
                            <h3 id='wind'>Wind: {weather.wind?.speed}m/s</h3>
                            <h3 id='humidity'>Humidity: {weather.main?.humidity}%</h3>
                        </div>
                        <div className='group secondary'>
                            <h3 id='wind'>Pressure: {weather.main?.pressure}hPa</h3>
                        </div>
                        <div className='temperature' id='temperature'>
                            <h1 className='temp'><i></i> <span>{isCelsius ? `${farenheit}` : `${celsius}`}</span><a className='fahrenheit active' onClick={changeUnit}>&deg;F</a><span className='divider secondary'>|</span><a onClick={changeUnit} className='celsius'>&deg;C</a></h1>
                        </div>
                        <div className='forecast'><h4>Feels like {isCelsius ? `${Math.trunc(weather.main?.feels_like)}F` : `${Math.round(weather.main?.feels_like - 273.15)}C`} | {weather.weather?.[0].description} | {weather.weather?.[0].icon}</h4></div>
                    </div>
                </div>
            </div>
        )
    }

    export default WeatherCard;