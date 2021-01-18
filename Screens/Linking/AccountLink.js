import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { currentYear, baseURL } from '../Components/DateFunctions';
import { BigButton } from '../Components/Button';
import { DropDownCases } from '../Components/DropDown';
import TextInputField from '../Components/TextInputField';

export default function AccountLink() {

    const [linkInfo, setLinkInfo] = useState({})
    
    const cases = useSelector(state => state.cases)

    const renderCases = () => {
        return cases.map(child => {
            return ({
                label: `${child.name}, age: ${currentYear - +(child.dob.split("-")[0])}`, 
                value: {id: child.id}
            })
        })
    }

    const renderAlert = (result) => {
        if (result.status >= 200 && result.status < 300) {
            alert ("Account successfully linked!")
        } else {
            alert ("An error occurred. Please try again.")
        }
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
                    .then(renderAlert)
                })
        } else {
            alert ("Please Enter a Valid Email and Select a Case to Link!")
        }
    }

    return (
        <>
            <View style={styles.centeredView}>
                {!isEmpty(cases) ?
                    <>
                        <Text style={styles.selectionText}>
                            Select the case you would like to link:
                        </Text>
                        <DropDownCases
                            placeholder="Select a Case"
                            items={renderCases()}
                            onChangeItem={item => setLinkInfo({
                                ...linkInfo, case_id: item.value.id,
                            })}
                        />
                        
                    </> 
                    : <Text>
                        Add a case to your account in order to link it to others
                    </Text>  
                }
                <Text style={styles.selectionText}>
                    Enter the email of the account you would like to link:
                </Text>
                <TextInputField
                    placeholder="Email"
                    onChangeText={text => setLinkInfo({
                        ...linkInfo, email: text,
                    })}
                />
            </View>
            <View style={styles.submitButtonView}>
                <BigButton
                    buttonText={"Create New Case"}
                    handlePress={linkAccounts}
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
        submitButtonView: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 30
        }
    })
    