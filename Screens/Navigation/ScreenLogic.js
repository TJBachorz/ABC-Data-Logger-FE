import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginForm from '../Home/LoginForm';
import RegisterForm from '../Home/RegisterForm';
import CreateNewCase from '../Cases/CreateNewCase';
import CaseSelection from '../Cases/CaseSelection';
import HomeLogin from '../Home/Components/HomeLogin';
import DrawerContent from '../Home/Components/DrawerContent';
import AccountLinkStackPage from '../Linking/AccountLinkStackPage';
import AppMainStackPage from '../Home/AppMainStackPage';
import DataChartStackPage from '../Data/DataChartStackPage';
import UserCaseStackPage from '../Cases/UserCaseStackPage';
import { NavButton } from '../Components/Button';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function AuthStack({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
    isSignedIn,
    setIsSignedIn,
    incident,
    setIncident,
    incidentHistory,
    setIncidentHistory,
    isNewCase,
    setIsNewCase
}) {
    return (
        <Drawer.Navigator
            drawerContent={
                (props) => <DrawerContent
                    setAccount={setAccount}
                    caseInfo={caseInfo} 
                    setCaseInfo={setCaseInfo}
                    isSignedIn={isSignedIn} 
                    setIsSignedIn={setIsSignedIn}
                    {...props} />
            }
            drawerStyle={{
                backgroundColor: "#1761a0",
                borderRightColor: "#f8f8ff",
                width: 350,
            }}
        >
            <Drawer.Screen name="Home">
                {(props) => <AppMainStackPage
                    incident={incident}
                    setIncident={setIncident}
                    incidentHistory={incidentHistory}
                    setIncidentHistory={setIncidentHistory}
                    caseInfo={caseInfo}
                    {...props} 
                />}
            </Drawer.Screen>

            <Drawer.Screen name="Data"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )
            }}>
                {(props) => <DataChartStackPage
                    incidentHistory={incidentHistory}
                    caseInfo={caseInfo}
                    {...props} 
                />}
            </Drawer.Screen>

            <Drawer.Screen name="Cases"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )
            }}>
                {(props) => <UserCaseStackPage
                    isSignedIn={isSignedIn}
                    setIsSignedIn={setIsSignedIn}
                    account={account}
                    setAccount={setAccount}
                    caseInfo={caseInfo}
                    setCaseInfo={setCaseInfo}
                    isNewCase={isNewCase} 
                    setIsNewCase={setIsNewCase}
                    {...props} 
                />}
            </Drawer.Screen>

            <Drawer.Screen name="Link Accounts"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )
            }}>
                {(props) => <AccountLinkStackPage
                    account={account}
                    {...props} 
                />}
            </Drawer.Screen>

        </Drawer.Navigator>   
    )
}

const GuestStack = ({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
    isSignedIn,
    setIsSignedIn,
    isNewCase,
    setIsNewCase
}) => {
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

export default function StackNav() {

    const [account, setAccount] = useState({})
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [caseInfo, setCaseInfo] = useState({})
    const [incidentHistory, setIncidentHistory] = useState([])
    const [incident, setIncident] = useState({})
    const [isNewCase, setIsNewCase] = useState(false)
    
    const signInCheck = () => isSignedIn ? "AUTH" : "GUEST"

    const navigator = {

        "AUTH": <AuthStack
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
            account={account}
            setAccount={setAccount}
            caseInfo={caseInfo}
            setCaseInfo={setCaseInfo}
            isNewCase={isNewCase} 
            setIsNewCase={setIsNewCase}
            incident={incident}
            setIncident={setIncident}
            incidentHistory={incidentHistory}
            setIncidentHistory={setIncidentHistory}
        />,
        "GUEST": <GuestStack
            account={account}
            setAccount={setAccount}
            caseInfo={caseInfo} 
            setCaseInfo={setCaseInfo} 
            isSignedIn={isSignedIn}
            setIsSignedIn={setIsSignedIn}
            isNewCase={isNewCase}
            setIsNewCase={setIsNewCase}
        />
    }

    return (
        <>
            {navigator[signInCheck()]}
        </>
    )
}