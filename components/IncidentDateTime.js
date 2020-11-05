import React, {useState} from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",]

const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,]

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


export default function IncidentDateTime({navigation, incident, setIncident, caseInfo}) {

    let currentDate = new Date()
    let startingYear = currentDate.getFullYear() - 10

    const submitIncident = () => {
        postIncident()
        navigation.navigate('Home')
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
                    "time": `${incident["hour"]}:${incident["minute"]}:00`,
                    "case": `${caseInfo.id}`
                })
            }).then(response => response.json())
            .then(console.log)
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
                    defaultIndex={1}
                    dropDownMaxHeight={200}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({...incident, "year": item.value})}
                />
                <DropDownPicker
                    placeholder="Month"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createMonthOptions()}
                    defaultIndex={0}
                    dropDownMaxHeight={200}
                    containerStyle={{height: 60, width: 120, margin: 5}}
                    onChangeItem={(item) => setIncident({...incident, "month": item.value})}
                />
                <DropDownPicker
                    placeholder="Day"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createDayOptions()}
                    defaultIndex={0}
                    dropDownMaxHeight={200}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({...incident, "day": item.value})}
                />
            </View>
            <View style={styles.timeContainer}>
                <DropDownPicker
                    placeholder="Hour"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createNumberList(1, 24)}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({...incident, "hour": item.value})}
                />
                <DropDownPicker
                    placeholder="Minute"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createNumberList(1, 60)}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 120, margin: 5}}
                    onChangeItem={(item) => setIncident({...incident, "minute": item.value})}
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