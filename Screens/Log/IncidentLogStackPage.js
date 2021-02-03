import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { openDrawerMenu } from '../../Components/ReusableFunctions';
import IncidentHistory from './IncidentHistory';
import Antecedent from './Antecedent';
import Behavior from './Behavior';
import Consequence from './Consequence';
import IncidentDateTime from './IncidentDateTime';
import { NavButton } from '../../Components/Button';

const Stack = createStackNavigator();

export default function IncidentLogStackPage({ navigation }) {

    const incident = useSelector(state => state.incident)
    const incidentHistory = useSelector(state => state.incidentHistory)

    const dispatch = useDispatch()

    const setIncident = (value) => {
        dispatch({type: "CHANGE_INCIDENT", payload: value})
    }

    const setIncidentHistory = (value) => {
        dispatch({type: "RESET_INCIDENT_HISTORY", payload: value})
    }

    return (
        <>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: '#f8f8ff'},
            }}>
                    
                <Stack.Screen name="Incident History"
                    options={{
                        headerTitle: "",
                        headerLeft: () => <NavButton onPress={() => openDrawerMenu(navigation)}/>
                }}>
                    {(props) => <IncidentHistory 
                            incidentHistory={incidentHistory}
                            setIncidentHistory={setIncidentHistory}
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="Antecedent"
                    options={{ headerTitle: "" }}
                >
                    {(props) => <Antecedent  
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
