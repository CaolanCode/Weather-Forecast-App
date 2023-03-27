export const header = () => {
  // container
  const container = document.createElement('div')
  container.classList.add('header-container')
  container.innerText = 'Weather Forecast'
  // location input
  const inputContainer = document.createElement('div')
  inputContainer.classList.add('input-container')
  const input = document.createElement('input')
  input.classList.add('location-input')
  input.placeholder = 'Location'
  const inputBtn = document.createElement('button')
  inputBtn.classList.add('input-btn')
  inputBtn.innerHTML = "<span class='material-symbols-outlined'>search</span>"
  inputContainer.appendChild(input)
  inputContainer.appendChild(inputBtn)
  // append to container
  container.appendChild(inputContainer)
  return container
}

export const displayWeather = (data) => {
  // days container
  const allDaysContainer = document.createElement('div')
  allDaysContainer.classList.add('top-container')
  // city
  const city = document.createElement('div')
  city.classList.add('city-name')
  city.innerText = data[0]
  allDaysContainer.appendChild(city)
  const dayTiles = createDayTile(data)
  allDaysContainer.appendChild(dayTiles)
  // hour container
  const hourContainer = document.createElement('div')
  hourContainer.classList.add('hour-container')
  console.log(data)

  return allDaysContainer

}

const createDayTile = (data) => {
  const container = document.createElement('div')
  container.classList.add('days-container')
  for(let i = 0; i < 3; i++) {
    let day = 'Today'
    if(i === 1) {
      day = 'Tomorrow'
    } else if(i > 1) {
      const dateString = data[1+i][0].date
      const date = new Date(dateString)
      const weekday = new Array(7)
      weekday[0]="Sunday";
      weekday[1]="Monday";
      weekday[2]="Tuesday";
      weekday[3]="Wednesday";
      weekday[4]="Thursday";
      weekday[5]="Friday";
      weekday[6]="Saturday";
      day = weekday[date.getDay()];
    }
    let dayContainer = document.createElement('div')
    dayContainer.classList.add('day-container')
    // day
    const dayTitle = document.createElement('div')
    dayTitle.classList.add('day-title')
    dayTitle.innerText = day
    dayContainer.appendChild(dayTitle)
    // icon 
    const iconImage = document.createElement('img')
    iconImage.classList.add('day-icon')
    iconImage.src = data[1+i][0].condIcon
    dayContainer.appendChild(iconImage)
    // temp 
    const tempContainer = document.createElement('div')
    tempContainer.classList.add('temp-container')
    const maxTemp = document.createElement('div')
    maxTemp.classList.add('day-temp')
    maxTemp.classList.add('max-temp')
    const max = data[1+i][0].maxTempC
    const min = data[1+i][0].minTempC
    maxTemp.innerText = max
    tempContainer.appendChild(maxTemp)
    if(max !== min) {
      const minTemp = document.createElement('div')
      minTemp.classList.add('day-temp')
      minTemp.classList.add('min-temp')
      minTemp.innerText = min
      tempContainer.appendChild(minTemp)
    }
    dayContainer.appendChild(tempContainer)
    // condition
    const condition = document.createElement('div')
    condition.classList.add('day-condition')
    condition.innerText = data[1+i][0].condName
    dayContainer.appendChild(condition)
    container.appendChild(dayContainer)
  }
  return container
}

const createHour = () => {

}