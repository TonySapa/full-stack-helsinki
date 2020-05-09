import React from 'react'
import RelevantInfo from './RelevantInfo'
import Weather from './Weather'

const CountryDetail = ({ country, weather }) => {
  return (
    <div>
      <RelevantInfo country={country} />
      <Weather country={country} weather={weather} />
    </div>
  )
}

export default CountryDetail