import React from 'react';
import { AuthConsumer } from '../../auth/auth-context'

import logo from './logo.png';
import './styles.css';

export default () => (
  <header>
    <AuthConsumer>
      {({ isAuth, login, logout }) => (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="navbar-container">
            <img src={logo} className="logo" alt="logo"/>
            <span className="title">Ethereum</span>
            {isAuth &&
              <a href="javascript:void(0)" className="logout" onClick={logout}>Logout</a>
            }
          </div>
        </nav>
      )}
    </AuthConsumer>
  </header>
)

