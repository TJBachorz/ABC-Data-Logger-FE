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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, 
    DrawerContentScrollView, 
    DrawerItemList, 
    DrawerItem
} from '@react-navigation/drawer';
import DataChart from './DataChart';
// import MyDrawer from './MyDrawer';


const Stack = createStackNavigator();

export default function AppMainPage({isSignedIn, setIsSignedIn, navigation}) {

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

    const renderCases = ({cases}) => {
        return cases.map(child => {
            return {label: `${child.name}, ${child.dob}`, value: `${child.id}`}
        })
    }
    
    const fetchCases = () => {
        AsyncStorage.getItem("token").then(token => {
            fetch("http://localhost:8000/accounts/", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(response => response.json())
                .then(accounts => console.log(renderCases(accounts)))
        })
    }


    return (
        <>
            {!caseInfo.id ?
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        presentationStyle="pageSheet"
                    >
                        <View style={styles.centeredView}>
                            <Text style={styles.modalText} onPress={fetchCases}>Please Select a Case:</Text>
                            <DropDownPicker
                                placeholder="Case"
                                defaultValue={null}
                                labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                                items={[{label: "33", value: '343'}]}
                                defaultIndex={0}
                                containerStyle={{marginBottom: 100, marginTop: 40,height: 60, width: 200}}
                                onChangeItem={(item) => setCaseInfo({'id': item.value})}
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
                            <Button
                                title={"Create New Case"}
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
