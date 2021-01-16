import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native';
import BigButton from './Components/BigButton';
import { DropDownBig } from './Components/DropDown';
import { antecedents } from './Components/Options';

import { currentDate, currentYear } from './Components/DateFunctions';

const defaultDay = () => {
    const currentDay = currentDate.getDate()
    if (currentDay < 10) {
        return `0${currentDay}`
    } else {
        return `${currentDay}`
    }
}

const defaultMinutes = () => {
    const minutes = currentDate.getMinutes()
    if (minutes < 10) {
        return `0${minutes}`
    } else {
        return `${minutes}`
    }
}   

const defaultMonth = () => {
    const currentMonth = currentDate.getMonth() + 1
    if (currentMonth < 10) {
        return `0${currentMonth}`
    } else {
        return `${currentMonth}`
    }
}

const defaultHours = () => {
    let hours = currentDate.getHours()
    if (hours > 12) {
        return hours -= 12
    }
    if (hours < 10) {
        return `0${hours}`
    }
    return hours
}

export default function Antecedent({ navigation, incident, setIncident }) {

    const navigateToNextPage = () => {
        if (incident["antecedent"]) {
            navigation.navigate("Behavior")
        } else {
            alert ("Select an Antecedent")
        }
    }

    useEffect(() => {
        setIncident({"year": `${currentYear}`,
        "month": `${defaultMonth()}`,
        "hour": `${defaultHours()}`,
        "minute": `${defaultMinutes()}`,
        "day": `${defaultDay()}`})
    }, [])

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.labelHeader}>A: Antecedent</Text>
            </View>
            <View style={styles.selectionContainer}>
                <DropDownBig
                    placeholder={"Select an Antecedent"}
                    items={antecedents}
                    onChangeItem={item => setIncident({...incident, "antecedent": item.value})}
                />
            </View>
            <View style={styles.incidentButton}>
                <BigButton
                    buttonText={"Submit Antecedent"}
                    handlePress={navigateToNextPage}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 80,
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    labelHeader: {
        fontSize: 48
    }
})