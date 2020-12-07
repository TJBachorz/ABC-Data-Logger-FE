import React from 'react';
import { TextInput, View, StyleSheet, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterForm({ navigation }) {

    const signupUser = (values) => {
        return fetch('http://localhost:8000/signup/', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: values.username,
                email: values.email,
                password: values.password,
                password2: values.password2
            })
        }).then(response => response.json())
        .then(data => loginUser(data, values))
    }
    
    const loginUser = (data, values) => {
        if (data.user.id) {
            fetch('http://localhost:8000/login', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            }).then(response => response.json())
            .then(authorizeUser)
        } else {
            createRegisterFailureAlert(data.user)
        }
    }

    const createRegisterFailureAlert = (data) => {
        if (data.username) {
            alert(data.username[0])
        } else if (data.email) {
            alert(data.email[0])
        } else if (data.password) {
            alert(data.password[0])
        } else {
            alert("Invalid Credentials!")
        }
    }

    const authorizeUser = (data) => {
        if (data.token) {
            AsyncStorage.setItem("token", data.token)
            navigation.navigate("Case Selection Main")
        } else {
            return (
                alert("Invalid Login!")
            )
        }
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image} 
                source={require('../assets/abc_logo_white.png')}
            />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => { 
                    if (values.password === values.password2) {
                        signupUser(values).then(user => {
                            if (user.id) {
                                loginUser(values)
                            } else {
                                alert("Invalid credentials")
                            }
                        })
                    } else {
                        alert("Password Do Not Match!")
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            placeholder="Username"
                            placeholderTextColor="#f8f8ff"
                        />
                        <TextInput 
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Email"
                            placeholderTextColor="#f8f8ff"
                        />
                        <TextInput 
                            secureTextEntry={true} 
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            placeholder="Password"
                            placeholderTextColor="#f8f8ff"
                        />
                        <TextInput 
                            secureTextEntry={true} 
                            style={styles.input}
                            onChangeText={handleChange('password2')}
                            onBlur={handleBlur('password2')}
                            value={values.password2}
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
                                marginTop: 25,
                                height: 50,
                                width: 360,
                                shadowColor: 'black',
                                shadowOpacity: 0.4,
                                shadowOffset: {width: 2, height: 2}
                            }} 
                            onPress={handleSubmit}
                        />
                    </>
                )}
            </Formik>
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
        marginTop: 35,
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
        height: 60,
        backgroundColor: '#4c96d7',
        fontSize: 24,
        paddingLeft: 20,
        marginBottom: 20,
        color: '#f8f8ff',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {width: 2, height: 2}
    },
});