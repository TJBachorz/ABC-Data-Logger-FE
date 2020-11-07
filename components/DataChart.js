import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function DataChart() {
    return (
        <View style={styles.historyContainer}>
            <Text>Data Charts</Text>
        </View>
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