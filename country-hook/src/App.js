import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}

const useCountry = (name) => {
	const [country, setCountry] = useState(null)
	const [countryName, setCountryName] = useState('')
	const [found, setFound] = useState(false)

	useEffect(() => {
		axios.get(`https://restcountries.eu/rest/v2/name/${countryName}`)
			.then((response) => {
				if (response.status === 200) {
					setCountry(...response.data)
					setFound(true)
				} else {
					setCountry(null)
					setFound(false)
				}
			})
	}, [countryName])

	const set = (name) => {
		setCountryName(name)
	}

	return {
		country,
		found,
		set
	}
}

const App = () => {
	const nameInput = useField('text')
	const [name, setName] = useState('')
	const country = useCountry(name)

	const fetch = (e) => {
		e.preventDefault()
		setName(nameInput.value)
		country.set(nameInput.value)
	}

	return (
		<div>
			<form onSubmit={fetch}>
				<input {...nameInput} />
				<button>find</button>
			</form>

			<Country country={country} />
		</div>
	)
}

export default App