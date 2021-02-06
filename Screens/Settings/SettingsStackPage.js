import React from 'react';
import SettingsMain from './SettingsMain';

import { openDrawerMenu } from '../../Components/ReusableFunctions';
import { createStackNavigator } from '@react-navigation/stack';
import { NavButton } from '../../Components/Button';

const Stack = createStackNavigator();

export default function SettingsStackPage({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#f8f8ff'},
        }}>

            <Stack.Screen 
                name="Settings"
                component={ SettingsMain }
                options={{
                    headerTitle: "",
                    headerLeft: () => <NavButton onPress={() => openDrawerMenu(navigation)}/>
                }}
            >

            </Stack.Screen>
        </Stack.Navigator> 
    )
}