export async function getWeatherData(city) {
  const apiKey = "b08d495197a947a5a54161628232303"
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
  const response = await fetch(apiUrl)
  return response.json()
}

export async function parseWeatherData(city) {
  try{
    const weatherData = await getWeatherData(city)
    // location
    const name = weatherData.location.name
    const lat = weatherData.location.lat
    const lon = weatherData.location.lon
    // forecast average/min/max
    const forecast = [name, lat, lon]
    for(let i = 0; i < 3; i++) {
      const moonrise = weatherData.forecast.forecastday[i].astro.moonrise
      const moonset = weatherData.forecast.forecastday[i].astro.moonset
      const sunrise = weatherData.forecast.forecastday[i].astro.sunrise
      const sunset = weatherData.forecast.forecastday[i].astro.sunset
      const date = weatherData.forecast.forecastday[i].date
      const avgTempC = weatherData.forecast.forecastday[i].day.avgtemp_c
      const avgTempF = weatherData.forecast.forecastday[i].day.avgtemp_f
      const minTempC = weatherData.forecast.forecastday[i].day.mintemp_c
      const minTempF = weatherData.forecast.forecastday[i].day.mintemp_f
      const maxTempC = weatherData.forecast.forecastday[i].day.maxtemp_c
      const maxTempF = weatherData.forecast.forecastday[i].day.maxtemp_f
      const condIcon = weatherData.forecast.forecastday[i].day.condition.icon
      const condName = weatherData.forecast.forecastday[i].day.condition.text
      const totalPrecipIn = weatherData.forecast.forecastday[i].day.totalprecip_in 
      const totalPrecipMM = weatherData.forecast.forecastday[i].day.totalprecip_mm 
      const uv = weatherData.forecast.forecastday[i].day.uv
      const summary = {moonrise, moonset, sunrise, sunset, date, avgTempC, avgTempF, minTempC, minTempF, maxTempC, maxTempF, condIcon, condName, totalPrecipIn, totalPrecipMM, uv}
      // forecast pre hour
      const hours = []
      for(let j = 0; j < 24; j++) {
        const hourCondIcon = weatherData.forecast.forecastday[i].hour[j].condition.icon
        const hourCondText = weatherData.forecast.forecastday[i].hour[j].condition.text
        const hourPrecipIn = weatherData.forecast.forecastday[i].hour[j].precip_in
        const hourPrecipMM = weatherData.forecast.forecastday[i].hour[j].precip_mm
        const hourTempC = weatherData.forecast.forecastday[i].hour[j].temp_c
        const hourTempF = weatherData.forecast.forecastday[i].hour[j].temp_f
        const hourDateTime = weatherData.forecast.forecastday[i].hour[j].time
        const hourTime = hourDateTime.substring(hourDateTime.length - 5)
        const hourUV = weatherData.forecast.forecastday[i].hour[j].uv
        const hourWindKPH = weatherData.forecast.forecastday[i].hour[j].wind_kph
        const hourWindMPH = weatherData.forecast.forecastday[i].hour[j].wind_mph
        const hour = {hourCondIcon, hourCondText, hourPrecipIn, hourPrecipMM, hourTempC, hourTempF, hourTime, hourUV, hourWindKPH, hourWindMPH}
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