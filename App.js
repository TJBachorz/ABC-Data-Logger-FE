import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image } from 'react-native';

import { Button } from 'react-native-elements';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPortalButtons from './components/UserPortalButtons';
import AppMainPage from './components/AppMainPage';
import Icon from 'react-native-vector-icons/Fontisto';


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
        <Stack.Navigator 
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f8f8ff',
            },
          }}
        >
          <Stack.Screen name="Home" options={{
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
                onPress={() => alert("you did it~")}
                buttonStyle={{
                  fontWeight: 'bold',
                  marginLeft: 20,
                  fontWeight: 200,
                  backgroundColor: '#f8f8ff',
                }}
              />
            )
          }} 
            component={AppMainPage}
          />
        </Stack.Navigator>
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
