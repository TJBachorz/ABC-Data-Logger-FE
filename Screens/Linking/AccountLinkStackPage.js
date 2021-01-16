import React from 'react'
import AccountLink from './AccountLink';

import { createStackNavigator } from '@react-navigation/stack';
import { NavButton } from '../Components/Button';

const Stack = createStackNavigator();

export default function AccountLinkStackPage({ navigation, account }) {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#f8f8ff'},
        }}>

            <Stack.Screen 
                name="Link Accounts"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )
            }}>

                {(props) => <AccountLink 
                        account={account} 
                        {...props}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
