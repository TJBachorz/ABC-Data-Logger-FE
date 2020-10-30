import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function UserPortalButtons({navigation}) {
    return (
        <View style={styles.buttonContainer}>
            <Button 
                type="solid" 
                title={"LOG IN"} 
                buttonStyle={{
                    background: 'linear-gradient(45deg, #4c96d7 30%, #1761a0 90%)',
                    borderRadius: 16,
                    margin: 1,
                    height: 50,
                    width: 360, 
                    marginBottom: 10,
                    boxShadow: '2px 2px black',

                }} 
                onPress={() => navigation.navigate('Login')}
            />
            <Button 
                type="solid" 
                title={"CREATE ACCOUNT"} 
                buttonStyle={{
                    background: 'linear-gradient(45deg, #4c96d7 30%, #1761a0 90%)',
                    borderRadius: 16,
                    margin: 1,
                    height: 50,
                    width: 360,
                    marginBottom: 30,
                    boxShadow: '2px 2px black'
                }} 
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#f8f8ff',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
