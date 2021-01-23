import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { NavIcon } from './Icon';
import { Styles } from './Styles';

export const BigButton = ({ buttonText, handlePress, invert=false }) => { 

    const checkInvertButton = () => {
        return !invert ? 
            styles.button 
            : {...styles.button, backgroundColor: '#f8f8ff'}
    }

    const checkInvertText = () => {
        return !invert ? styles.text : {...styles.text, color: '#4c96d7'}
    }

    return (
        <TouchableOpacity 
            invert
            style={checkInvertButton()}
            onPress={handlePress}
        >
            <Text style={checkInvertText()}>
                {buttonText}
            </Text>
        </TouchableOpacity>
    )
}

export const NavButton = ({ onPress }) => {
    return (
        <Button
            type="clear"
            icon={ <NavIcon/> }
            onPress={onPress}
            buttonStyle={Styles.navButtonStyle}
        />
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