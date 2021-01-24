import AsyncStorage from '@react-native-async-storage/async-storage';

export const baseURL = "http://localhost:8000"

export const currentDate = new Date()
export const currentYear = new Date().getFullYear()
export const startingYear = new Date().getFullYear() - 20

export const months = [
    "01", 
    "02", 
    "03", 
    "04", 
    "05", 
    "06", 
    "07", 
    "08", 
    "09", 
    "10", 
    "11", 
    "12"
]
    
export const monthsWithDays = {
    "01": 31, 
    "02": 28, 
    "03": 31, 
    "04": 30, 
    "05": 31, 
    "06": 30,
    "07": 31, 
    "08": 31, 
    "09": 30, 
    "10": 31, 
    "11": 30,
    "12": 31,
}

export const MMM = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sept",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
}

export const MMMM = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",  
}

export const createMonthOptions = () => {
    return months.map(month => {
        return {label: month, value: month}
    })
}

export const calcHours = (incident, AMPM) => {
    let incidentCopy = JSON.parse(JSON.stringify(incident))
    if (AMPM === "PM" && incident["hour"] !== "12") {
        incidentCopy["hour"] = +incidentCopy["hour"] + 12
    } else if (AMPM === "AM" && incident["hour"] === "12") {
        incidentCopy["hour"] = "00"
    }
    return `${incidentCopy["hour"]}`
}

export const range = (start, end) => {
    return Array(end - start + 1)
        .fill()
        .map((_, index) => start + index)
}

const determineIfLeapYear = (info) => {
    return info["month"] === "02" && info["year"] % 4 === 0 ?
        monthsWithDays[info["month"]] + 1
        : monthsWithDays[info["month"]]
}

export const createDayOptions = (incident) => {
    let info = JSON.parse(JSON.stringify(incident))
    const daysInMonth = range(1, +determineIfLeapYear(info))
    return daysInMonth.map(day => {
        return day < 10 ? 
            {label: `0${day}`,  value: `0${day}`}
            : {label: `${day}`, value: `${day}`}
    })
}

export const createNumberList = (start, end) => {
    const numberArray = range(start, end)
    return numberArray.map(i => {
        return i < 10 ?
            {label: `0${i}`, value: `0${i}`}
            : {label: `${i}`, value: `${i}`}
        })
}

export const authorizeUser = (data, navigation) => {
    if (data.token) {
        AsyncStorage.setItem('token', data.token)
        navigation.navigate('Case Stack')
    } else {
        return (
            alert("Invalid Email or Password!")
        )
    }
}

export const defaultDay = () => {
    const currentDay = currentDate.getDate()
    return currentDay < 10 ? `0${currentDay}` : `${currentDay}`
}

export const defaultMinutes = () => {
    const minutes = currentDate.getMinutes()
    return minutes < 10 ? `0${minutes}` : `${minutes}`
}   

export const defaultMonth = () => {
    const currentMonth = currentDate.getMonth() + 1
    return currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`
}

export const defaultHours = () => {
    let hours = currentDate.getHours()
    if (hours > 12) {
        hours -= 12
    }
    return hours < 10 ? `0${hours}` : `${hours}`
}

