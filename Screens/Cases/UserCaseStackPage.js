import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import CaseSelection from './CaseSelection';
import CreateNewCase from './CreateNewCase';
import { NavButton } from '../Components/Button';

const Stack = createStackNavigator();

export default function UserCaseStackPage({ 
    navigation, 
    caseInfo,
    setCaseInfo
}) {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#f8f8ff'},
        }}>
            <Stack.Screen 
                name="Case Selection Main"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )                
            }}>
                {(props) => <CaseSelection
                    caseInfo={caseInfo}
                    setCaseInfo={setCaseInfo} 
                    navigation={navigation}
                    {...props}
                />}
            </Stack.Screen>
            <Stack.Screen 
                name="Create New Case"
                options={{ headerTitle: ""}}
            >
                {(props) => <CreateNewCase 
                    navigation={navigation}
                    {...props}
                />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
