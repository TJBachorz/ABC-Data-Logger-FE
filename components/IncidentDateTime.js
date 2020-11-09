import React, {useState} from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",]

// const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,]

const monthsWithDays = {
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

let currentDate = new Date()
let startingYear = currentDate.getFullYear() - 10

export default function IncidentDateTime({navigation, incidentHistory, setIncidentHistory, incident, setIncident, caseInfo}) {

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
            return monthsWithDays[info["month"]] + 1
        } else {
            return monthsWithDays[info["month"]]
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
        return months.map(month => {
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
                    items={createNumberList(startingYear, currentDate.getFullYear()).reverse()}
                    defaultValue={incident["year"]}
                    dropDownMaxHeight={200}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({...incident, "year": item.value})}
                />
                <DropDownPicker
                    placeholder="Month"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createMonthOptions()}
                    defaultValue={incident["month"]}
                    dropDownMaxHeight={200}
                    containerStyle={{height: 60, width: 120, margin: 5}}
                    onChangeItem={(item) => setIncident({...incident, "month": item.value})}
                />
                <DropDownPicker
                    placeholder="Day"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createDayOptions()}
                    defaultValue={incident["day"]}
                    dropDownMaxHeight={200}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({...incident, "day": item.value})}
                />
            </View>
            <View style={styles.timeContainer}>
                <DropDownPicker
                    placeholder="Hour"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createNumberList(1, 12)}
                    defaultValue={incident["hour"]}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({...incident, "hour": item.value})}
                />
                <Text style={styles.colon}>:</Text>
                <DropDownPicker
                    placeholder="Minute"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createNumberList(0, 59)}
                    defaultValue={incident["minute"]}
                    containerStyle={{height: 60, width: 120, margin: 5}}
                    onChangeItem={(item) => setIncident({...incident, "minute": item.value})}
                />
                <DropDownPicker
                    placeholder="Minute"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={[
                        {label: "AM", value: "AM"},
                        {label: "PM", value: "PM"}
                    ]}
                    defaultValue={AMPM}
                    containerStyle={{height: 60, width: 120, margin: 5}}
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
        marginBottom: 50
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