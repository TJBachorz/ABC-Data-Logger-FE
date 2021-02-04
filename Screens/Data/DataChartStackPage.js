import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import DataChart from './DataChart';
import { openDrawerMenu } from '../../Components/ReusableFunctions';
import { NavButton } from '../../Components/Button';

const Stack = createStackNavigator();

export default function DataStackPage({ navigation }) {

    const incidentHistory = useSelector(state => state.incidentHistory)

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
                    headerLeft: () => <NavButton onPress={() => openDrawerMenu(navigation)}/>
            }}>
                {(props) => <DataChart 
                    incidentHistory={incidentHistory}
                    {...props}
                />}
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
