import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { DropDownCases } from '../Components/DropDown';
import { BigButton } from '../Components/Button';
import { Styles } from '../Components/Styles';
import { baseURL, currentYear } from '../Components/DateFunctions';

export default function CaseSelection({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
    isNewCase,
    navigation 
}) {

    const dispatch = useDispatch()

    const setIsSignedIn = (value) => {
        dispatch({type: "CHANGE_SIGN_IN", payload: value})
    }

    const [selectedCase, setSelectedCase] = useState({})
    const [isCaseSelected, setIsCaseSelected] = useState(false)

    useEffect(() => fetchCases(), [isNewCase])

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
            .then(userAccount => setAccount(userAccount))
    }
    
    const renderCases = () => {
        return account.cases.map(child => {
            return ({
                label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, 
                value: {id: child.id, name: child.name, dob: child.dob}
            })
        })
    }

    useEffect(() => makeSetCase(), [isCaseSelected])

    useEffect(() => signInUser(), [caseInfo])
    
    const makeSetCase = () => {
        if (selectedCase && isCaseSelected) {
            const { id, name, dob } = selectedCase
            setCaseInfo({id, name, dob})
            setSelectedCase({})
            setIsCaseSelected(false)
        }
    }

    const signInUser = () => {
        if (caseInfo.id) {
            setIsSignedIn(true) 
            navigation.navigate("Home");            
        }
    }

    return (
        <View style={Styles.pageContainer}>
            {account.cases !== undefined ?
                <>
                    <Text style={Styles.promptText}>Please Select a Case:</Text>
                    <Text style={styles.currentCase}>Current Case: <Text style={styles.caseDisplay}>{caseInfo.name ? `${caseInfo.name}, ${caseInfo.dob}` : "None" }</Text></Text>
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
                        handlePress={() => setIsCaseSelected(true)}
                    /> 
                </> 
                : <Text>No cases Associated with this account</Text>
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
