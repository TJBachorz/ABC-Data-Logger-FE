import React from 'react';
import { TextInput, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default function LoginForm({navigation}) {

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image} 
                source={require('../assets/abc_logo_white.png')}
            />
            <TextInput 
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#f8f8ff"
            />
            <TextInput 
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#f8f8ff"
            />
            <TextInput 
                secureTextEntry={true} 
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#f8f8ff"
            />
            <TextInput 
                secureTextEntry={true} 
                style={styles.input}
                placeholder="Re-type Password"
                placeholderTextColor="#f8f8ff"
            />
            <Button 
                type="solid" 
                title={"CREATE ACCOUNT"} 
                titleStyle={{color: "#1761a0"}}
                buttonStyle={{
                    backgroundColor: '#f8f8ff',
                    borderRadius: 16,
                    margin: 1,
                    height: 50,
                    width: 360,
                    boxShadow: '2px 2px black'
                }} 
                onPress={() => navigation.navigate('User-Home-Page')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 250,
        width: 250,
    },
    container: {
        flex: 1,
        backgroundColor: '#1761a0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderRadius: 10,
        width: '85%',
        height: '7.5%',
        backgroundColor: '#4c96d7',
        fontSize: 24,
        paddingLeft: 20,
        marginBottom: 20,
        boxShadow: '2px 2px black',
        color: '#f8f8ff'
    },
});