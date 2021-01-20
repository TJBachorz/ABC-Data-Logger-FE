import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginForm from '../Home/LoginForm';
import RegisterForm from '../Home/RegisterForm';
import CreateNewCase from '../Cases/CreateNewCase';
import CaseSelection from '../Cases/CaseSelection';
import HomeLogin from '../Home/Components/HomeLogin';

const Stack = createStackNavigator();

export default function GuestStack() {
    return (
        <Stack.Navigator headerMode={"Screen"} initialRouteName="Home">
            <Stack.Screen name="Home" component={ HomeLogin }/>

            <Stack.Screen name="Login" component={ LoginForm }/>

            <Stack.Screen name="Register" component={ RegisterForm }/>

            <Stack.Screen name="Case Selection Main" component={ CaseSelection }/>

            <Stack.Screen name="Create New Case" component={ CreateNewCase }/>
        </Stack.Navigator>
    )
}