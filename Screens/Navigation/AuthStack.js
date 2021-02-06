import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from '../Home/Components/DrawerContent';
import IncidentLogStackPage from '../Log/IncidentLogStackPage';
import DataChartStackPage from '../Data/DataChartStackPage';
import CaseStackPage from '../Cases/CaseStackPage';
import AccountLinkStackPage from '../Linking/AccountLinkStackPage';
import SettingsStackPage from '../Settings/SettingsStackPage';

const Drawer = createDrawerNavigator();

export default function AuthStack() {

    return (
        <Drawer.Navigator
            drawerContent={
                (props) => <DrawerContent {...props} />
            }
            drawerStyle={{
                backgroundColor: "#1761a0",
                borderRightColor: "#f8f8ff",
                width: 350,
            }}
        >

            <Drawer.Screen name="Home" component={ IncidentLogStackPage }/>

            <Drawer.Screen name="Data" component={ DataChartStackPage }/>

            <Drawer.Screen name="Cases" component={ CaseStackPage }/>

            <Drawer.Screen name="Link Accounts" component={ AccountLinkStackPage }/>

            <Drawer.Screen name="Settings" component={ SettingsStackPage }/>

        </Drawer.Navigator>   
    )
}