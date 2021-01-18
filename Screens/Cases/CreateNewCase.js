import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';



import { DropDownMedium } from '../Components/DropDown';
import { 
    baseURL,
    currentYear, 
    startingYear,
    createDayOptions,
    createMonthOptions,
    createNumberList
} from '../Components/DateFunctions';
import { BigButton } from '../Components/Button';
import { Styles } from '../Components/Styles';
import TextInputField from '../Components/TextInputField';

export default function NewCase({ navigation }) {

    const [newCase, setNewCase] = useState({})

    const dispatch = useDispatch()

    const setCases = (value) => {
        dispatch({type: "CHANGE_CASES", payload: value})
    }

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
        navigation.navigate("Case Selection Main")
    }

    const linkCaseToAccount = (createdCase, token) => {
        setCases(cases => [...cases, createdCase])
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

    const generateDays = () => {
        return (newCase["year"] && newCase ["month"]) ?
            createDayOptions(newCase)
            : []
    }

    return (
        <View style={Styles.pageContainer}>
            <Text style={Styles.promptText}>
                Enter a Name:
            </Text>
            <TextInputField
                autoCapitalize="words"
                placeholder="Case Name"
                onChangeText={text => setNewCase({...newCase, "name": text})}
            />
            <View style={styles.selectionContainer}>
                <Text style={Styles.promptText}>
                    Enter a Date of Birth:
                </Text>
                <View style={styles.datePickers}>
                    <DropDownMedium
                        placeholder="Year"
                        items={createNumberList(startingYear, currentYear).reverse()}
                        onChangeItem={item => setNewCase({...newCase, "year": item.value})}
                    />
                    <DropDownMedium
                        placeholder="Month"
                        items={createMonthOptions()}
                        onChangeItem={item => setNewCase({...newCase, "month": item.value})}
                    />
                    <DropDownMedium
                        placeholder="Day"
                        items={generateDays()}
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
    datePickers: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectionContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 220,
    }
})