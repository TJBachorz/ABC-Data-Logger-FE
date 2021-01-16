import React from 'react'
import DataChart from '../Data/Components/DataChart';

import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import { NavIcon } from '../Components/Icon';
import { Styles } from '../Components/Styles';

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
                        <Button
                            type="clear"
                            icon={ <NavIcon/> }
                            onPress={() => navigation.openDrawer()}
                            buttonStyle={Styles.navButtonStyle}
                        />
                    )
                }}>

                {(props) => <DataChart 
                    incidentHistory={incidentHistory}
                    caseInfo={caseInfo} 
                    {...props}
                />}
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
