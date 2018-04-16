import React from 'react';
import { render } from 'react-dom';
import Routes from './config/routes/routes.js';
import { Provider } from 'react-redux';
import store from './redux/redux_store';

const rootElement = document.querySelector('#root');
if (rootElement) {
  render(<Provider store={store}><Routes /></Provider>, rootElement);
}
