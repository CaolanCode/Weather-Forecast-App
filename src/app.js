import { parseWeatherData } from "./call-api";
import { displayDays, header, createHourDisplay } from "./ui";
import './styles/style.css'


// google symbol link 
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
document.head.appendChild(link)

document.body.appendChild(header())

// location input
const inputBtn = document.querySelector('.input-btn')
inputBtn.addEventListener('click', async () => {
  const city = document.querySelector('.location-input').value
  const data = await parseWeatherData(city)
  // days
  const days = displayDays(data)
  document.body.appendChild(days)
  // hours
  let hourSlide = document.createElement('div')
  hourSlide.classList.add('hour-container')
  hourSlide = createHourDisplay(data)
  document.body.appendChild(hourSlide)
})
