import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function UserPortalButtons({navigation}) {

    return (
        <View style={styles.buttonContainer}>
            <Button 
                type="solid" 
                title={"LOG IN"} 
                buttonStyle={{
                    background: '#4c96d7',
                    borderRadius: 16,
                    margin: 1,
                    height: 50,
                    width: 360, 
                    marginBottom: 10,
                }} 
                onPress={() => navigation.navigate('Login')}
            />
            <Button 
                type="solid" 
                title={"CREATE ACCOUNT"} 
                buttonStyle={{
                    background: '#4c96d7',
                    borderRadius: 16,
                    margin: 1,
                    height: 50,
                    width: 360,
                    marginBottom: 30,
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
