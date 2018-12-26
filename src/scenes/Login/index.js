import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Toast } from 'native-base';
import I18n from '../../i18n';
import firebase from '../../firebase';

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
  login = async (email, password) => {
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      const { code, message } = err;
      const translated = I18n.t(`firebase.${code}`);
      Toast.show({
        text: translated === code ? message : translated,
        duration: 5000,
      })
    }
  }

  render() {
    return (
      <LoginStack
        screenProps={{
          login: this.login
        }}
      />
    );
  }
}

export default Login;
