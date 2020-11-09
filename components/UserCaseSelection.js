import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

export default function UserCaseSelection({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
    navigation 
}) {

    useEffect(() => fetchCases(), [])

    const fetchCases = () => {
        AsyncStorage.getItem("token")
            .then(token => {
                return fetch("http://localhost:8000/accounts/", {
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
    
    const renderCases = (account) => {
        return account.cases.map(child => {
            return ({
                label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, 
                value: {"id": `${child.id}`, "name": `${child.name}`}
            })
        })
    }

    const selectNewCase = () => {
        if (caseInfo.id) {
            navigation.navigate('Home')
        }
    }

    const currentYear = new Date().getFullYear()

    return (
        <View style={styles.centeredView}>
            {account.cases ?
                <>
                    <Text style={styles.selectionText}>Please Select a Case:</Text>
                    <DropDownPicker
                        placeholder="Select a Case"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={renderCases(account)}
                        itemStyle={{justifyContent: 'flex-start'}}
                        defaultIndex={0}
                        containerStyle={{marginBottom: 100, marginTop: 40,height: 60, width: 200}}
                        onChangeItem={(item) => setCaseInfo({
                            'id': item.value.id, 
                            "name": item.value.name
                        })}
                    />
                    <Button 
                        title={"Select Case"}
                        type="solid" 
                        buttonStyle={{
                            background: '#1761a0',
                            borderRadius: 16,
                            margin: 1,
                            height: 50,
                            width: 360,
                            marginBottom: 30,
                        }}
                        onPress={selectNewCase}
                    /> 
                </> : <Text>No cases Associated with this account</Text>
            }
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
    }
})