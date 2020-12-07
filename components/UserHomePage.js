import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';

import IncidentHeaders from './IncidentHeaders';

export default function UserHomePage({ incidentHistory, setIncidentHistory, navigation, caseInfo }) {

    useEffect(() => {
        if (caseInfo.id) {
            fetchIncidents()
        }
    }, [caseInfo.id])
    
    const fetchIncidents = () => {
        AsyncStorage.getItem("token")
        .then(token => {
                fetch(`http://localhost:8000/cases/${caseInfo.id}/`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }).then(response => response.json())
                .then(child => setIncidentHistory(child.incidents))
            })
    }
    
    const renderIncidents = () => {
        let history = incidentHistory.sort((a,b) => new Date(b["date"]) - new Date(a["date"]))
        return <IncidentHeaders key={"history"} history={history}/>
    }

    return (
        <>  
            <View style={styles.incidentHistoryHeaderView}>
                <Text style={styles.incidentHeader}>Incident History:</Text>
    <Text style={styles.caseHeader}>{caseInfo.name} -- {caseInfo.dob}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.historyContainer}>
                {incidentHistory.length > 0 ? renderIncidents() : <Text style={styles.noIncidents}>No Incident History</Text>}
            </ScrollView>
            <View style={styles.incidentButton}>
                <Button
                    title={"Log New Incident"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        marginBottom: 35,
                        height: 50,
                        width: 360,
                        shadowColor: 'black',
                        shadowOpacity: 0.4,
                        shadowOffset: {width: 2, height: 2},
                    }}
                    onPress={ () => navigation.navigate('Antecedent')} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    historyContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    caseHeader: {
        fontSize: 20,
        fontWeight: '500',

        color: '#1761a0',
    },
    incidentHistoryHeaderView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3
    },
    noIncidents: {
        fontSize: 18,
        marginTop: 50
    },
    incidentHeader: {
        fontSize: 32,
        fontWeight: '500',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20
    }
})