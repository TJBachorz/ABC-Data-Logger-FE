import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserHomePage from './UserHomePage';
import Antecedent from './Antecedent';
import Behavior from './Behavior';
import Consequence from './Consequence';
import IncidentDateTime from './IncidentDateTime';
import { StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Fontisto';

const Stack = createStackNavigator();

export default function AppMainPage({ caseInfo, navigation }) {

    const [incidentHistory, setIncidentHistory ] = useState([])
    const [incident, setIncident] = useState({})

    return (
        <>
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f8f8ff',
                    },
                }}>
                    
                
                <Stack.Screen 
                    name="Incident History"
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
                    {(props) => <UserHomePage 
                            incidentHistory={incidentHistory}
                            setIncidentHistory={setIncidentHistory}
                            caseInfo={caseInfo} 
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="Antecedent">
                    {(props) => <Antecedent  
                            caseInfo={caseInfo} 
                            incident={incident}
                            setIncident={setIncident}
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="Behavior">
                    {(props) => <Behavior  
                            caseInfo={caseInfo} 
                            incident={incident}
                            setIncident={setIncident}
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="Consequence">
                    {(props) => <Consequence  
                            caseInfo={caseInfo} 
                            incident={incident}
                            setIncident={setIncident}
                            {...props}
                        />
                    }
                </Stack.Screen>

                <Stack.Screen name="IncidentDateTime">
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
