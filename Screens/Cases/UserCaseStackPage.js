import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Fontisto';

import CaseSelection from './CaseSelection';
import CreateNewCase from './CreateNewCase';
import { NavIcon } from '../Components/Icon';
import { Styles } from '../Components/Styles';

const Stack = createStackNavigator();

export default function UserCaseStackPage({ 
    setIsSignedIn,
    navigation, 
    account, 
    setAccount, 
    caseInfo,
    isNewCase,
    setIsNewCase,
    setCaseInfo
}) {

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#f8f8ff'},
        }}>

            <Stack.Screen 
                name="Case Selection Main"
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
                    
                {(props) => <CaseSelection
                    isNewCase={isNewCase}
                    setIsSignedIn={setIsSignedIn}
                    account={account}
                    setAccount={setAccount}
                    caseInfo={caseInfo}
                    setCaseInfo={setCaseInfo} 
                    navigation={navigation}
                    {...props}
                />}
            </Stack.Screen>
            <Stack.Screen 
                name="Create New Case"
                options={{ headerTitle: ""}}
            >
                {(props) => <CreateNewCase 
                    isNewCase={isNewCase}
                    setIsNewCase={setIsNewCase}
                    navigation={navigation}
                    {...props}
                />
                }
            </Stack.Screen>
        </Stack.Navigator> 
    )
}
