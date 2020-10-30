import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
// import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPortalButtons from './components/UserPortalButtons';

const Stack = createStackNavigator();


function HomeLogin() {
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image 
          style={styles.image} 
          source={require('./assets/abc_logo_update.png')}
        />
      </View>
      <UserPortalButtons/>
    </>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home log-in">
        <Stack.Screen name="Home log-in" component={HomeLogin}/>
        <Stack.Screen name="Login Form" component={LoginForm}/>
        <Stack.Screen name="Register Form" component={RegisterForm}/>
      </Stack.Navigator>
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
