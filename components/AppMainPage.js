import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserHomePage from './UserHomePage';
import Antecedent from './Antecedent';
import Behavior from './Behavior';
import Consequence from './Consequence';
import IncidentDateTime from './IncidentDateTime';
import { View, Text, Modal, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';

const Stack = createStackNavigator()

export default function AppMainPage({navigation}) {

    const [caseInfo, setCaseInfo] = useState({})
    const [incident, setIncident] = useState({
        "antecedent": null,
        "behavior": null,
        "consequence": null,
        "year": null,
        "month": null,
        "day": null,
        "hour": null,
        "minute": null,
        "case": null
    })

    return (
        <>
            {!caseInfo.id ?
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        presentationStyle="pageSheet"
                    >
                        <View style={styles.centeredView}>
                            <Text style={styles.modalText}>Please Select a Case:</Text>
                            <DropDownPicker
                                placeholder="Case"
                                labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                                items={[
                                    {label: 'test', value: 'test'},
                                    {label: 'test', value: 'test'},
                                    {label: 'test', value: 'test'}
                                ]}
                                defaultIndex={0}
                                containerStyle={{marginBottom: 100, marginTop: 40,height: 60, width: 200}}
                                onChangeItem={(item) => setIncident({"year": item.value})}
                            />
                            <Button
                                title={"Select Case"}
                                type="solid" 
                                buttonStyle={{
                                    background: '#1761a0',
                                    borderRadius: 16,
                                    margin: 1,
                                    height: 50,
                                    width: 360,
                                    marginBottom: 30,
                                }}
                                onPress={ () => {
                                    setCaseInfo({"id": 1})
                                    navigation.navigate('Home')
                                }}
                            />
                        </View>
                    </Modal>
                </View>
                : null 
            }
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
