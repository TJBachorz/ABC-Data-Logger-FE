import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import UserPortalButtons from './UserPortalButtons';

export default function HomeLogin({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <Image 
                    style={styles.image} 
                    source={require('../../../assets/abc_logo_update.png')}
                />
            </View>
            <UserPortalButtons navigation={navigation}/>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 250,
        width: 250,
    },
})