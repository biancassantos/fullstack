import { useEffect, useState } from "react"
import weatherServices from "./services/weather"

const Country = ({ name, capital, area, languages, image, latlng }) => {
  const [weather, setWeather] = useState({})
  const languagesList = []

  if (languages) {
    for (const language of Object.values(languages)) {
      languagesList.push(language)
    }
  }

  useEffect(() => {
    weatherServices
      .getWeather(latlng)
      .then(data => setWeather(data))
  }, [latlng])

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Area {area}</p>

      <h2>Languages</h2>
      <ul>
        {languagesList.map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={image} alt="" />

      <h2>Weather in {capital}</h2>
      <p>Temperature {weather?.current?.temperature_2m}°C</p>
      <p>Wind speed {weather?.current?.wind_speed_10m} km/h</p>
    </div>
  )
}

export default Country