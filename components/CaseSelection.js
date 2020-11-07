import React, { useEffect } from 'react';
import { View, Text, StyleSheet, DevSettings} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const currentYear = new Date().getFullYear()

export default function CaseSelection({
    account, 
    setAccount, 
    caseInfo, 
    setCaseInfo, 
    isSignedIn, 
    setIsSignedIn, 
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
            return {label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, value: `${child.id}`}
        })
    }

    const signInUser = () => {
        if (caseInfo.id) {
            setIsSignedIn(!isSignedIn)
            navigation.navigate('Home')
        }
    }

    return (
        <View style={styles.centeredView}>
            {account.cases ?
                <>
                    <Text style={styles.selectionText}>Please Select a Case:</Text>
                    <DropDownPicker
                        placeholder="Case"
                        labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                        items={renderCases(account)}
                        defaultIndex={0}
                        containerStyle={{marginBottom: 100, marginTop: 40,height: 60, width: 200}}
                        onChangeItem={(item) => setCaseInfo({'id': item.value})}
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
                        onPress={signInUser}
                    /> 
                </> : <Text>No cases Associated with this account</Text>
            }
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
                onPress={ () => {
                    DevSettings.reload()                
                }}
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
    }
})

