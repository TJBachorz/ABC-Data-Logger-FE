import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DropDownMedium } from '../Components/DropDown';
import { 
    baseURL, 
    monthsWithDays, 
    months, 
    currentDate, 
    startingYear 
} from '../Components/DateFunctions';
import BigButton from '../Components/BigButton';
import TextInputField from '../Components/TextInputField';

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
                Enter a Name:
            </Text>
            <TextInputField
                autoCapitalize="words"
                placeholder="Case Name"
                onChangeText={text => setNewCase({...newCase, "name": text})}
            />
            <View style={styles.selectionContainer}>
                <Text style={styles.selectionHeader}>
                    Enter a Date of Birth:
                </Text>
                <View style={styles.datePickers}>
                    <DropDownMedium
                        placeholder="Year"
                        items={createNumberList(startingYear, currentDate.getFullYear()).reverse()}
                        defaultValue={newCase["year"]}
                        onChangeItem={item => setNewCase({...newCase, "year": item.value})}
                    />
                    <DropDownMedium
                        placeholder="Month"
                        items={createMonthOptions()}
                        defaultValue={newCase["month"]}
                        onChangeItem={item => setNewCase({...newCase, "month": item.value})}
                    />
                    <DropDownMedium
                        placeholder="Day"
                        items={createDayOptions()}
                        defaultValue={newCase["day"]}
                        onChangeItem={item => setNewCase({...newCase, "day": item.value})}
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
    },
    selectionHeader: {
        fontSize: 20,
        marginBottom: 20,
    },
    selectionContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 220,
    },
    labelHeader: {
        fontSize: 48
    },
})