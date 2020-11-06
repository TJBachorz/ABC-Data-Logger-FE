import React, {useEffect} from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

let currentDate = new Date()

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
        hours -= 12
    }
    if (hours < 10) {
        return `0${hours}`
    }
    return hours
}


export default function Antecedent({navigation, incident, setIncident, caseInfo}) {

    const navigateToNextPage = () => {
        if (incident["antecedent"]) {
            navigation.navigate("Behavior")
        } else {
            alert ("Select an Antecedent")
        }
    }

    useEffect(() => {
        setIncident({"year": `${currentDate.getFullYear()}`,
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
                <DropDownPicker
                    labelStyle={{fontSize: 24, color: 'black', padding: 10}}
                    items={[
                        {label: 'Given direction/task/activity', value: 'Given direction/task/activity'},
                        {label: 'New task or activity', value: 'New task or activity'},
                        {label: 'Difficult task or activity', value: 'Difficult task or activity'},
                        {label: 'Waiting', value: 'Waiting'},
                        {label: 'Preferred activity interrupted', value: 'Preferred activity interrupted'},
                        {label: 'Activity/item denied (told no)', value: 'Activity/item denied (told no)'},
                        {label: 'Loud and noisy environment', value: 'Loud and noisy environment'},
                        {label: 'Given a correction', value: 'Given a correction'},
                        {label: 'Transition', value: 'Transition'},
                        {label: 'Attention given to others', value: 'Attention given to others'},
                        {label: 'Presence of specific person', value: 'Presence of specific person'},
                        {label: 'Attention not given when wanted', value: 'Attention not given when wanted'},
                        {label: 'Alone (no activity)', value: 'Alone (no activity)'},
                        {label: 'Alone (no attention)', value: 'Alone (no attention)'}
                    ]}
                    defaultIndex={0}
                    dropDownMaxHeight={375}
                    containerStyle={{height: 100, width: 360}}
                    onChangeItem={(item) => setIncident({...incident, "antecedent": item.value})}
                />
            </View>
            <View style={styles.incidentButton}>
                <Button
                    title={"Submit Antecedent"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={navigateToNextPage} 
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
        alignItems: 'center'
    },
    labelHeader: {
        fontSize: 48
    }
})