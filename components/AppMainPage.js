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

let currentDate = new Date()

const defaultDay = () => {
    const currentDay = currentDate.getDate()
    if (currentDay < 10) {
        return `0${currentDay}`
    } else {
        return `${currentDay}`
    }
}

const defaultMinutes = () => {
    const minutes = currentDate.getMinutes()
    if (minutes < 10) {
        return `0${minutes}`
    } else {
        return `${minutes}`
    }
}   

const defaultMonth = () => {
    const currentMonth = currentDate.getMonth() + 1
    if (currentMonth < 10) {
        return `0${currentMonth}`
    } else {
        return `${currentMonth}`
    }
}

const defaultHours = () => {
    let hours = currentDate.getHours()
    if (hours > 12) {
        hours -= 12
    }
    if (hours < 10) {
        return `0${hours}`
    }
    return hours
}

const Stack = createStackNavigator();

export default function AppMainPage({ caseInfo, setCaseInfo, navigation }) {

    const [incidentHistory, setIncidentHistory ] = useState([])
    const [account, setAccount] = useState({})
    const [selected, setSelected] = useState(false)
    const [incident, setIncident] = useState({})

    useEffect(() => {
        fetchCases()
        
    }, [])

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
            .then(userAccount => setAccount(userAccount))
        })
    }
    const renderCases = (account) => {
        return account.cases.map(child => {
            return {label: `${child.name}, ${child.dob}`, value: `${child.id}`}
        })
    }

    console.log(incident)

    return (
        <>
            {!selected ?
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        presentationStyle="pageSheet"
                    >
                        <View style={styles.centeredView}>
                            <Text style={styles.modalText}>Please Select a Case:</Text>
                            {account.cases ?
                                <DropDownPicker
                                    placeholder="Case"
                                    labelStyle={{fontSize: 16, color: 'black', padding: 10}}
                                    items={renderCases(account)}
                                    defaultIndex={0}
                                    containerStyle={{marginBottom: 100, marginTop: 40,height: 60, width: 200}}
                                    onChangeItem={(item) => setCaseInfo({'id': item.value})}
                                /> : <Text>No Cases</Text>}
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
                                    setSelected(!selected)
                                    if (caseInfo.id) {
                                        navigation.navigate('Home')
                                    } else {
                                        setSelected(!selected)
                                    }
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
                                    navigation.navigate('Home')
                                }}
                            />
                        </View>
                    </Modal>
                </View> : null
            }
            <Stack.Navigator 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#f8f8ff',
                    },
                }}>

                <Stack.Screen 
                    name="Home"
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
