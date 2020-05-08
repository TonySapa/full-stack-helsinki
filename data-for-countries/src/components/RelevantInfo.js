import React from 'react'

const RelevantInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map((language, iso) => 
          <li>{language.name}</li>
        )}
      </ul>
      <img src={country.flag} alt='country flag' width='190px'/>
    </div>
  )
}

export default RelevantInfo