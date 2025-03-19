import axios from "axios";

const getWeather = (latlng) => {
  const request = axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latlng[0]}&longitude=${latlng[1]}&current=temperature_2m,wind_speed_10m&forecast_days=1`)
  return request.then(response => response.data)
}

export default { getWeather }