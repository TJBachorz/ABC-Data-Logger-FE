import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';


export default function IncidentDateTime({navigation, incident, setIncident, caseInfo}) {

    let currentDate = new Date()
    let startingYear = currentDate.getFullYear() - 20

    const months = {
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

    const createDayOptions = () => {
        let month = incident["month"]
        let daysList = []
        for (let i = 1; i <= months[month]; i++) {
            if (i < 10) {
                daysList.push({label: `0${i}`, value: `0${i}`})
            } else {
                daysList.push({label: `${i}`, value: `${i}`})
            }
        }
        return daysList
    }

    const createMonthOptions = () => {
        let monthList = []
        for (let i = 1; i <= 12; i++) {
            if (i < 10) {
                monthList.push({label: `0${i}`, value: `0${i}`})
            } else {
                monthList.push({label: `${i}`, value: `${i}`})
            }
        }
        return monthList
    }
    const createHourOptions = () => {
        let hourList = []
        for (let i = 1; i <= 24; i++) {
            if (i < 10) {
                hourList.push({label: `0${i}`, value: `0${i}`})
            } else {
                hourList.push({label: `${i}`, value: `${i}`})
            }
        }
        return hourList
    }

    const createMinuteOptions = () => {
        let minuteList = []
        for (let i = 1; i <= 60; i++) {
            if (i < 10) {
                minuteList.push({label: `0${i}`, value: `0${i}`})
            } else {
                minuteList.push({label: `${i}`, value: `${i}`})
            }
        }
        return minuteList
    }

    const createYearOptions = () => {
        let yearList = []
        for (let i = startingYear; i <= currentDate.getFullYear(); i++) {
            yearList.push({label: `${i}`, value: `${i}`})
        }
        return yearList.reverse()
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
                    items={createYearOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({"year": item.value})}
                />
                <DropDownPicker
                    placeholder="Month"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createMonthOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 120, margin: 5}}
                    onChangeItem={(item) => setIncident({"month": item.value})}
                />
                <DropDownPicker
                    placeholder="Day"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createDayOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({"day": item.value})}
                />
            </View>
            <View style={styles.timeContainer}>
                <DropDownPicker
                    placeholder="Hour"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createHourOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({"hour": item.value})}
                />
                <DropDownPicker
                    placeholder="Minute"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createMinuteOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 120, margin: 5}}
                    onChangeItem={(item) => setIncident({"minute": item.value})}
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
                    onPress={ () => navigation.navigate('Home')} 
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