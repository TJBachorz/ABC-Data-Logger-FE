import React from 'react'
import AccountLink from './AccountLink';

import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { NavIcon } from '../Components/Icon';
import { Styles } from '../Components/Styles';

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
                        <Button
                            type="clear"
                            icon={ <NavIcon/> }
                            onPress={() => navigation.openDrawer()}
                            buttonStyle={Styles.navButtonStyle}
                        />
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
