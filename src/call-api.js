export async function getWeatherData(city) {
  const apiKey = "b08d495197a947a5a54161628232303"
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
  const response = await fetch(apiUrl)
  if(!response.ok) {
    throw new Error('Location not found')
  }
  const data = await response.json()
  return data
}

export async function parseWeatherData(city) {
  try{
    const weatherData = await getWeatherData(city)
    // location
    const name = weatherData.location.name
    // time 
    const dateTime = weatherData.current.last_updated
    const time = Number(dateTime.slice(11,13))
    // forecast average/min/max
    const forecast = [name, time]
    for(let i = 0; i < 3; i++) {
      const sunrise = weatherData.forecast.forecastday[i].astro.sunrise
      const sunset = weatherData.forecast.forecastday[i].astro.sunset
      const date = weatherData.forecast.forecastday[i].date
      const minTempC = Math.round(weatherData.forecast.forecastday[i].day.mintemp_c)
      const minTempF = Math.round(weatherData.forecast.forecastday[i].day.mintemp_f)
      const maxTempC = Math.round(weatherData.forecast.forecastday[i].day.maxtemp_c)
      const maxTempF = Math.round(weatherData.forecast.forecastday[i].day.maxtemp_f)
      const condIcon = weatherData.forecast.forecastday[i].day.condition.icon
      const condName = weatherData.forecast.forecastday[i].day.condition.text
      const summary = {sunrise, sunset, date, minTempC, minTempF, maxTempC, maxTempF, condIcon, condName}
      // forecast pre hour
      const hours = []
      for(let j = 0; j < 24; j++) {
        const hourCondIcon = weatherData.forecast.forecastday[i].hour[j].condition.icon
        const hourPercipIn = weatherData.forecast.forecastday[i].hour[j].precip_in
        const hourPercipMM = weatherData.forecast.forecastday[i].hour[j].precip_mm
        const hourTempC = Math.round(weatherData.forecast.forecastday[i].hour[j].temp_c)
        const hourTempF = Math.round(weatherData.forecast.forecastday[i].hour[j].temp_f)
        const hourDateTime = weatherData.forecast.forecastday[i].hour[j].time
        const hourTime = hourDateTime.substring(hourDateTime.length - 5)
        const hourWindKPH = Math.round(weatherData.forecast.forecastday[i].hour[j].wind_kph)
        const hourWindMPH = Math.round(weatherData.forecast.forecastday[i].hour[j].wind_mph)
        const gustKPH = Math.round(weatherData.forecast.forecastday[i].hour[j].gust_kph)
        const gustMPH = Math.round(weatherData.forecast.forecastday[i].hour[j].gust_mph)
        const hour = {hourCondIcon, hourPercipIn, hourPercipMM, hourTempC, hourTempF, hourTime, hourWindKPH, hourWindMPH, gustKPH, gustMPH}
        hours.push(hour)
      }
      const day = [summary, hours]
      forecast.push(day)
    }
    return forecast
  } catch(error) {
    console.error('Error fetch weather data: ', error)
  }
}