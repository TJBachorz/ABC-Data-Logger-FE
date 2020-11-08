import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginForm from './components/LoginForm';
import DrawerContent from './components/DrawerContent';
import CaseSelection from './components/CaseSelection';
import DataChartMainPage from './components/DataChartMainPage';
import RegisterForm from './components/RegisterForm';
import UserPortalButtons from './components/UserPortalButtons';
import AppMainPage from './components/AppMainPage';
import UserCaseMainPage from './components/UserCaseMainPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeLogin({navigation}) {
  return (
    <>
      <View style={styles.container}>
        <Image 
          style={styles.image} 
          source={require('./assets/abc_logo_update.png')}
          />
      </View>
      <UserPortalButtons navigation={navigation}/>
    </>
  )
}

export default function App() {

  const [account, setAccount] = useState({})
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [caseInfo, setCaseInfo] = useState({})
  const [incidentHistory, setIncidentHistory ] = useState([])
  const [incident, setIncident] = useState({})

  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      { isSignedIn && caseInfo.id ? 
        <Drawer.Navigator
          drawerContent={
            (props) => <DrawerContent 
              setIsSignedIn={setIsSignedIn}
              isSignedIn={isSignedIn} 
              caseInfo={caseInfo} 
              {...props} />
          }
          drawerStyle={{
            backgroundColor: "#1761a0",
            borderRightColor: "#f8f8ff",
            width: 350,
          }}
        >
          <Drawer.Screen 
            name="Home"
          >
            {(props) => <AppMainPage
              incident={incident}
              setIncident={setIncident}
              incidentHistory={incidentHistory}
              setIncidentHistory={setIncidentHistory}
              caseInfo={caseInfo}
              {...props} 
            />}
          </Drawer.Screen>

          <Drawer.Screen name="Charts"
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
            {(props) => <DataChartMainPage
              incidentHistory={incidentHistory}
              caseInfo={caseInfo}
              {...props} 
            />}
          </Drawer.Screen>

          <Drawer.Screen name="Cases"
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
            {(props) => <UserCaseMainPage
              caseInfo={caseInfo}
              {...props} 
            />}
          </Drawer.Screen>

        </Drawer.Navigator>
        : <Stack.Navigator headerMode={"Screen"} initialRouteName="Home">

          <Stack.Screen name="Home" options={{ title: '' }} component={HomeLogin}/>

          <Stack.Screen name="Login" component={LoginForm}/>

          <Stack.Screen name="Register" component={RegisterForm}/>

          <Stack.Screen name="Case Selection">
            {(props) => <CaseSelection 
              caseInfo={caseInfo} 
              setCaseInfo={setCaseInfo} 
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn} 
              account={account}
              setAccount={setAccount}
              {...props} 
              />
            }
          </Stack.Screen>

        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerButton: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    bottom: '90%'
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
  },
});
