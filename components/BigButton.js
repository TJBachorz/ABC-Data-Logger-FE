import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements';

export default function BigButton({ buttonText, handlePress }) {

    const renderButton = () => {
        return (
            <TouchableOpacity 
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.text}>{buttonText}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {renderButton()}
        </>
    )
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4c96d7',
        borderRadius: 16,
        margin: 1,
        height: 50,
        width: 360, 
        marginBottom: 15,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: {width: 2, height: 2},
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#f8f8ff',
        fontSize: 18,
        fontWeight: '500'
    }
})