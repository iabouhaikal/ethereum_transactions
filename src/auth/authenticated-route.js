/**
 * Created by Ibrahim Abouhaikal on 5/4/19.
 */

import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from './auth-context'

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <AuthConsumer>
      {({ isAuth }) => (
        <Route
          render={props =>
          isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
          {...rest}
        />
      )}
    </AuthConsumer>
  )

export default AuthenticatedRoute
