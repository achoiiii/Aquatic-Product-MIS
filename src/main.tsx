import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css';
import './common.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@/store';
import RouterDefender from './router/RouterDefender';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <RouterDefender>
          <App />
        </RouterDefender>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
