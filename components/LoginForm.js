import React from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

export default function LoginForm() {

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Username:</Text>
            <TextInput 
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput 
                secureTextEntry={true} 
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cyan',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        width: '80%',
        height: '15%',
        backgroundColor: 'lightblue',
    },
    label: {
        fontSize: 24,
    }
})