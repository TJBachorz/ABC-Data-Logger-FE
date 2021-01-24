import React, { useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

import { authFetch } from '../../Components/FetchList';
import { BigButton } from '../../Components/Button';
import IncidentHeaders from './Components/NestedIncidentLog';
import { Styles } from '../../Components/Styles';


export default function incidentHistory({ 
    incidentHistory, 
    setIncidentHistory, 
    navigation, 
}) {

    const caseProfile = useSelector(state => state.caseProfile)

    useEffect(() => {
        if (caseProfile.id) {
            fetchIncidents()
        }
    }, [caseProfile.id])
    
    const fetchIncidents = () => {
        AsyncStorage.getItem("token")
            .then(token => authFetch(`cases/${caseProfile.id}/`, "GET", token))
            .then(child => setIncidentHistory(child.incidents))
    }
    
    const renderIncidents = () => {
        const byMostRecent = (a, b) => new Date(b["date"]) - new Date(a["date"])
        const history = incidentHistory.sort(byMostRecent)
        return <IncidentHeaders key={"history"} history={history}/>
    }

    return (
        <>  
            <View style={styles.incidentHistoryHeaderView}>
                <Text style={styles.incidentHeader}>Incident History:</Text>
                <Text style={styles.caseHeader}>{caseProfile.name} -- {caseProfile.dob}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.historyContainer}>
                {incidentHistory !== [] ? 
                    renderIncidents() 
                    : <Text style={styles.noIncidents}>No Incident History</Text>
                }
            </ScrollView>

            <View style={Styles.bottomButton}>
                <BigButton
                    buttonText={"Log New Incident"}
                    handlePress={() => navigation.navigate('Antecedent')}
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
    },
})