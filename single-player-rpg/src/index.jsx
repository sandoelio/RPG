import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import * as serviceWorker from './serviceWorker';
import UserProvider from './context/UserContext';
import App from './App';
import './index.css';
import theme from './theme';

Amplify.configure(awsExports);

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </>,
  document.getElementById('root'),
);

serviceWorker.register();
