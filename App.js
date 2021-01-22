import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';

import StackNav from './Screens/Navigation/StackLogic';
import combineReducers from './Store/Reducers';

export default function App() {

  // const sagaMiddleware = createSagaMiddleware();
  // const middleware = [sagaMiddleware];

  const store = createStore(
    combineReducers,
    // composeWithDevTools(applyMiddleware(...middleware)),
  );

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto"/>
          <StackNav/>
      </NavigationContainer>
    </Provider>
  );
}