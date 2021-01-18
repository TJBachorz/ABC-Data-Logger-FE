import React from 'react';
import { View, Text, Image } from 'react-native';
import { Formik } from 'formik';

import { BigButton } from '../Components/Button';
import TextInputField from '../Components/TextInputField';
import { baseURL, authorizeUser } from '../Components/DateFunctions';
import { Styles } from '../Components/Styles';
import { noAuthFetch } from '../Components/FetchList';

export default function RegisterForm({ navigation }) {

    const signupUser = ({ username, email, password, password2 }) => {
        const user = { username, email, password, password2 }
        return noAuthFetch("signup/", "POST", user)
            .catch(error => {
                console.error(error)
                alert(error.message)
                throw error.message
            })
    }
    
    const loginUser = ({ email, password }) => {
        const user = { email, password }
        noAuthFetch("login", "POST", user)
            .then(data => authorizeUser(data, navigation))
            .catch(error => {
                console.error(error)
                alert(error.message)
                throw error.message
            })
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
                        signupUser(values).then(data => {
                            if ("user" in data) {
                                loginUser(values)
                            } else {
                                createRegisterFailureAlert(data)
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
                            value={values.password2}
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