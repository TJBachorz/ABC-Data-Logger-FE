import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { DropDownCases } from '../Components/DropDown';
import { BigButton } from '../Components/Button';
import { Styles } from '../Components/Styles';
import { baseURL, currentYear } from '../Components/DateFunctions';

export default function CaseSelection({ setCaseInfo, navigation }) {

    const cases = useSelector(state => state.cases)

    const dispatch = useDispatch()

    const setIsSignedIn = (value) => {
        dispatch({type: "CHANGE_SIGN_IN", payload: value})
    }

    const setCases = (value) => {
        dispatch({type: "CHANGE_CASES", payload: value})
    }

    const [selectedCase, setSelectedCase] = useState({})

    useEffect(() => fetchCases(), [isEmpty(cases), cases.length])

    const fetchCases = () => {
        AsyncStorage.getItem("token")
            .then(token => {
                return fetch(`${baseURL}/accounts/`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
            }).then(response => response.json())
            .then(userAccount => setCases(userAccount.cases))
    }

    const renderCases = () => {
        return cases.map(child => {
            return ({
                label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, 
                value: {id: child.id, name: child.name, dob: child.dob}
            })
        })
    }

    const makeCaseProfile = () => {
        if (selectedCase.hasOwnProperty("id")) {
            const { id, name, dob } = selectedCase
            setCaseInfo({id, name, dob})
            setSelectedCase({})
            setIsSignedIn(true) 
            navigation.navigate("Home");         
        }
    }

    return (
        <View style={Styles.pageContainer}>
            {!isEmpty(cases) ?
                <>
                    <Text style={Styles.promptText}>Please Select a Case:</Text>
                    <DropDownCases
                        placeholder="Select a Case"
                        items={renderCases()}
                        onChangeItem={(item) => setSelectedCase({
                            id: item.value.id, 
                            name: item.value.name,
                            dob: item.value.dob
                        })}
                    />
                    <BigButton
                        buttonText={"Select Case"}
                        handlePress={makeCaseProfile}
                    /> 
                </> 
                : <Text style={Styles.noCases}>No cases Associated with this account</Text>
            }
            <BigButton
                buttonText={"Create New Case"}
                handlePress={() => navigation.navigate('Create New Case')}
            /> 
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    currentCase: {
        fontSize: 12,
    },
    caseDisplay: {
        color: '#1761a0',
        fontSize: 14,
        fontWeight: '600'
    }
})
