import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function BigButton({ buttonText, handlePress, invert=false }) {

    const renderButton = () => {
        return (
            <TouchableOpacity 
                invert
                style={!invert ? styles.button : {...styles.button, backgroundColor: '#f8f8ff'}}
                onPress={handlePress}
            >
                <Text style={!invert ? styles.text : {...styles.text, color: '#4c96d7'}}>
                    {buttonText}
                </Text>
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
        height: 55,
        width: 360, 
        marginBottom: 22,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: {width: 2, height: 2},
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#f8f8ff',
        fontSize: 18,
        fontWeight: '500'
    }
})