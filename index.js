// index.js

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App'; 
import { name as appName } from './app.json';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./reducers/cartSlice"
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
