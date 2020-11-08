import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import UserCaseSelection from './UserCaseSelection';

import AsyncStorage from '@react-native-async-storage/async-storage';

const currentYear = new Date().getFullYear()

export default function CaseSelectionMainPage({ account, setAccount, caseInfo, setCaseInfo, isSignedIn, setIsSignedIn, navigation }) {

    const [isNewCase, setIsNewCase] = useState(false)

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

    const signInUser = () => {
        if (caseInfo.id) {
            setIsSignedIn(!isSignedIn)
            navigation.navigate('Home')
        }
    }

    return (
        <>
            {isNewCase ? 
                <UserCaseSelection
                    account={account}
                    setAccount={setAccount}
                    caseInfo={caseInfo}
                    setCaseInfo={setCaseInfo}
                    isSignedIn={isSignedIn} 
                    setIsSignedIn={setIsSignedIn} 
                    navigation={navigation} 
                />
                : <NewCase
                    account={account} 
                    setAccount={setAccount} 
                    caseInfo={caseInfo}
                    setCaseInfo={setCaseInfo}
                    isSignedIn={isSignedIn} 
                    setIsSignedIn={setIsSignedIn} 
                    navigation={navigation}
                />
            } 
        </>
    )
}

