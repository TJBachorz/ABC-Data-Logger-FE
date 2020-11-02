import React from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
// import PickerCascader from 'react-native-picker-cascader';


export default function Antecedent({navigation, incident, setIncident, caseInfo}) {

    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.labelHeader}>A: Antecedent</Text>
            </View>
            <View style={styles.selectionContainer}>
            {/* <PickerCascader style={{ padding: 10 }} data={[
                {        
                    key: '1', text: 'Given direction/tast/activity',
                    key: '2', text: 'New South Wales',
                    key: '3', text: 'Sydney', 
                    key: '4', text: 'Wollongong',
                    key: '4', text: 'Wollongong',
                    key: '4', text: 'Wollongong',
                    key: '4', text: 'Wollongong',
                    key: '4', text: 'Wollongong',
                    key: '4', text: 'Wollongong',
                    key: '4', text: 'Wollongong',
                }
            ]}
            onValueChange={(item) => this.valueChanged(item)}
            >
        </PickerCascader> */}
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
        justifyContent: 'center',
        alignItems: 'center'
    },
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