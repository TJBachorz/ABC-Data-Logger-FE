import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPortalButtons from './components/UserPortalButtons';
import CreateNewCase from './components/CreateNewCase';
import CaseSelection from './components/CaseSelection';

import DrawerContent from './components/DrawerContent';
import AccountLinkStackPage from './components/AccountLinkStackPage';
import AppMainStackPage from './components/AppMainStackPage';
import DataChartStackPage from './components/DataChartStackPage';
import UserCaseStackPage from './components/UserCaseStackPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, LogBox } from 'react-native';
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

  // LogBox.ignoreAllLogs();

  const [account, setAccount] = useState({})
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [caseInfo, setCaseInfo] = useState({})
  const [incidentHistory, setIncidentHistory] = useState([])
  const [incident, setIncident] = useState({})
  const [isNewCase, setIsNewCase] = useState(false)

  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      { isSignedIn && caseInfo.id ? 
        <Drawer.Navigator
          drawerContent={
            (props) => <DrawerContent
              setAccount={setAccount}
              caseInfo={caseInfo} 
              setCaseInfo={setCaseInfo}
              isSignedIn={isSignedIn} 
              setIsSignedIn={setIsSignedIn}
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
            {(props) => <AppMainStackPage
              incident={incident}
              setIncident={setIncident}
              incidentHistory={incidentHistory}
              setIncidentHistory={setIncidentHistory}
              caseInfo={caseInfo}
              {...props} 
            />}
          </Drawer.Screen>

          <Drawer.Screen name="Data"
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
            {(props) => <DataChartStackPage
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
            {(props) => <UserCaseStackPage
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
              account={account}
              setAccount={setAccount}
              caseInfo={caseInfo}
              setCaseInfo={setCaseInfo}
              isNewCase={isNewCase} 
              setIsNewCase={setIsNewCase}
              {...props} 
            />}
          </Drawer.Screen>

          <Drawer.Screen name="Link Accounts"
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
            {(props) => <AccountLinkStackPage
              account={account}
              {...props} 
            />}
          </Drawer.Screen>

        </Drawer.Navigator>
        : <Stack.Navigator headerMode={"Screen"} initialRouteName="Home">

          <Stack.Screen name="Home" options={{ title: '' }} component={HomeLogin}/>

          <Stack.Screen name="Login" component={LoginForm}/>

          <Stack.Screen name="Register" component={RegisterForm}/>

          <Stack.Screen name="Case Selection Main">
            {(props) => <CaseSelection 
              account={account}
              setAccount={setAccount}
              caseInfo={caseInfo} 
              setCaseInfo={setCaseInfo} 
              isSignedIn={isSignedIn}
              setIsSignedIn={setIsSignedIn}
              isNewCase={isNewCase}
              {...props} 
              />
            }
          </Stack.Screen>

          <Stack.Screen name="Create New Case">
            {(props) => <CreateNewCase
              isNewCase={isNewCase}
              setIsNewCase={setIsNewCase} 
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
