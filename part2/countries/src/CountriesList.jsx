const CountriesList = ({ length, searched, handleClick }) => {
  if (length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return (searched.map(country => {
    return <p key={country.cca2}>
      {country.name.common}
      <button onClick={() => handleClick(country.name.common)}>Show</button>  
    </p>
  }))
}

export default CountriesList