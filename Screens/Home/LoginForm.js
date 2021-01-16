import React from 'react';
import { View, Image, Text } from 'react-native';
import { Formik } from 'formik';

import BigButton from '../Components/BigButton';
import TextInputField from '../Components/TextInputField';
import { baseURL, authorizeUser } from '../Components/DateFunctions';
import { Styles } from '../Components/Styles';

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
        <View style={Styles.formContainer}>
            <Image 
                style={Styles.image} 
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
            <View noBorder style={Styles.details}>
                <Text style={Styles.detailText}>Forgot Password?</Text>
                <Text style={Styles.detailText}>|</Text>
                <Text 
                    style={Styles.detailText}
                    onPress={() => navigation.navigate('Register')}
                >
                    Create Account
                </Text>
            </View>
        </View>
    )
}