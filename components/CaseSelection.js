import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import BigButton from './Components/BigButton';

import { baseURL, currentYear } from './Components/DateFunctions';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CaseSelection({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
    isSignedIn,
    setIsSignedIn,
    isNewCase,
    navigation 
}) {

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
            if (!isSignedIn) {
                setIsSignedIn(!isSignedIn)
                return;
            }
            navigation.navigate('Home')
        }
    }

    return (
        <View style={styles.centeredView}>
            {account.cases !== undefined ?
                <>
                    <Text style={styles.selectionText}>Please Select a Case:</Text>
                    <Text style={styles.currentCase}>Current Case: <Text style={styles.caseDisplay}>{caseInfo.name ? `${caseInfo.name}, ${caseInfo.dob}` : "None" }</Text></Text>
                    <DropDownPicker
                        placeholder="Select a Case"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={renderCases()}
                        defaultIndex={0}
                        itemStyle={{justifyContent: 'flex-start'}}
                        dropDownStyle={{backgroundColor: '#f8f8ff'}}
                        containerStyle={{
                            height: 60, 
                            width: 200, 
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            marginBottom: 100, 
                            marginTop: 40,
                            shadowOffset: {width: 1, height: 1}
                        }}
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
    selectionText: {
        fontSize: 24,
        marginBottom: 20
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
