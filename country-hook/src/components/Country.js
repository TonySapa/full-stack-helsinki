import React from 'react'

const Country = ({ country }) => {
	if (!country) {
		return null
	}

	if (!country.found) {
		return (
			<div>
				not found...
			</div>
		)
	}

	return (
		<div>
			<h3>{country.country.name} </h3>
			<div>capital {country.country.capital} </div>
			<div>population {country.country.population}</div>
			<img src={country.country.flag} height='100' alt={`flag of ${country.country.name}`} />
		</div>
	)
}

export default Country