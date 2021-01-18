import React from 'react';
import { View, Image, Text } from 'react-native';
import { Formik } from 'formik';

import { noAuthFetch } from '../Components/FetchList';
import { authorizeUser } from '../Components/DateFunctions';
import { Styles } from '../Components/Styles';
import TextInputField from '../Components/TextInputField';
import { BigButton } from '../Components/Button';

export default function LoginForm({ navigation }) {

    const loginUser = ({ email, password }) => {
        const user = { email, password }
        noAuthFetch("login", "POST", user)
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
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInputField
                            secure={true}
                            placeholder="Password"
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