import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPortalButtons from './components/UserPortalButtons';
import UserHomePage from './components/UserHomePage';
import { TransitionSpecs } from '@react-navigation/stack';

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
  
  return (
    <NavigationContainer>
      <StatusBar style="auto"/>
      { isSignedIn ? 
        <Stack.Navigator>
          <Stack.Screen name="Home" component={UserHomePage}/>
        </Stack.Navigator>
        : <Stack.Navigator headerMode={"Screen"} initialRouteName="Home log-in">
          <Stack.Screen name="Home" options={{ title: '' }} component={HomeLogin}/>
          <Stack.Screen 
            name="Login" 
          >
            {(props) => <LoginForm setIsSignedIn={setIsSignedIn} {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Register">
            {(props) => <RegisterForm setIsSignedIn={setIsSignedIn} {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
