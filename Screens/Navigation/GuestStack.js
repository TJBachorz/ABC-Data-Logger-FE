import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginForm from '../Home/LoginForm';
import RegisterForm from '../Home/RegisterForm';
import CreateNewCase from '../Cases/CreateNewCase';
import CaseSelection from '../Cases/CaseSelection';
import HomeLogin from '../Home/Components/HomeLogin';

const Stack = createStackNavigator();

export default function GuestStack({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
    isSignedIn,
    setIsSignedIn,
    isNewCase,
    setIsNewCase
}) {
    return (
        <Stack.Navigator headerMode={"Screen"} initialRouteName="Home">

            <Stack.Screen name="Home" options={{ title: '' }} component={ HomeLogin }/>

            <Stack.Screen name="Login" component={ LoginForm }/>

            <Stack.Screen name="Register" component={ RegisterForm }/>

            <Stack.Screen name="Case Selection Main">
                {(props) => <CaseSelection 
                    account={account}
                    setAccount={setAccount}
                    caseInfo={caseInfo} 
                    setCaseInfo={setCaseInfo} 
                    isSignedIn={isSignedIn}
                    setIsSignedIn={setIsSignedIn}
                    isNewCase={isNewCase}
                    {...props} 
                />}
            </Stack.Screen>

            <Stack.Screen name="Create New Case">
                {(props) => <CreateNewCase
                    isNewCase={isNewCase}
                    setIsNewCase={setIsNewCase} 
                    {...props} 
                />}
            </Stack.Screen>

        </Stack.Navigator>
    )
}