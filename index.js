/**
 * @format
 */
import React, { useRef, useState, useEffect } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store from './store';
import { Provider } from 'react-redux';
import messaging from '@react-native-firebase/messaging';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
const MyApp = () => {
    return (<Provider Provider store={store} >
        <App />
    </Provider>
    );

};
AppRegistry.registerComponent(appName, () => MyApp);
