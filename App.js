import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import StackNav from './Screens/Navigation/StackLogic';
import combineReducers from './Store/Reducers';

export default function App() {

  const store = createStore(combineReducers)

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto"/>
          <StackNav/>
      </NavigationContainer>
    </Provider>
  );
}