/**
 * Created by Ibrahim Abouhaikal on 5/4/19.
 */

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthProvider } from '../auth/auth-context'
import AuthenticatedRoute from '../auth/authenticated-route'

import Header from '../components/header/header'
import LoginScreen from './login-screen'
import EthereumAccount from './ethereum-account'

import './styles.css';

const App = () => (
  <div>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Switch>
          <Route path="/" component={LoginScreen} exact />
          <AuthenticatedRoute path="/ethereum-account/" component={EthereumAccount} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  </div>
)

export default App;