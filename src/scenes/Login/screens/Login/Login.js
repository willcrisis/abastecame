import React, { Component } from 'react';
import LoginForm from './LoginForm';

export const ROUTE_NAME = 'Login';

class Login extends Component {
  render() {
    return (
      <LoginForm />
    )
  }
};

export default Login;
