import AsyncStorage from '@react-native-async-storage/async-storage';

const utilities = {
    baseURL: "http://localhost:8000",
    currentDate: new Date(),
    currentYear: new Date().getFullYear(),
    startingYear: new Date().getFullYear() - 10,
    months: [
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
        "12",
    ],
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
    MMM: {
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
    },
    MMMM: {
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
    createMonthOptions() {
        return utilities.months.map(month => {
            return {label: month, value: month}
        })
    },
    authorizeUser(data, navigation) {
        if (data.token) {
            AsyncStorage.setItem('token', data.token)
            navigation.navigate('Case Selection Main')
        } else {
            return (
                alert("Invalid Email or Password!")
            )
        }
    }
}
export default utilities;