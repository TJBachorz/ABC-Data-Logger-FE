import React from 'react'
import { TextInput, View, StyleSheet, Image, Text, Modal } from 'react-native';

export default function InvalidLoginModal() {
    return (
        <View>
            <Modal
                animationType="slide"
                presentationStyle="pageSheet"
            >
                <View>
                    <Text>Invalid Signin</Text>
                    <Button
                            title={"Select Case"}
                            type="solid" 
                            buttonStyle={{
                                background: '#1761a0',
                                borderRadius: 16,
                                margin: 1,
                                height: 50,
                                width: 360,
                                marginBottom: 30,
                            }}
                            onPress={ () => {
                                navigation.navigate('Login')
                            }}
                    />
                </View>
            </Modal>
        </View>
    )
}
