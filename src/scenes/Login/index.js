import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Toast } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
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
  constructor(props) {
    super(props);
    this.usersRef = firebase.firestore.collection('users');
  }

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

  loginOrRegisterWithGoogle = async () => {
    const { idToken, accessToken } = await GoogleSignin.signIn();
    const credential = firebase.authProviders.GoogleAuthProvider.credential(idToken, accessToken);
    const { user, additionalUserInfo: {
      isNewUser,
      profile: {
        name,
        picture,
      },
    } } = await firebase.auth.signInWithCredential(credential);
    if (isNewUser) {
      await this.handleUserCreation(user, name, picture);
    }
  }

  handleUserCreation = (user, displayName, photoUrl) => {
    return Promise.all([
      this.usersRef.doc(user.uid).set({
        vehicles: [],
      }),
      user.updateProfile({
        displayName,
        photoUrl,
      })
    ]);
  }

  render() {
    return (
      <LoginStack
        screenProps={{
          login: this.login,
          loginOrRegisterWithGoogle: this.loginOrRegisterWithGoogle,
        }}
      />
    );
  }
}

export default Login;
