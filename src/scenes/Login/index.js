import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen, { ROUTE_NAME as LOGIN_ROUTE } from './screens/Login/Login';

const LoginStack = createStackNavigator(
  {
    [LOGIN_ROUTE]: LoginScreen,
  },
  {
    initialRouteName: LOGIN_ROUTE,
    headerMode: 'none',
  },
);

class Login extends Component {
  render() {
    return (
      <LoginStack />
    );
  }
}

export default Login;
