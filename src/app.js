import { parseWeatherData } from "./call-api";
import { displayDays, header, createHourDisplay } from "./ui";
import './styles/style.css'


// google symbol link 
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
document.head.appendChild(link)

document.body.appendChild(header())

const displayLocation = async (city) => {
  try{
    const data = await parseWeatherData(city)
    // clear screen
    const prevDays = document.querySelector('.days-container')
    const prevHourSlide = document.querySelector('.slider-container')
    if(prevDays) {
      prevDays.remove()
    }
    if(prevHourSlide) {
      prevHourSlide.remove()
    }
    // days
    const days = displayDays(data)
    document.body.appendChild(days)
    // hours
    const hourSlide = createHourDisplay(data)
    document.body.appendChild(hourSlide)
    // clear previous location
    localStorage.clear()
    localStorage.setItem('location', city)
  } catch (error) {
    console.log(error)
    alert('Location not found')
  }
}

// localStorage
if(typeof(Storage) !== 'undefined') {
  const storedCity = localStorage.getItem('location')
  if(storedCity) {
    displayLocation(storedCity)
  } else {
    displayLocation('Dublin')
  }
}

// location input
const inputBtn = document.querySelector('.input-btn')
const input = document.querySelector('.location-input')
inputBtn.addEventListener('click', () => {
  const city = input.value
  displayLocation(city)
  input.value = ''
})
input.addEventListener('keydown', (event) => {
  if(event.keyCode === 13) {
    event.preventDefault()
    const city = input.value
    displayLocation(city)
    input.value = ''
  }
})