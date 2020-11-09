import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import UserCaseSelection from './UserCaseSelection';
import CreateNewCase from './CreateNewCase';

import AsyncStorage from '@react-native-async-storage/async-storage';

const currentYear = new Date().getFullYear()

export default function CaseSelectionMainPage({ account, setAccount, caseInfo, setCaseInfo, navigation }) {


    // useEffect(() => fetchCases(), [])

    // const fetchCases = () => {
    //     AsyncStorage.getItem("token")
    //         .then(token => {
    //             return fetch("http://localhost:8000/accounts/", {
    //                 method: "GET",
    //                 headers: {
    //                     "Accept": "application/json",
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`
    //                 }
    //             })
    //         }).then(response => response.json())
    //         .then(userAccount => setAccount(userAccount))
    // }
    
    // const renderCases = (account) => {
    //     return account.cases.map(child => {
    //         return ({
    //             label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, 
    //             value: {"id": `${child.id}`, "name": `${child.name}`}
    //         })
    //     })
    // }

    // const signInUser = () => {
    //     if (caseInfo.id) {
    //         setIsSignedIn(!isSignedIn)
    //         navigation.navigate('Home')
    //     }
    // }

    return (
        <>
            <View style={styles.selectCase}>
                <UserCaseSelection
                    account={account}
                    setAccount={setAccount}
                    caseInfo={caseInfo}
                    setCaseInfo={setCaseInfo}
                    navigation={navigation} 
                />
            </View>
            <View style={styles.newCase}>
                <Text style={styles.selectionText}>Or:</Text>
                <Button
                    title={"Create New Case"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={() => navigation.navigate("New Case Page")}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    selectCase: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    newCase: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    selectionText: {
        fontSize: 24,
        marginBottom: 20
    }
})

