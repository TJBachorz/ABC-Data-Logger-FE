import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import CaseSelection from './CaseSelection';
import CreateNewCase from './CreateNewCase';
import { NavButton } from '../../Components/Button';

const Stack = createStackNavigator();

// Header back button for new cases?

export default function CaseStackPage({ navigation }) {

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
                    {...props}
                />}
            </Stack.Screen>

            <Stack.Screen 
                name="Create New Case"
                options={{ headerTitle: ""}}
            >
                {(props) => <CreateNewCase
                    {...props}
                />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
