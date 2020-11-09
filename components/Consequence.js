import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

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
                <DropDownPicker
                    placeholder="Select a Consequence"
                    labelStyle={{fontSize: 24, color: 'black', padding: 10}}
                    items={[
                        {label: 'Verbal redirection', value: 'Verbal redirection'},
                        {label: 'Physical prompt', value: 'Physical prompt'},
                        {label: 'Ignored problem behavior', value: 'Ignored problem behavior'},
                        {label: 'Kept demand on', value: 'Kept demand on'},
                        {label: 'Used proximity control', value: 'Used proximity control'},
                        {label: 'Verbal reprimand', value: 'Verbal reprimand'},
                        {label: 'Removed from activity/location', value: 'Removed from activity/location'},
                        {label: 'Given another task/activity', value: 'Given another task/activity'},
                        {label: 'Response block', value: 'Response block'},
                        {label: 'Left alone', value: 'Left alone'},
                        {label: 'Loss of privilege', value: 'Loss of privilege'},
                        {label: 'Calming spot', value: 'Calming spot'},
                        {label: 'Peer attention', value: 'Peer attention'},
                        {label: 'Timeout', value: 'Timeout'},
                        {label: 'Asked to leave the room', value: 'Asked to leave the room'},
                    ]}
                    itemStyle={{justifyContent: 'flex-start'}}
                    defaultIndex={0}
                    dropDownMaxHeight={375}
                    containerStyle={{height: 100, width: 360}}
                    onChangeItem={(item) => setIncident({...incident, "consequence": item.value})}
                />
            </View>
            <View style={styles.incidentButton}>
                <Button
                    title={"Submit Consequence"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={navigateToNextPage} 
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
        alignItems: 'center'
    },
    labelHeader: {
        fontSize: 48
    }
})