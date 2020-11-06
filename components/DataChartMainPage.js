import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserHomePage from './UserHomePage';
import Antecedent from './Antecedent';
import Behavior from './Behavior';
import Consequence from './Consequence';
import IncidentDateTime from './IncidentDateTime';
import { View, Text, Modal, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, 
    DrawerContentScrollView, 
    DrawerItemList, 
    DrawerItem,
} from '@react-navigation/drawer';
import DataChart from './DataChart';
import Icon from 'react-native-vector-icons/Fontisto';

const Stack = createStackNavigator();

export default function DataChartMainPage({navigation, caseInfo}) {
    return (
        <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f8f8ff',
                    },
                }}>

            <Stack.Screen 
                name="Charts"
                options={{
                    headerTitle: "",
                    headerLeft: () => (
                        <Button
                            type="clear"
                            icon={
                                <Icon
                                    name="nav-icon-a"
                                    size={20}
                                    color="#1761a0"
                                />
                            }
                            onPress={() => navigation.openDrawer()}
                            buttonStyle={{
                            fontWeight: 'bold',
                            marginLeft: 20,
                            fontWeight: 200,
                            backgroundColor: '#f8f8ff',
                            }}  
                        />
                    )
                }}>
                {(props) => <DataChart 
                        caseInfo={caseInfo} 
                        {...props}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
