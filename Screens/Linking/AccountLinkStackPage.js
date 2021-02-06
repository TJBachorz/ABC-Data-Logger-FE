import React from 'react'
import AccountLink from './AccountLink';

import { openDrawerMenu } from '../../Components/ReusableFunctions';
import { createStackNavigator } from '@react-navigation/stack';
import { NavButton } from '../../Components/Button';

const Stack = createStackNavigator();

export default function AccountLinkStackPage({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#f8f8ff'},
        }}>

            <Stack.Screen 
                name="Link Accounts"
                component={ AccountLink }
                options={{
                    headerTitle: "",
                    headerLeft: () => <NavButton onPress={() => openDrawerMenu(navigation)}/>
                }}
            >

            </Stack.Screen>
        </Stack.Navigator> 
    )
}
