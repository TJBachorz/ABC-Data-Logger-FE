import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

import { Button } from 'react-native-elements';
import LoginForm from './components/LoginForm';
import DataChartMainPage from './components/DataChartMainPage';
import RegisterForm from './components/RegisterForm';
import UserPortalButtons from './components/UserPortalButtons';
import AppMainPage from './components/AppMainPage';
import { createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList, 
  DrawerItem
} from '@react-navigation/drawer';

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

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [caseInfo, setCaseInfo] = useState({})
  
  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      { isSignedIn ? 
        <Drawer.Navigator
          drawerStyle={{
            backgroundColor: '#f8f8ff',
            width: 240,
          }}
        >
          <Drawer.Screen 
            name="Home" 
          >
            {(props) => <AppMainPage
              caseInfo={caseInfo}
              setCaseInfo={setCaseInfo}
              {...props} 
            />}
          </Drawer.Screen>
          {/* <Drawer.Screen 
            name="Charts" 
            component={DataChartMainPage}
          >
            {(props) => <DataChartMainPage
              caseInfo={caseInfo}
              setCaseInfo={setCaseInfo}
              {...props} 
            />}
          </Drawer.Screen> */}
        </Drawer.Navigator>
        : <Stack.Navigator headerMode={"Screen"} initialRouteName="Home">
          <Stack.Screen name="Home" options={{ title: '' }} component={HomeLogin}/>
          <Stack.Screen 
            name="Login" 
          >
            {(props) => <LoginForm
              setIsSignedIn={setIsSignedIn} 
              isSignedIn={isSignedIn}
              {...props} 
              />
            }
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <RegisterForm 
              setIsSignedIn={setIsSignedIn} 
              isSignedIn={isSignedIn}
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
  drawerStyle: {
    width: '80%'
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
  }
});
