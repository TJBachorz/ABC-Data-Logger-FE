import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    baseURL, 
    startingYear, 
    currentYear, 
    createMonthOptions,
    createDayOptions,
    calcHours,
    createNumberList
} from '../Components/DateFunctions';
import BigButton from '../Components/BigButton';
import { DropDownMedium, DropDownTiny } from '../Components/DropDown';
import { PickAMPM } from '../Components/Options';

export default function IncidentDateTime({
    navigation, 
    incidentHistory, 
    setIncidentHistory, 
    incident, 
    setIncident, 
    caseInfo
}) {

    const [AMPM, setAMPM] = useState("AM")

    const submitIncident = () => {
        postIncident()
        navigation.navigate('Incident History')
    }

    const postIncident = () => {
        return AsyncStorage.getItem("token").then(token => {
            fetch(`${baseURL}/incidents/`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "antecedent": `${incident["antecedent"]}`,
                    "behavior": `${incident["behavior"]}`,
                    "consequence": `${incident["consequence"]}`,
                    "date": `${incident["year"]}-${incident["month"]}-${incident["day"]}`,
                    "time": `${calcHours(incident)}:${incident["minute"]}:00`,
                    "case": `${caseInfo.id}`
                })
            }).then(response => response.json())
            .then(newIncident => setIncidentHistory([...incidentHistory, newIncident]))
        })
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.labelHeader}>Date & Time</Text>
            </View>
            <View style={styles.selectionContainer}>
                <DropDownMedium
                    items={createNumberList(startingYear, currentYear).reverse()}   
                    defaultValue={incident["year"]}
                    onChangeItem={item => setIncident({...incident, "year": item.value})}
                />
                <DropDownMedium
                    items={createMonthOptions()}   
                    defaultValue={incident["month"]}
                    onChangeItem={item => setIncident({...incident, "month": item.value})}
                />
                <DropDownMedium
                    items={createDayOptions(incident)}   
                    defaultValue={incident["day"]}
                    onChangeItem={item => setIncident({...incident, "day": item.value})}
                />
            </View>
            <View style={styles.timeContainer}>
                <DropDownMedium
                    items={createNumberList(1, 12)}
                    defaultValue={incident["hour"]}
                    onChangeItem={item => setIncident({...incident, "hour": item.value})}
                />
                <Text style={styles.colon}>:</Text>
                <DropDownMedium
                    items={createNumberList(0, 59)}
                    defaultValue={incident["minute"]}
                    onChangeItem={item => setIncident({...incident, "minute": item.value})}
                />
                <DropDownTiny
                    items={PickAMPM}                    
                    defaultValue={AMPM}
                    onChangeItem={(item) => setAMPM(item.value)}
                />
            </View>
            <View style={styles.incidentButton}>
                <BigButton
                    buttonText={"Submit Incident"}
                    handlePress={submitIncident}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    colon: {
        fontSize: 24,
        padding: 4,
        paddingLeft: 8
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    headerContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    incidentButton: {
        justifyContent: 'center',
        marginBottom: 100,
        marginBottom: 40,
    },
    labelHeader: {
        fontSize: 48
    }
})