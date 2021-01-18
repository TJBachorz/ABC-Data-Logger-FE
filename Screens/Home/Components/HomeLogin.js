import React from 'react';
import { View, Image } from 'react-native';

import UserPortalButtons from './UserPortalButtons';
import { Styles } from '../../Components/Styles';

export default function HomeLogin({ navigation }) {
    return (
        <>
            <View style={Styles.homePageContainer}>
                <Image 
                    style={Styles.image} 
                    source={require('../../../assets/abc_logo_update.png')}
                />
            </View>
            <UserPortalButtons navigation={navigation}/>
        </>
    )
}