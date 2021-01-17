import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import StackNav from './Screens/Navigation/StackLogic';

// import Reducers from './components/Store/Reducers';
// import { createStore } from 'redux';
// import { Provider, useSelector } from 'react-redux';

export default function App() {

  // const store = createStore(Reducers())
  // const isSignedIn = useSelector(state => state.setIsSignedIn)

  return (
    // <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto"/>
          <StackNav/>
      </NavigationContainer>
    // </Provider>
  );
}