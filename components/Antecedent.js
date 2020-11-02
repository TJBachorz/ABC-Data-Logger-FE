import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


export default function Antecedent({navigation, incident, setIncident, caseInfo}) {

    return (
        <>
            <View style={styles.selectionContainer}>
                <Text style={styles.labelHeader}>A: Antecedent</Text>
            </View>
            <View style={styles.incidentButton}>
                <Button
                    title={"Submit Antecedent"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={ () => navigation.navigate('Behavior')} 
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
    },
    labelHeader: {
        fontSize: 24
    }

})
 