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
      const dateString = data[2+i][0].date
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
    iconImage.src = data[2+i][0].condIcon
    dayContainer.appendChild(iconImage)
    // temp 
    const tempContainer = document.createElement('div')
    tempContainer.classList.add('temp-container')
    const maxTemp = document.createElement('div')
    maxTemp.classList.add('day-temp')
    maxTemp.classList.add('max-temp')
    const max = data[2+i][0].maxTempC
    const min = data[2+i][0].minTempC
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
    condition.innerText = data[2+i][0].condName
    dayContainer.appendChild(condition)
    container.appendChild(dayContainer)
  }
  return container
}

export const createHourDisplay = (data) => {
  const sliderContainer = document.createElement('div')
  sliderContainer.classList.add('slider-container')

  const hourLabels = createHourLabel()
  sliderContainer.appendChild(hourLabels)

  const allHoursContainer = document.createElement('div')
  allHoursContainer.classList.add('all-days-cols')

  for(let i = 0; i < 3; i++) {
    let day = createFullDay(data, 2+i)
    allHoursContainer.appendChild(day)
  }
  sliderContainer.appendChild(allHoursContainer)

  return sliderContainer
}

const createFullDay = (data, day) => {
  const container = document.createElement('div')
  container.classList.add('full-day-container')

  const dateRow = document.createElement('div')
  dateRow.classList.add('date-row')
  const tempDate = data[day][0].date
  const date = new Date(tempDate)
  const dateString = date.toString().slice(0,10)
  dateRow.textContent = dateString
  container.appendChild(dateRow)

  const currentHour = data[1]

  const allHoursCols = document.createElement('div')
  allHoursCols.classList.add('day-hour-cols')

  const fullSunrise = data[day][0].sunrise
  const sunrise = Number(fullSunrise.slice(0,2))
  const fullSunset = data[day][0].sunset
  const sunset = Number(fullSunset.slice(0,2)) + 12

  let i = 0
  if(day === 2) {
    i = currentHour
  }
  while(i < 24) {
    let hour = document.createElement('div')
    hour.classList.add('hour-col')
    if(i === 0) {
      hour.classList.add('midnight-col')
    }

    let time = document.createElement('div')
    time.classList.add('hour-time')
    let hourMin = data[day][1][i].hourTime
    time.textContent = hourMin
    hour.appendChild(time)

    let sun = document.createElement('div')
    sun.classList.add('hour-text')
    if(currentHour === sunrise) {
      sun.innerHTML = "<span class='material-symbols-outlined sun-icon'>wb_twilight</span>"
    } else if(currentHour === sunset) {
      sun.innerHTML = "<span class='material-symbols-outlined sun-icon'>wb_twilight</span>"
    }
    hour.appendChild(sun)

    let icon = document.createElement('img')
    icon.classList.add('hour-icon')
    icon.src = data[day][1][i].hourCondIcon
    hour.appendChild(icon)
    
    let percip = document.createElement('div')
    percip.classList.add('hour-percip')
    percip.textContent = data[day][1][i].hourPercipMM
    hour.appendChild(percip)

    let windSpeed = document.createElement('div') 
    windSpeed.classList.add('hour-wind')
    windSpeed.textContent = data[day][1][i].hourWindKPH
    hour.appendChild(windSpeed)

    let gust = document.createElement('div')
    gust.classList.add('hour-text')
    gust.textContent = data[day][1][i].gustKPH
    hour.appendChild(gust)

    let temp = document.createElement('div')
    temp.classList.add('hour-text')
    temp.textContent = data[day][1][i].hourTempC
    hour.appendChild(temp)

    allHoursCols.appendChild(hour)
    i++;
  }
  container.appendChild(allHoursCols)
  return container
}

const createHourLabel = () => {
  const hourLabels = document.createElement('div')
  hourLabels.classList.add('hour-labels-container')

  const timeLabel = document.createElement('div') 
  timeLabel.classList.add('time-label')
  timeLabel.textContent = 'Time'
  hourLabels.appendChild(timeLabel)

  const sunLabel = document.createElement('div')
  sunLabel.classList.add('hour-label')
  sunLabel.textContent = 'Sun'
  hourLabels.appendChild(sunLabel)

  const iconLabel = document.createElement('div')
  iconLabel.classList.add('icon-label')
  iconLabel.textContent = 'Weather'
  hourLabels.appendChild(iconLabel)

  const percipLabel = document.createElement('div')
  percipLabel.classList.add('hour-label')
  percipLabel.textContent = 'Percipitation'
  hourLabels.appendChild(percipLabel)

  const percipMeasure = document.createElement('div')
  percipMeasure.classList.add('measurement-label')
  percipMeasure.setAttribute('id', 'percip-measurement') 
  percipMeasure.textContent = 'mm'
  hourLabels.appendChild(percipMeasure)

  const windLabel = document.createElement('div')
  windLabel.classList.add('hour-label')
  windLabel.textContent = 'Wind'
  hourLabels.appendChild(windLabel)

  const windSpeedLabel = document.createElement('div')
  windSpeedLabel.classList.add('measurement-label')
  windSpeedLabel.setAttribute('id', 'wind-measurement') 
  windSpeedLabel.textContent = 'Km/h'
  hourLabels.appendChild(windSpeedLabel)

  const gustLabel = document.createElement('div')
  gustLabel.classList.add('hour-label')
  gustLabel.textContent = 'Gust'
  hourLabels.appendChild(gustLabel)

  const tempLabel = document.createElement('div')
  tempLabel.classList.add('hour-label')
  tempLabel.textContent = 'Temperature'
  hourLabels.appendChild(tempLabel)

  return hourLabels
}