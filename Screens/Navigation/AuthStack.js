import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../Home/Components/DrawerContent';
import AccountLinkStackPage from '../Linking/AccountLinkStackPage';
import IncidentLogStackPage from '../Log/IncidentLogStackPage';
import DataChartStackPage from '../Data/DataChartStackPage';
import CaseStackPage from '../Cases/CaseStackPage';
import { NavButton } from '../../Components/Button';

const Drawer = createDrawerNavigator();

export default function AuthStack({
    incident,
    setIncident,
    incidentHistory,
    setIncidentHistory
}) {
    return (
        <Drawer.Navigator
            drawerContent={
                (props) => <DrawerContent
                    {...props} />
            }
            drawerStyle={{
                backgroundColor: "#1761a0",
                borderRightColor: "#f8f8ff",
                width: 350,
            }}
        >
            <Drawer.Screen name="Home">
                {(props) => <IncidentLogStackPage
                    incident={incident}
                    setIncident={setIncident}
                    incidentHistory={incidentHistory}
                    setIncidentHistory={setIncidentHistory}
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
                    {...props} 
                />}
            </Drawer.Screen>

            <Drawer.Screen name="Cases"
                component={ CaseStackPage }
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )
            }}>
            </Drawer.Screen>

            <Drawer.Screen name="Link Accounts"
                component={ AccountLinkStackPage }
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <NavButton onPress={() => navigation.openDrawer()}/>
                    )
            }}>
            </Drawer.Screen>

        </Drawer.Navigator>   
    )
}