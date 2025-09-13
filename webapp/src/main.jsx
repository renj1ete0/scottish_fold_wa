import React from 'react';
import ReactDOM from 'react-dom/client';
import document from 'global/document';
import Modal from 'react-modal';
import {Provider} from 'react-redux';
import store from './store';
import App from './app';
import Analytics from './analytics/page'

Modal.setAppElement('#root');

const Root = () => (
  <Provider store={store}>
    <Analytics />
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Root />);