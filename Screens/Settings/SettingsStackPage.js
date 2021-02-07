import React from 'react';
import SettingsMainMenu from './SettingsMainMenu';

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
                component={ SettingsMainMenu }
                options={{
                    headerTitle: "",
                    headerLeft: () => <NavButton onPress={() => openDrawerMenu(navigation)}/>
                }}
            >

            </Stack.Screen>
        </Stack.Navigator> 
    )
}