import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import CaseSelection from './CaseSelection';
import CreateNewCase from './CreateNewCase';
import { openDrawerMenu } from '../../Components/ReusableFunctions';
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
                component={ CaseSelection }
                options={{
                    headerTitle: "",
                    headerLeft: () => <NavButton onPress={() => openDrawerMenu(navigation)}/>
                }}
            />

            <Stack.Screen 
                name="Create New Case"
                component={ CreateNewCase }
            />
        </Stack.Navigator> 
    )
}
