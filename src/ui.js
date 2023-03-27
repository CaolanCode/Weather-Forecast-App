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

export const displayDays = (data) => {
  // days container
  const container = document.createElement('div')
  container.classList.add('days-container')
  // city
  const city = document.createElement('div')
  city.classList.add('city-name')
  city.innerText = data[0]
  container.appendChild(city)
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

export const createHourDisplay = (data) => {
  const container = document.createElement('div')
  container.classList.add('all-hours-container')
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 24; j++) {
      let hour = document.createElement('div')
      hour.classList.add('single-hour-container')

      let time = document.createElement('div')
      time.classList.add('hour-time')
      time.textContent = data[1+i][1][j].hourTime
      hour.appendChild(time)

      let sun = document.createElement('div')
      sun.classList.add('hour-sun')
      hour.appendChild(sun)

      let icon = document.createElement('img')
      icon.classList.add('hour-icon')
      icon.src = data[1+i][1][j].hourCondIcon
      hour.appendChild(icon)

      let percip = document.createElement('div')
      percip.classList.add('hour-percip')
      percip.textContent = data[1+i][1][j].hourPercipMM
      hour.appendChild(percip)

      let windSpeed = document.createElement('div') 
      windSpeed.classList.add('hour-windspeed')
      windSpeed.textContent = data[1+i][1][j].hourWindKPH
      hour.appendChild(windSpeed)

      let gust = document.createElement('div')
      gust.classList.add('hour-gust')
      gust.textContent = data[1+i][1][j].gustKPH
      hour.appendChild(gust)

      let temp = document.createElement('div')
      temp.classList.add('hour-temp')
      temp.textContent = data[1+i][1][j].hourTempC
      hour.appendChild(temp)

      container.appendChild(hour)
    }
  }
  return container
}