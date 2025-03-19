import { useEffect, useState } from 'react'
import countriesService from "./services/countries"
import CountriesList from './CountriesList'
import Country from './Country'

function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [searched, setSearched] = useState([])
  const [showCountry, setShowCountry] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState([])

  const handleClick = (name) => {
    setShowCountry(true)
    const country = countries.filter(country => {
      return country.name.common.toLowerCase().includes(name.toLowerCase())
    })
    setSelectedCountry(country)
  }

  useEffect(() => {
    countriesService
      .getCountries()
      .then(data => setCountries(data))
  }, [])

  useEffect(() => {
    if (search != "") {
      const filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(search.toLowerCase())
      })
      setSearched(filteredCountries)
    } else {
      setSearched([])
      setShowCountry(false)
    }
  }, [countries, search])

  return (
    <>
      <div>
        find countries
        <input onChange={e => setSearch(e.target.value)} />
      </div>
      <div>
        {showCountry === false ?
         <CountriesList length={searched.length} searched={searched} handleClick={handleClick} /> :
         <Country 
         name={selectedCountry[0]?.name.common}
         capital={selectedCountry[0]?.capital}
         area={selectedCountry[0]?.area}
         languages={selectedCountry[0]?.languages}
         image={selectedCountry[0]?.flags.png}
         latlng={selectedCountry[0]?.capitalInfo.latlng}
         />
         }
      </div>
    </>
  )
}

export default App