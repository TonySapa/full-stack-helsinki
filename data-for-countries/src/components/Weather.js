import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [weather, setWeather] = useState({})

  const hookWeather = () => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        const weatherData = {
          temperature: response.data.current.temperature,
          weather_icons: response.data.current.weather_icons,
          wind_speed: response.data.current.wind_speed,
          wind_dir: response.data.current.wind_dir
        }
        setWeather(weatherData)
      })
  }
  
  useEffect(hookWeather, [])

  return (
    <>
      <h2>Weather in {country.capital}</h2>
      <p><b>Temperature:</b> {weather.temperature} celsius</p>
      <img src={weather.weather_icons} alt='imgage_weather'></img>
      <p><b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </>
  )
}


export default Weather