import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPortalButtons from './components/UserPortalButtons';

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

export default function App({navigation}) {
  
  return (
    <NavigationContainer>
    <StatusBar style="auto"/>
      {
      localStorage.getItem('token') ? 
        null
        : <Stack.Navigator initialRouteName="Home log-in">
          <Stack.Screen name="Home-log-in" options={{ title: '' }} component={HomeLogin}/>
          <Stack.Screen name="Login" component={LoginForm}/>
          <Stack.Screen name="Register" component={RegisterForm}/>
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
