import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import utilities from './Utilities';

import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    const calcHours = () => {
        let incidentCopy = JSON.parse(JSON.stringify(incident))
        if (AMPM === "PM" && incident["hour"] !== "12") {
            incidentCopy["hour"] = +incidentCopy["hour"] + 12
        } else if (AMPM === "AM" && incident["hour"] === "12")
            incidentCopy["hour"] = "00"
        return `${incidentCopy["hour"]}`
    }

    const postIncident = () => {
        return AsyncStorage.getItem("token").then(token => {
            fetch("http://localhost:8000/incidents/", {
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
                    "time": `${calcHours()}:${incident["minute"]}:00`,
                    "case": `${caseInfo.id}`
                })
            }).then(response => response.json())
            .then(newIncident => setIncidentHistory([...incidentHistory, newIncident]))
        })
    }

    const determineIfLeapYear = (info) => {
        if (info["month"] === "02" && info["year"] % 4 === 0) {
            return utilities.monthsWithDays[info["month"]] + 1
        } else {
            return utilities.monthsWithDays[info["month"]]
        }
    }

    const createDayOptions = () => {
        let info = JSON.parse(JSON.stringify(incident))
        let daysList = []
        for (let i = 1; i <= determineIfLeapYear(info); i++) {
            if (i < 10) {
                daysList.push({label: `0${i}`,  value: `0${i}`})
            } else {
                daysList.push({label: `${i}`, value: `${i}`})
            }
        }
        return daysList
    }

    const createMonthOptions = () => {
        return utilities.months.map(month => {
            return {label: `${month}`, value: `${month}`}
        })
    }

    const createNumberList = (startingNumber, endNumber) => {
        let numberList = []
        for (let i = startingNumber; i <= endNumber; i++) {
            if (i < 10) {
                numberList.push({label: `0${i}`, value: `0${i}`})
            } else {
                numberList.push({label: `${i}`, value: `${i}`})
            }
        }
        return numberList
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.labelHeader}>Date & Time</Text>
            </View>
            <View style={styles.selectionContainer}>
                <DropDownPicker
                    placeholder="Year"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createNumberList(utilities.startingYear, utilities.currentYear).reverse()}
                    defaultValue={incident["year"]}
                    dropDownMaxHeight={172}
                    dropDownStyle={{backgroundColor: '#f8f8ff'}}
                    containerStyle={{
                        height: 80, 
                        width: 110, 
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 1, height: 1}
                    }}
                    onChangeItem={(item) => setIncident({...incident, "year": item.value})}
                />
                <DropDownPicker
                    placeholder="Month"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createMonthOptions()}
                    defaultValue={incident["month"]}
                    dropDownMaxHeight={172}
                    dropDownStyle={{backgroundColor: '#f8f8ff'}}
                    containerStyle={{
                        height: 80, 
                        width: 130,
                        margin: 5, 
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 1, height: 1}
                    }}
                    onChangeItem={(item) => setIncident({...incident, "month": item.value})}
                />
                <DropDownPicker
                    placeholder="Day"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createDayOptions()}
                    defaultValue={incident["day"]}
                    dropDownMaxHeight={172}
                    dropDownStyle={{backgroundColor: '#f8f8ff'}}
                    containerStyle={{
                        height: 80, 
                        width: 110, 
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 1, height: 1}
                    }}
                    onChangeItem={(item) => setIncident({...incident, "day": item.value})}
                />
            </View>
            <View style={styles.timeContainer}>
                <DropDownPicker
                    placeholder="Hour"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createNumberList(1, 12)}
                    defaultValue={incident["hour"]}
                    dropDownMaxHeight={185}
                    dropDownStyle={{backgroundColor: '#f8f8ff'}}
                    containerStyle={{
                        height: 80, 
                        width: 110, 
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 1, height: 1}
                    }}
                    onChangeItem={(item) => setIncident({...incident, "hour": item.value})}
                />
                <Text style={styles.colon}>:</Text>
                <DropDownPicker
                    style={styles.dropDown}
                    placeholder="Minute"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createNumberList(0, 59)}
                    defaultValue={incident["minute"]}
                    dropDownMaxHeight={185}
                    dropDownStyle={{backgroundColor: '#f8f8ff'}}
                    containerStyle={{
                        height: 80, 
                        width: 130, 
                        margin: 5,
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 1, height: 1}
                    }}
                    onChangeItem={(item) => setIncident({...incident, "minute": item.value})}
                />
                <DropDownPicker
                    placeholder="AM/PM"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={[
                        {label: "AM", value: "AM"},
                        {label: "PM", value: "PM"}
                    ]}
                    defaultValue={AMPM}
                    dropDownStyle={{backgroundColor: '#f8f8ff'}}
                    containerStyle={{
                        height: 80, 
                        width: 90,
                        margin: 5, 
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {width: 1, height: 1}
                    }}
                    onChangeItem={(item) => {
                        setAMPM(item.value)}
                    }
                />
            </View>
            <View style={styles.incidentButton}>
                <Button
                    title={"Submit Incident"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                        shadowColor: 'black',
                        shadowOpacity: 0.4,
                        shadowOffset: {width: 2, height: 2}
                    }}
                    onPress={submitIncident}
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
        alignItems: 'center'
    },
    labelHeader: {
        fontSize: 48
    },
    dropDown: {
        borderRadius: 8
    }
})