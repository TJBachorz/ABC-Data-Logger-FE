import React from 'react';
import { TextInput, View, StyleSheet, Image, Text } from 'react-native';
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
                placeholder="Email"
                placeholderTextColor="#f8f8ff"
            />
            <TextInput 
                secureTextEntry={true} 
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#f8f8ff"
            />
            <Button 
                type="solid" 
                title={"LOG IN"} 
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
            <View noBorder style={styles.details}>
                <Text style={styles.detailText}>Forgot Password?</Text>
                <Text style={styles.detailText}>|</Text>
                <Text style={styles.detailText}>Create Account</Text>
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
        boxShadow: '2px 2px black',
        color: '#f8f8ff'
    },
});

{/* <Formik
        initialValues={{
            firstName: '',
            lastName: '',
            email: '',
        }}
        onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
        }}
        >
        <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="Jane" />

            <label htmlFor="lastName">Last Name</label>
            <Field id="lastName" name="lastName" placeholder="Doe" />

            <label htmlFor="email">Email</label>
            <Field
            id="email"
            name="email"
            placeholder="jane@acme.com"
            type="email"
            />
            <button type="submit">Submit</button>
        </Form>
    </Formik> */}