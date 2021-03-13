import React from 'react'
//import AuthService from './Services/AuthService'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = sessionStorage.getItem("authorization") ? true : false;
    console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute