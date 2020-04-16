/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Route from './src/route/Route';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};
export default App;
