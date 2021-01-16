import React from 'react';
import { StyleSheet, View } from 'react-native';
import BigButton from './BigButton';
import { Button } from 'react-native-elements';


export default function UserPortalButtons({ navigation }) {

    return (
        <View style={styles.buttonContainer}>
            <BigButton 
                buttonText={"LOG IN"} 
                handlePress={() => navigation.navigate('Login')}
            />
            <BigButton 
                buttonText={"CREATE ACCOUNT"}
                handlePress={() => navigation.navigate('Register')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30
    }
});
