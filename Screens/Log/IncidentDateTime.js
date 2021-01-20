import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import { 
    baseURL, 
    startingYear, 
    currentYear, 
    createMonthOptions,
    createDayOptions,
    calcHours,
    createNumberList
} from '../Components/DateFunctions';
import { BigButton } from '../Components/Button';
import { DropDownMedium, DropDownTiny } from '../Components/DropDown';
import { PickAMPM } from '../Components/Options';
import { Styles } from '../Components/Styles';

export default function IncidentDateTime({
    navigation, 
    incidentHistory, 
    setIncidentHistory, 
    incident, 
    setIncident,
}) {

    const caseProfile = useSelector(state => state.caseProfile)

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
                    "time": `${calcHours(incident, AMPM)}:${incident["minute"]}:00`,
                    "case": `${caseProfile.id}`
                })
            }).then(response => response.json())
            .then(newIncident => setIncidentHistory([...incidentHistory, newIncident]))
        })
    }

    return (
        <>
            <View style={Styles.headerContainer}>
                <Text style={Styles.labelHeader}>Date & Time</Text>
            </View>

            <View style={Styles.dateContainer}>
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

            <View style={Styles.timeContainer}>
                <DropDownMedium
                    items={createNumberList(1, 12)}
                    defaultValue={incident["hour"]}
                    onChangeItem={item => setIncident({...incident, "hour": item.value})}
                />
                <Text style={Styles.colon}>:</Text>
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
            
            <View style={Styles.bottomButton}>
                <BigButton
                    buttonText={"Submit Incident"}
                    handlePress={submitIncident}
                />
            </View>
        </>
    )
}