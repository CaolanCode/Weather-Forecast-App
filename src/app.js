import { parseWeatherData } from "./call-api";
import { header } from "./ui";


// google symbol link 
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
document.head.appendChild(link)


parseWeatherData('Dublin')

document.body.appendChild(header())