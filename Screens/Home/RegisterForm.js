import React from 'react';
import { View, Text, Image } from 'react-native';
import { Formik } from 'formik';

import { BigButton } from '../Components/Button';
import TextInputField from '../Components/TextInputField';
import { baseURL, authorizeUser } from '../Components/DateFunctions';
import { Styles } from '../Components/Styles';

export default function RegisterForm({ navigation }) {

    const signupUser = (values) => {
        return fetch(`${baseURL}/signup/`, {
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
        .catch(error => {
            console.error(error)
            alert(error.message)
            throw error.message
        })
    }
    
    const loginUser = (data, values) => {
        if (data.user.id) {
            fetch(`${baseURL}/login`, {
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
            .then(userData => authorizeUser(userData, navigation))
            .catch(error => {
                console.error(error)
                alert(error.message)
                throw error.message
            })
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

    return (
        <View style={Styles.formContainer}>
            <Image 
                style={Styles.image} 
                source={require('../../assets/abc_logo_white.png')}
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
                        <TextInputField
                            placeholder="Username"
                            autoCapitalize="none"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                        />
                        <TextInputField
                            placeholder="Email"
                            autoCapitalize="none"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInputField
                            secure={true}
                            placeholder="Password"
                            autoCapitalize="none"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <TextInputField
                            secure={true}
                            placeholder="Re-type Password"
                            autoCapitalize="none"
                            onChangeText={handleChange('password2')}
                            onBlur={handleBlur('password2')}
                            value={values.passworŹ}
                        />
                        <BigButton
                            invert={true}
                            buttonText={"CREATE ACCOUNT"}
                            handlePress={handleSubmit}
                        />
                    </>
                )}
            </Formik>
            <View noBorder style={Styles.details}>
                <Text style={Styles.detailText}>Already have an account?</Text>
                <Text style={Styles.detailText} onPress={() => navigation.navigate("Login")}>Log In</Text>
            </View>
        </View>
    )
}