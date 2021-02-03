import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const openDrawerMenu = (navigation) => {
    navigation.openDrawer()
}