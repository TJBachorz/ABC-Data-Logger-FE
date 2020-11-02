import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


export default function IncidentDateTime({navigation, incident, setIncident, caseInfo}) {

    return (
        <>
            <View style={styles.selectionContainer}>
                <Text>Incident Date Time</Text>
            </View>
            <View style={styles.incidentButton}>
                <Button
                    title={"Submit Incident"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={ () => navigation.navigate('Home')} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    selectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})