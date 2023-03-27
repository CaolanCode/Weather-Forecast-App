import { parseWeatherData } from "./call-api";
import { displayWeather, header } from "./ui";
import './styles/style.css'


// google symbol link 
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
document.head.appendChild(link)

document.body.appendChild(header())

const inputBtn = document.querySelector('.input-btn')
inputBtn.addEventListener('click', async () => {
  const city = document.querySelector('.location-input').value
  const data = await parseWeatherData(city)
  const days = displayWeather(data)
  document.body.appendChild(days)
})
