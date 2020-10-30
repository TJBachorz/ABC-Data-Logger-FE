import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';


export default function Header() {
    return (
        <View
            style={styles.header}
        >
            <Text> Test! </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: '10%',
        width: '100%',
        backgroundColor: '#1761a0',
        borderBottomColor: '#1761a0'
    }
});
