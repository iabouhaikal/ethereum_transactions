/**
 * Created by Ibrahim Abouhaikal on 5/4/19.
 */

import React from 'react'
import { Redirect } from 'react-router-dom'
import { AuthConsumer } from '../auth/auth-context'

import FormField from '../components/fields/form-field'
import {HighOrderComponent} from '../utils/component-util'

const UsernameRef = React.createRef()
const PasswordRef = React.createRef()

const UsernameField = HighOrderComponent(FormField, {
  label: 'Username',
  name: 'username',
  type: 'text',
  placeholder: 'Enter Username',
  forwardRef: UsernameRef
})

const PasswordField = HighOrderComponent(FormField, {
  label: 'Password',
  name: 'password',
  type: 'password',
  placeholder: 'Enter Password',
  forwardRef: PasswordRef
})

class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    }
  }

  login = (event, props) => {
    event.preventDefault()

    const isValidUsername = UsernameRef.current.isValidField()
    const isValidPassword = PasswordRef.current.isValidField()

    if (isValidUsername && isValidPassword) {
      props.login();
      this.setState({loggedin: true})
    } else {
      this.setState({loggedin: false})
    }
  }

  render() {
    if (this.state.loggedin) {
      return <Redirect to="/ethereum-account"/>;
    } else {
      return (
        <AuthConsumer>
          {(props) => (
            <form method="POST">
              <div className="login-screen">
                <h2 className="login-screen-title">Ethereum Account</h2>
                <div className="login-screen-body">
                  <h2 className="login-screen-body-title">User Login</h2>
                  <UsernameField/>
                  <PasswordField/>
                  <button type="submit" className="btn btn-primary btn-form btn-login"
                          onClick={(e) => this.login(e, props)}>Login
                  </button>
                </div>
              </div>
            </form>
          )}
        </AuthConsumer>
      )
    }
  }
}

export default LoginScreen
