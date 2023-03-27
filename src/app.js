export async function getWeatherData(city) {
  const apiKey = ""
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`
  const response = await fetch(apiUrl)
  return response.json()
}

export async function parseWeatherData(city) {
  try{
    const weatherData = await getWeatherData(city)
    console.log(weatherData)

  } catch(error) {
    console.error('Error fetch weather data: ', error)
  }
}