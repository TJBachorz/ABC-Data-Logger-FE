import React, {useState} from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';


export default function UserHomePage({navigation, setCaseInfo, caseInfo}) {
    return (
        <>
            <ScrollView
                contentContainerStyle={styles.historyContainer}
            >
                <Text>History here</Text>
            </ScrollView>
            <View style={styles.incidentButton}>
                <Button
                    title={"Log New Incident"}
                    type="solid" 
                    buttonStyle={{
                        background: '#1761a0',
                        borderRadius: 16,
                        margin: 1,
                        height: 50,
                        width: 360,
                        marginBottom: 30,
                    }}
                    onPress={ () => navigation.navigate('Antecedent')} 
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    historyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    incidentButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})