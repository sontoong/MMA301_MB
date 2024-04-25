/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import React from 'react';
import {AxiosProvider} from './src/context/AxiosContext';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <AxiosProvider>
      <App />
    </AxiosProvider>
  </Provider>
));
