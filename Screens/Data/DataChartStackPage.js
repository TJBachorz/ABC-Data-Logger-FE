import React from 'react'
import DataChart from './DataChart';

import { createStackNavigator } from '@react-navigation/stack';
import { NavButton } from '../Components/Button';

const Stack = createStackNavigator();

export default function DataStackPage({ navigation, caseInfo, incidentHistory }) {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: { backgroundColor: '#f8f8ff'},
            }}
        >
            <Stack.Screen 
                name="Data"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )
            }}>
                {(props) => <DataChart 
                    incidentHistory={incidentHistory}
                    {...props}
                />}
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
