import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

import UserHomePage from './UserHomePage';
import Antecedent from '../Log/Antecedent';
import Behavior from '../Log/Behavior';
import Consequence from '../Log/Consequence';
import IncidentDateTime from '../Log/IncidentDateTime';
import { NavIcon } from '../Components/Icon';
import { Styles } from '../Components/Styles';

const Stack = createStackNavigator();

export default function AppMainStackPage({ 
    caseInfo, 
    navigation, 
    incident, 
    setIncident, 
    incidentHistory, 
    setIncidentHistory 
}) {

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: '#f8f8ff'},
            }}>
                    
                <Stack.Screen 
                    name="Incident History"
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
                    {(props) => <UserHomePage 
                            incidentHistory={incidentHistory}
                            setIncidentHistory={setIncidentHistory}
                            caseInfo={caseInfo} 
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="Antecedent"
                    options={{ headerTitle: "" }}
                >
                    {(props) => <Antecedent  
                            caseInfo={caseInfo} 
                            incident={incident}
                            setIncident={setIncident}
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="Behavior"
                    options={{ headerTitle: "" }}
                >
                    {(props) => <Behavior  
                            caseInfo={caseInfo} 
                            incident={incident}
                            setIncident={setIncident}
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="Consequence"
                    options={{ headerTitle: "" }}
                >
                    {(props) => <Consequence  
                            caseInfo={caseInfo} 
                            incident={incident}
                            setIncident={setIncident}
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="IncidentDateTime"
                    options={{ headerTitle: "" }}
                >
                    {(props) => <IncidentDateTime  
                            caseInfo={caseInfo} 
                            incident={incident}
                            setIncident={setIncident}
                            incidentHistory={incidentHistory}
                            setIncidentHistory={setIncidentHistory}
                            {...props}
                        />
                    }
                </Stack.Screen>

            </Stack.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalText: {
        fontSize: 24,
        marginBottom: 20
    }
})
