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
    let dayContainer = document.createElement('div')
    dayContainer.classList.add('day-container')
    dayContainer.addEventListener('click', () => {
      moveSlider(i)
      const allDay = document.querySelectorAll('.day-container')
      allDay.forEach(day => day.classList.remove('active-day'))
      dayContainer.classList.add('active-day')
    })
    let day = 'Today'
    if(i === 0) {
      dayContainer.classList.add('active-day')
    } else if(i === 1) {
      day = 'Tomorrow'
    } else {
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
    maxTemp.innerText = max + '°C'
    tempContainer.appendChild(maxTemp)
    if(max !== min) {
      const minTemp = document.createElement('div')
      minTemp.classList.add('day-temp')
      minTemp.classList.add('min-temp')
      minTemp.innerText = min + '°C'
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
  const tempButtons = createTempBtns(data)

  sliderContainer.appendChild(allHoursContainer)
  sliderContainer.appendChild(tempButtons)

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
      container.classList.add('midnight-col')
    }

    let time = document.createElement('div')
    time.classList.add('time-result')
    time.classList.add('small-result')
    let hourMin = data[day][1][i].hourTime
    time.textContent = hourMin
    hour.appendChild(time)

    let sun = document.createElement('div')
    sun.classList.add('sun-result')
    sun.classList.add('small-result')
    if(i === sunrise) {
      sun.innerHTML = "<span class='material-symbols-outlined sun-icon'>wb_twilight</span>"
    } else if(i === sunset) {
      sun.innerHTML = "<span class='material-symbols-outlined sun-icon'>wb_twilight</span>"
    }
    hour.appendChild(sun)

    let icon = document.createElement('img')
    icon.classList.add('icon-result')
    icon.classList.add('big-result')
    icon.src = data[day][1][i].hourCondIcon
    hour.appendChild(icon)
    
    let percip = document.createElement('div')
    percip.classList.add('percip-result')
    percip.classList.add('big-result')
    percip.textContent = data[day][1][i].hourPercipMM
    hour.appendChild(percip)

    let windSpeed = document.createElement('div') 
    windSpeed.classList.add('wind-result')
    windSpeed.classList.add('big-result')
    windSpeed.textContent = data[day][1][i].hourWindKPH
    hour.appendChild(windSpeed)

    let gust = document.createElement('div')
    gust.classList.add('gust-result')
    gust.classList.add('small-result')
    gust.textContent = data[day][1][i].gustKPH
    hour.appendChild(gust)

    let temp = document.createElement('div')
    temp.classList.add('temp-result')
    temp.classList.add('big-result')
    let tempValue = data[day][1][i].hourTempC
    temp.textContent = tempValue
    if(tempValue <= 2) {
      temp.style.backgroundColor = '#05C5FD'
    } else if(tempValue <= 7) {
      temp.style.backgroundColor = '#f7f76f'
    } else if(tempValue <= 14) {
      temp.style.backgroundColor = '#FDEA05'
    } else if (tempValue <= 20) {
      temp.style.backgroundColor = '#FD7A05'
    } else {
      temp.style.backgroundColor = '#ff0000'
    }
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
  timeLabel.classList.add('small-label')
  timeLabel.textContent = 'Time'
  hourLabels.appendChild(timeLabel)

  const sunLabel = document.createElement('div')
  sunLabel.classList.add('small-label')
  sunLabel.textContent = 'Sun'
  hourLabels.appendChild(sunLabel)

  const iconLabel = document.createElement('div')
  iconLabel.classList.add('big-label')
  iconLabel.textContent = 'Weather'
  hourLabels.appendChild(iconLabel)

  const percipContainer = document.createElement('div')
  percipContainer.classList.add('big-label')

  const percipLabel = document.createElement('div')
  percipLabel.textContent = 'Percipitation'
  percipContainer.appendChild(percipLabel)

  const percipMeasure = document.createElement('div')
  percipMeasure.classList.add('measurement-label')
  percipMeasure.setAttribute('id', 'percip-measurement') 
  percipMeasure.textContent = 'mm'
  percipContainer.appendChild(percipMeasure)
  hourLabels.appendChild(percipContainer)

  const windContainer = document.createElement('div')
  windContainer.classList.add('multi-label')

  const windLabel = document.createElement('div')
  windLabel.textContent = 'Wind'
  windContainer.appendChild(windLabel)

  const windSpeedLabel = document.createElement('div')
  windSpeedLabel.classList.add('measurement-label')
  windSpeedLabel.setAttribute('id', 'wind-measurement') 
  windSpeedLabel.textContent = 'Km/h'
  windContainer.appendChild(windSpeedLabel)

  const gustLabel = document.createElement('div')
  gustLabel.textContent = 'Gust'
  windContainer.appendChild(gustLabel)
  hourLabels.appendChild(windContainer)

  const tempContainer = document.createElement('div')
  tempContainer.classList.add('big-label')

  const tempLabel = document.createElement('div')
  tempLabel.textContent = 'Temperature'
  tempContainer.appendChild(tempLabel)

  const tempMeasure = document.createElement('div')
  tempMeasure.classList.add('measurement-label')
  tempMeasure.setAttribute('id', 'temp-measurement')
  tempMeasure.textContent = '°C'
  tempContainer.appendChild(tempMeasure)
  hourLabels.appendChild(tempContainer)

  return hourLabels
}

const moveSlider = (day) => {
  const slider = document.querySelector('.all-days-cols')
  const allDays =document.querySelectorAll('.full-day-container')
  switch(day){
    case 0:
      slider.scrollLeft = 0
      break;
    case 1:
      const dayOneWidth = allDays[0].offsetWidth
      slider.scrollLeft = dayOneWidth
      break;
    case 2:
      const oneTwoWidth = allDays[0].offsetWidth + allDays[1].offsetWidth
      slider.scrollLeft = oneTwoWidth
      break;
  }
}

const createTempBtns = (data) => {
  // celcius - fahrenheit
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('temp-btn-container')
  const celcius = document.createElement('button')
  celcius.setAttribute('id', 'celcius-btn')
  celcius.classList.add('temp-btn')
  celcius.classList.add('active-temp-btn')
  celcius.textContent = '°C'
  const fahrenheit = document.createElement('button')
  fahrenheit.setAttribute('id', 'fahr-btn')
  fahrenheit.classList.add('temp-btn')
  fahrenheit.textContent = '°F'
  // listeners
  celcius.addEventListener('click', () => {
    changeMeasurements(data, 'C')
    celcius.classList.toggle('active-temp-btn')
    fahrenheit.classList.toggle('active-temp-btn')
  })
  fahrenheit.addEventListener('click', () => {
    changeMeasurements(data, 'F')
    fahrenheit.classList.toggle('active-temp-btn')
    celcius.classList.toggle('active-temp-btn')
  })
  buttonContainer.appendChild(celcius)
  buttonContainer.appendChild(fahrenheit)
  return buttonContainer
}

const changeMeasurements = (data, choice) => {
  const maxTempDay = document.querySelectorAll('.max-temp')
  const minTempDay = document.querySelectorAll('.min-temp')
  const percip = document.querySelectorAll('.percip-result')
  const wind = document.querySelectorAll('.wind-result')
  const gust = document.querySelectorAll('.gust-result')
  const temp = document.querySelectorAll('.temp-result')
  const windMeasurement = document.getElementById('wind-measurement')
  const tempMeasurement = document.getElementById('temp-measurement')
  const percipMeasurement = document.getElementById('percip-measurement')
  let j = data[1]
  let k = 0
  if(choice === 'F') {
    percipMeasurement.textContent = 'in'
    tempMeasurement.textContent = '°F'
    windMeasurement.textContent = 'Mph'
    for(let i = 0; i < 3; i++) {
      maxTempDay[i].textContent = data[2+i][0].maxTempF + '°F' 
      minTempDay[i].textContent = data[2+i][0].minTempF + '°F'
    }
    for(let i = 0; i < 3; i++) {
      while(j < 24) {
        percip[k].innerText = data[i+2][1][j].hourPercipIn
        wind[k].innerText = data[i+2][1][j].hourWindMPH
        gust[k].innerText = data[i+2][1][j].gustMPH
        temp[k].innerText = data[i+2][1][j].hourTempF
        j++
        k++
      }
      j = 0
    }
  } else {
    percipMeasurement.textContent = 'mm'
    tempMeasurement.textContent = '°C'
    windMeasurement.textContent = 'Km/h'
    for(let i = 0; i < 3; i++) {
      maxTempDay[i].textContent = data[2+i][0].maxTempC + '°C' 
      minTempDay[i].textContent = data[2+i][0].minTempC + '°C'
    }
    for(let i = 0; i < 3; i++) {
      while(j < 24) {
        percip[k].innerText = data[i+2][1][j].hourPercipMM
        wind[k].innerText = data[i+2][1][j].hourWindKPH
        gust[k].innerText = data[i+2][1][j].gustKPH
        temp[k].innerText = data[i+2][1][j].hourTempC
        j++
        k++
      }
      j = 0
    }
  }
}