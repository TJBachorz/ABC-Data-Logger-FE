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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';


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

function CustomDrawerContent({ navigation }) {
  return (
    <View>
      <View style={styles.drawerButton}>    
        <Button
          title="Log Out"
          style={styles.logout}
          icon={
            <Icon
                name="logout"
                size={5}
                color="#1761a0"
            />
          }
          onPress={() => {
            setIsSignedIn(!isSignedIn)
            navigation.navigate('Home');
        }}/>
      </View>
    </View>
  );
}

export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false)
  const [caseInfo, setCaseInfo] = useState({})
  
  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      { isSignedIn ? 
        <Drawer.Navigator
          overlayColor="transparent"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerStyle={{
            backgroundColor: '#f8f8ff',
            width: 350,
          }}
        >
          <Drawer.Screen 
            name="Home"
            style={styles.drawerButton} 
          >
            {(props) => <AppMainPage
              caseInfo={caseInfo}
              setCaseInfo={setCaseInfo}
              {...props} 
            />}
          </Drawer.Screen>
          <Drawer.Screen 
            name="Charts" 
          >
            {(props) => <DataChartMainPage
              caseInfo={caseInfo}
              {...props} 
            />}
          </Drawer.Screen>
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
  logout: {
    width: 100,
    height: 100,
    padding: 0,
    margin: 0,
    backgroundColor: "green"
  }
});
