import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../Home/Components/DrawerContent';
import AccountLinkStackPage from '../Linking/AccountLinkStackPage';
import AppMainStackPage from '../Home/AppMainStackPage';
import DataChartStackPage from '../Data/DataChartStackPage';
import UserCaseStackPage from '../Cases/UserCaseStackPage';
import { NavButton } from '../Components/Button';

const Drawer = createDrawerNavigator();

export default function AuthStack({
    account,
    setAccount,
    caseInfo,
    setCaseInfo,
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