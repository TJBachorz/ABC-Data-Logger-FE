import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function TextInputField({ 
    secure=false, 
    placeholder,
    onChangeText,
    onBlur,
    value,
    autoCapitalize="none"
}) {

    return (
        <TextInput 
            secureTextEntry={secure} 
            style={styles.input}
            placeholder={placeholder}
            onChangeText={onChangeText}
            onBlur={onBlur}
            value={value}
            placeholderTextColor="#f8f8ff"
            autoCapitalize={autoCapitalize}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        width: '85%',
        height: 60,
        backgroundColor: '#4c96d7',
        fontSize: 24,
        paddingLeft: 20,
        marginBottom: 20,
        color: '#f8f8ff',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2}
    }
})