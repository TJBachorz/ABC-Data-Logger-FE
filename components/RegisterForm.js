import React from 'react';
import { TextInput, View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default function LoginForm({navigation, setIsSignedIn}) {

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
                }} 
                onPress={() => {
                        setIsSignedIn(true)
                        navigation.navigate('Home')
                }}
            />
            <View noBorder style={styles.details}>
                <Text style={styles.detailText}>Already have an account?</Text>
                <Text style={styles.detailText} onPress={() => navigation.navigate("Login")}>Log In</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    detailText: {
        color: '#f8f8ff',
        margin: 7
    },
    details: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
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
        color: '#f8f8ff'
    },
});