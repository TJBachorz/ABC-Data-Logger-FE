import React from 'react'
import CaseSelectionMainPage from './CaseSelectionMainPage';

import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Fontisto';

const Stack = createStackNavigator();

export default function UserCaseStackPage({ navigation, caseInfo }) {
    return (
        <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f8f8ff',
                    },
                }}>

            <Stack.Screen 
                name="Case Selection Main"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Button
                            type="clear"
                            icon={
                                <Icon
                                    name="nav-icon-a"
                                    size={20}
                                    color="#1761a0"
                                />
                            }
                            onPress={() => navigation.openDrawer()}
                            buttonStyle={{
                            fontWeight: 'bold',
                            marginLeft: 20,
                            fontWeight: 200,
                            backgroundColor: '#f8f8ff',
                            }}  
                        />
                    )
                }}>
                    
                {(props) => <CaseSelectionMainPage
                        account={account}
                        setAccount={setAccount}
                        caseInfo={caseInfo}
                        setCaseInfo={setCaseInfo}
                        isSignedIn={isSignedIn} 
                        setIsSignedIn={setIsSignedIn} 
                        navigation={navigation}
                        {...props}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
