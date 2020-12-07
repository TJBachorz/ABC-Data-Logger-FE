import AsyncStorage from '@react-native-async-storage/async-storage';

const authorizeUser = (data) => {
    if (data.token) {
        AsyncStorage.setItem('token', data.token)
        navigation.navigate('Case Selection Main')
    } else {
        return (
            alert("Invalid Email or Password!")
        )
    }
}

const utilities = {
    currentYear: new Date().getFullYear(),
    currentDate: new Date(),
    startingYear: new Date().getFullYear() - 10,
    months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",],
    monthsWithDays: {
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
    },
    monthsLongForm: {
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
    },
    // authorizeUser: authorizeUser(data)
}
export default utilities;