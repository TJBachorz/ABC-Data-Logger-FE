import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import BigButton from './Components/BigButton';

import { baseURL, monthsWithDays, months } from './Components/DateFunctions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

let currentDate = new Date()
let startingYear = currentDate.getFullYear() - 20

export default function NewCase({ isNewCase, setIsNewCase, navigation }) {

    const [newCase, setNewCase] = useState({})

    const createCase = () => {
        AsyncStorage.getItem("token")
            .then(token => {
                fetch(`${baseURL}/cases/`, {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: newCase["name"],
                        dob: `${newCase["year"]}-${newCase["month"]}-${newCase["day"]}`
                    })
                }).then(response => response.json())
                .then(createdCase => linkCaseToAccount(createdCase, token))
                .then(caseLinkRedirect)
            })
        }
        
    const caseLinkRedirect = (caseLink) => {
        if (caseLink.status > 300) {
            alert("Error Occurred, Account Failed to link")
        }
        setIsNewCase(!isNewCase)
        navigation.navigate("Case Selection Main")
    }

    const linkCaseToAccount = (createdCase, token) => {
        return fetch(`${baseURL}/caselinks`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({case: createdCase.id})
        }).then(response => response.json())
    }

    const determineIfLeapYear = (info) => {
        if (info["month"] === "02" && info["year"] % 4 === 0) {
            return monthsWithDays[info["month"]] + 1
        } else {
            return monthsWithDays[info["month"]]
        }
    }

    const createDayOptions = () => {
        let info = JSON.parse(JSON.stringify(newCase))
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
        <View style={styles.caseCreation}>
            <Text style={styles.selectionHeader}>
                Enter a Name and Date of Birth:
            </Text>
            <Text>{newCase["name"]}{newCase["year"]}{newCase["month"]}{newCase["day"]}</Text>
            <TextInput 
                style={styles.input}
                placeholder="Case Name"
                placeholderTextColor="#f8f8ff"
                onChangeText={text => setNewCase({...newCase, "name": text})}
            />
            <View style={styles.selectionContainer}>
                <View style={styles.datePickers}>
                    <DropDownPicker
                        placeholder="Year"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={createNumberList(startingYear, currentDate.getFullYear()).reverse()}
                        defaultValue={newCase["year"]}
                        dropDownMaxHeight={250}
                        containerStyle={{height: 60, width: 110}}
                        onChangeItem={(item) => setNewCase({...newCase, "year": item.value})}
                    />
                    <DropDownPicker
                        placeholder="Month"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={createMonthOptions()}
                        defaultValue={newCase["month"]}
                        dropDownMaxHeight={250}
                        containerStyle={{height: 60, width: 130, margin: 5}}
                        onChangeItem={(item) => setNewCase({...newCase, "month": item.value})}
                    />
                    <DropDownPicker
                        placeholder="Day"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={createDayOptions()}
                        defaultValue={newCase["day"]}
                        dropDownMaxHeight={250}
                        containerStyle={{height: 60, width: 110}}
                        onChangeItem={(item) => setNewCase({...newCase, "day": item.value})}
                    />
                </View>
            </View>
            <BigButton
                buttonText={"Create New Case"}
                handlePress={createCase}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    caseCreation:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    datePickers: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    selectionHeader: {
        fontSize: 20,
    },
    selectionContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 220,
    },
    newCaseButton: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelHeader: {
        fontSize: 48
    },
    input: {
        borderRadius: 10,
        width: '85%',
        height: 60,
        backgroundColor: '#4c96d7',
        fontSize: 24,
        paddingLeft: 20,
        marginTop: 40,
        color: '#f8f8ff',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2}
    }
})