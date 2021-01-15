import React from 'react'
import CaseSelection from '../CaseSelection';
import CreateNewCase from '../CreateNewCase';

import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Fontisto';

const Stack = createStackNavigator();

export default function UserCaseStackPage({ 
    isSignedIn,
    setIsSignedIn,
    navigation, 
    account, 
    setAccount, 
    caseInfo,
    isNewCase,
    setIsNewCase,
    setCaseInfo
}) {

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
                    
                {(props) => <CaseSelection
                        isNewCase={isNewCase}
                        isSignedIn={isSignedIn}
                        setIsSignedIn={setIsSignedIn}
                        account={account}
                        setAccount={setAccount}
                        caseInfo={caseInfo}
                        setCaseInfo={setCaseInfo} 
                        navigation={navigation}
                        {...props}
                    />
                }
            </Stack.Screen>
            <Stack.Screen 
                name="Create New Case"
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
                    
                {(props) => <CreateNewCase 
                        isNewCase={isNewCase}
                        setIsNewCase={setIsNewCase}
                        navigation={navigation}
                        {...props}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
