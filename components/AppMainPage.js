import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserHomePage from './UserHomePage';
import Antecedent from './Antecedent';
import Behavior from './Behavior';
import Consequence from './Consequence';
import IncidentDateTime from './IncidentDateTime';


const Stack = createStackNavigator()

export default function AppMainPage() {

    const [caseInfo, setCaseInfo] = useState({})
    const [incident, setIncident] = useState({
        "antecedent": null,
        "behavior": null,
        "consequence": null,
        "date": null,
        "time": null,
        "case": null
    })

    return (
        <Stack.Navigator 
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f8f8ff',
                },
            }}
        >
            <Stack.Screen name="Home">
                {(props) => <UserHomePage 
                        setCaseInfo={setCaseInfo} 
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
                        {...props}
                    />
                }
            </Stack.Screen>
        </Stack.Navigator>
    )
}
