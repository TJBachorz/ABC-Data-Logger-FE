import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginForm from './Screens/Home/LoginForm';
import RegisterForm from './Screens/Home/RegisterForm';
import CreateNewCase from './Screens/Cases/CreateNewCase';
import CaseSelection from './Screens/Cases/CaseSelection';
import HomeLogin from './Screens/Home/Components/HomeLogin';
import DrawerContent from './Screens/Home/Components/DrawerContent';
import AccountLinkStackPage from './Screens/Linking/AccountLinkStackPage';
import AppMainStackPage from './Screens/Home/AppMainStackPage';
import DataChartStackPage from './Screens/Data/DataChartStackPage';
import UserCaseStackPage from './Screens/Cases/UserCaseStackPage';
import { NavButton } from './Screens/Components/Button';
import { Styles } from './Screens/Components/Styles';

// import Reducers from './components/Store/Reducers';
// import { createStore } from 'redux';
// import { Provider, useSelector } from 'react-redux';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {

  // const store = createStore(Reducers())
  // const isSignedIn = useSelector(state => state.setIsSignedIn)

  const [account, setAccount] = useState({})
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [caseInfo, setCaseInfo] = useState({})
  const [incidentHistory, setIncidentHistory] = useState([])
  const [incident, setIncident] = useState({})
  const [isNewCase, setIsNewCase] = useState(false)

  return (
    // <Provider store={store}>
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
            <Drawer.Screen name="Home">
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
                  <NavButton onPress={() => navigation.openDrawer()}/>
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
                  <NavButton onPress={() => navigation.openDrawer()}/>
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
                  <NavButton onPress={() => navigation.openDrawer()}/>
                )
            }}>
              {(props) => <AccountLinkStackPage
                account={account}
                {...props} 
              />}
            </Drawer.Screen>

          </Drawer.Navigator>
          : <Stack.Navigator headerMode={"Screen"} initialRouteName="Home">

            <Stack.Screen name="Home" options={{ title: '' }} component={ HomeLogin }/>

            <Stack.Screen name="Login" component={ LoginForm }/>

            <Stack.Screen name="Register" component={ RegisterForm }/>

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
              />}
            </Stack.Screen>

            <Stack.Screen name="Create New Case">
              {(props) => <CreateNewCase
                isNewCase={isNewCase}
                setIsNewCase={setIsNewCase} 
                {...props} 
              />}
            </Stack.Screen>

          </Stack.Navigator>
        }
      </NavigationContainer>
    // </Provider>
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
  buttonStyle: {
    fontWeight: 'bold',
    marginLeft: 20,
    fontWeight: '200',
    backgroundColor: '#f8f8ff',
  }
});
