import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


export default function UserHomePage({navigation, setCaseInfo, caseInfo}) {

    const getToken = async () => {
        const token = await AsyncStorage.getItem('@storage_Key')
        return token
    }

    const renderIncidents = () => {
        fetch(`${url}/cases/${caseInfo.id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        })
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.historyContainer}
            >
                <Text>History here</Text>
                {/* <Text>{renderIncidents()}</Text> */}
            </ScrollView>
            <View style={styles.incidentButton}>
                <Button
                    title={"Log New Incident"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={ () => navigation.navigate('Antecedent')} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    historyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})