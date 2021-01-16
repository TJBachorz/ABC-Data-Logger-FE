import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Formik } from 'formik';

import BigButton from '../Components/BigButton';
import TextInputField from '../Components/TextInputField';
import { baseURL, authorizeUser } from '../Components/DateFunctions';

export default function LoginForm({ navigation }) {

    const loginUser = (values) => {
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
            .then(data => authorizeUser(data, navigation))
        }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image} 
                source={require('../../assets/abc_logo_white.png')}
            />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => loginUser(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
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
                        <BigButton
                            invert={true}
                            buttonText={"LOG IN"}
                            handlePress={handleSubmit}
                        />
                    </>
                )}
            </Formik>
            <View noBorder style={styles.details}>
                <Text style={styles.detailText}>Forgot Password?</Text>
                <Text style={styles.detailText}>|</Text>
                <Text style={styles.detailText}
                    onPress={() => navigation.navigate('Register')}
                >Create Account</Text>
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
});