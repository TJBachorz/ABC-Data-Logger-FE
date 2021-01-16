import React, { useEffect } from 'react'
import { View, Text } from 'react-native';

import BigButton from '../Components/BigButton';
import { DropDownBig } from '../Components/DropDown';
import { antecedents } from '../Components/Options';
import { currentDate, currentYear } from '../Components/DateFunctions';
import { Styles } from '../Components/Styles';


const defaultDay = () => {
    const currentDay = currentDate.getDate()
    return currentDay < 10 ? `0${currentDay}` : `${currentDay}`
}

const defaultMinutes = () => {
    const minutes = currentDate.getMinutes()
    return minutes < 10 ? `0${minutes}` : `${minutes}`
}   

const defaultMonth = () => {
    const currentMonth = currentDate.getMonth() + 1
    return currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`
}

const defaultHours = () => {
    let hours = currentDate.getHours()
    if (hours > 12) {
        hours = hours - 12
    }
    return hours < 10 ? `0${hours}` : `${hours}`
}

export default function Antecedent({ navigation, incident, setIncident }) {

    const navigateToNextPage = () => {
        incident["antecedent"] ? 
            navigation.navigate("Behavior") 
            : alert ("Select an Antecedent")
    }

    useEffect(() => {
        setIncident({
            "year": `${currentYear}`,
            "month": `${defaultMonth()}`,
            "hour": `${defaultHours()}`,
            "minute": `${defaultMinutes()}`,
            "day": `${defaultDay()}`
        })
    }, [])

    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.labelHeader}>A: Antecedent</Text>
            </View>
            <View style={Styles.selectionContainer}>
                <DropDownBig
                    placeholder={"Select an Antecedent"}
                    items={antecedents}
                    onChangeItem={item => setIncident({...incident, "antecedent": item.value})}
                />
            </View>
            <View style={Styles.incidentButton}>
                <BigButton
                    buttonText={"Submit Antecedent"}
                    handlePress={navigateToNextPage}
                />
            </View>
        </>
    )
}