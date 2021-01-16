import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';

import { currentYear, baseURL } from './Utilities';

import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AccountLink({ account }) {

    const [linkInfo, setLinkInfo] = useState({})

    const renderCases = () => {
        return account.cases.map(child => {
            return ({
                label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, 
                value: {id: child.id}
            })
        })
    }

    const linkAccounts = () => {
        if (linkInfo.case_id && linkInfo.email) {
            AsyncStorage.getItem("token")
                .then(token => {
                    fetch(`${baseURL}/caselinks`, {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            case: linkInfo.case_id,
                            email: linkInfo.email
                        })
                    }).then(response => response.json())
                })
        } else {
            console.log("failure")
        }
    }

    return (
        <>
            <View style={styles.centeredView}>
                {account.cases !== undefined ?
                    <>
                        <Text style={styles.selectionText}>
                            Select the case you would like to link:
                        </Text>
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
                            onChangeItem={item => setLinkInfo({
                                ...linkInfo, case_id: item.value.id,
                            })}
                        />
                    </> : <Text>Add a case to your account in order to link it to others</Text>  
                }
                <Text style={styles.selectionText}>Enter the email of the account you would like to link:</Text>
                <TextInput 
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Email"
                    placeholderTextColor="#f8f8ff"
                    onChangeText={text => setLinkInfo({
                        ...linkInfo, email: text,
                    })}
                /> 
            </View>
            <View style={styles.submitButton}>
                <Button
                    title={"Link Accounts"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                        shadowColor: 'black',
                        shadowOpacity: 0.4,
                        shadowOffset: {width: 2, height: 2}
                    }}
                    onPress={linkAccounts}
                />
            </View>
        </>
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
        },
        submitButton: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 30
        }
    })
    