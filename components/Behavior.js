import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import BigButton from './Components/BigButton';
import DropDownPicker from 'react-native-dropdown-picker';

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
                <DropDownPicker
                    placeholder="Select a Behavior"
                    labelStyle={{fontSize: 24, color: 'black', padding: 10}}
                    items={[
                        {label: 'Refusal to follow directions', value: 'Refusal to follow directions'},
                        {label: 'Verbal refusal', value: 'Verbal refusal'},
                        {label: 'Making verbal threats', value: 'Making verbal threats'},
                        {label: 'Crying/whining', value: 'Crying/whining'},
                        {label: 'Screaming/yelling', value: 'Screaming/yelling'},
                        {label: 'Scratching', value: 'Scratching'},
                        {label: 'Biting', value: 'Biting'},
                        {label: 'Kicking', value: 'Kicking'},
                        {label: 'Spitting', value: 'Spitting'},
                        {label: 'Flopping', value: 'Flopping'},
                        {label: 'Running away', value: 'Running away'},
                        {label: 'Destroying property', value: 'Destroying property'},
                        {label: 'Flipping furniture', value: 'Flipping furniture'},
                        {label: 'Hitting self', value: 'Hitting self'},
                        {label: 'Hitting others (students)', value: 'Hitting others (students)'},
                        {label: 'Hitting others (adults)', value: 'Hitting others (adults)'},
                    ]}
                    itemStyle={{justifyContent: 'flex-start'}}
                    defaultIndex={0}
                    dropDownMaxHeight={375}
                    dropDownStyle={{backgroundColor: '#f8f8ff'}}
                    containerStyle={{
                        height: 100, 
                        width: 360, 
                        shadowColor: 'black',
                        shadowOpacity: 0.4,
                        shadowOffset: {width: 1, height: 1}
                    }}
                    onChangeItem={(item) => setIncident({...incident, "behavior": item.value})}
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