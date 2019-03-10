import React from 'react';
import { Provider } from 'react-redux';

import './config/reactotron';
import store from './store';

import Routes from './routes';

const App = () => (
  <Provider store={store} className="App">
    <Routes />
  </Provider>
);

export default App;

// console.tron.log('HW');
// console.tron.warn('HW');
