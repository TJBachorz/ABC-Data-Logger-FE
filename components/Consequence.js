import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import BigButton from './Components/BigButton';
import { DropDownBig } from './Components/DropDown';
import { consequences } from './Components/Options';

export default function Consequence({ navigation, incident, setIncident }) {

    const navigateToNextPage = () => {
        if (incident["consequence"]) {
            navigation.navigate('IncidentDateTime')        
        } else {
            alert ("Select a Consequence")
        }
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.labelHeader}>C: Consequence</Text>
            </View>
            <View style={styles.selectionContainer}>
                <DropDownBig
                    placeholder={"Select a Consequence"}
                    items={consequences}
                    onChangeItem={item => setIncident({...incident, "consequence": item.value})}
                />
            </View>
            <View style={styles.incidentButton}>
                <BigButton
                    buttonText={"Submit Consequence"}
                    handlePress={navigateToNextPage}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectionContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 80,
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    labelHeader: {
        fontSize: 48
    }
})