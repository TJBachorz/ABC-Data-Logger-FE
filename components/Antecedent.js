import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Antecedent({navigation, incident, setIncident, caseInfo}) {

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.labelHeader}>A: Antecedent</Text>
            </View>
            <View style={styles.selectionContainer}>
                <DropDownPicker
                    labelStyle={{fontSize: 24, color: 'black', padding: 10}}
                    items={[
                        {label: 'Given direction/task/activity', value: 'Given direction/task/activity'},
                        {label: 'New task or activity', value: 'New task or activity'},
                        {label: 'Difficult task or activity', value: 'Difficult task or activity'},
                        {label: 'Waiting', value: 'Waiting'},
                        {label: 'Preferred activity interrupted', value: 'Preferred activity interrupted'},
                        {label: 'Activity/item denied (told no)', value: 'Activity/item denied (told no)'},
                        {label: 'Loud and noisy environment', value: 'Loud and noisy environment'},
                        {label: 'Given a correction', value: 'Given a correction'},
                        {label: 'Transition', value: 'Transition'},
                        {label: 'Attention given to others', value: 'Attention given to others'},
                        {label: 'Presence of specific person', value: 'Presence of specific person'},
                        {label: 'Attention not given when wanted', value: 'Attention not given when wanted'},
                        {label: 'Alone (no activity)', value: 'Alone (no activity)'},
                        {label: 'Alone (no attention)', value: 'Alone (no attention)'}
                    ]}
                    defaultIndex={0}
                    dropDownMaxHeight={225}
                    containerStyle={{height: 100, width: 360}}
                    onChangeItem={(item) => setIncident({"antecedent": item.value})}
                />
                <Text>{incident["antecedent"]}</Text>
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