import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';


export default function IncidentDateTime({navigation, incident, setIncident, caseInfo}) {

    let currentDate = new Date()
    let startingYear = currentDate.getFullYear() - 20

    const months = {
        "January": 31,
        "February": 28,
        "March": 31,
        "April": 30,
        "May": 31,
        "June": 30,
        "July": 31,
        "August": 31,
        "September": 30,
        "October": 31,
        "November": 30,
        "December": 31,  
    }

    // const createMonthOptions = (months) => {
    //     let names = months.keys()
    //     return months.map(month, index) {
    //         if (index + 1 < 10) {
    //             return {label: `0${i}`, value: `0${i}`}
    //         } else {
    //             monthList.push({label: `${i}`, value: `${i}`})
    //         }
    //     }
    //     return monthList
    // }

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
                    items={createMonthOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({"day": item.value})}
                />
            </View>
            <View style={styles.selectionContainer}>
                <DropDownPicker
                    placeholder="Hour"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createHourOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 100}}
                    onChangeItem={(item) => setIncident({"year": item.value})}
                />
                <DropDownPicker
                    placeholder="Minute"
                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                    items={createMinuteOptions()}
                    defaultIndex={0}
                    containerStyle={{height: 60, width: 120, margin: 5}}
                    onChangeItem={(item) => setIncident({"month": item.value})}
                />
            </View>
            <View style={styles.incidentButton}>
                <Button
                    title={"Submit IncidentDateTime"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={ () => navigation.navigate('IncidentDateTime')} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    yearInput: {
        borderWidth: 1,
        height: 30,
        fontSize: 24,
        backgroundColor: 'white',
        padding: 10
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