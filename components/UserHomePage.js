import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


export default function UserHomePage({navigation, setCaseInfo, caseInfo}) {

    const fetchIncidents = () => {
        AsyncStorage.getItem("token").then(token => {
            fetch(`http://localhost:8000/cases/${caseInfo.id}/`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => response.json())
            .then(renderIncidents)
        })
    }

    const renderIncidents = ({incidents}) => {
        return incidents.map(incident => {
            return (
                <>
                    <Text>A: {incident["antecedent"]}</Text>
                    <Text>B: {incident["behavior"]}</Text>
                    <Text>C: {incident["consequence"]}</Text>
                    <Text>Date & Time: {incident["antecedent"]}</Text>
                </>
            )
        })
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={styles.historyContainer}
            >
                <Text>History here</Text>
                {fetchIncidents()}
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