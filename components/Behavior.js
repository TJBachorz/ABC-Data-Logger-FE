import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import BigButton from './Components/BigButton';
import { DropDownBig } from './Components/DropDown';
import { behaviors } from './Components/Options';

export default function Behavior({ navigation, incident, setIncident }) {

    const navigateToNextPage = () => {
        if (incident["behavior"]) {
            navigation.navigate("Consequence")
        } else {
            alert ("Select a Behavior")
        }
    }

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.labelHeader}>B: Behavior</Text>
            </View>
            <View style={styles.selectionContainer}>
                <DropDownBig
                    placeholder={"Select a Behavior"}
                    items={behaviors}
                    onChangeItem={item => setIncident({...incident, "behavior": item.value})}
                />
            </View>
            <View style={styles.incidentButton}>
                <BigButton
                    buttonText={"Submit Behavior"}
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
        marginBottom: 40
    },
    labelHeader: {
        fontSize: 48
    }
})