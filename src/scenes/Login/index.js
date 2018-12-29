import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Toast } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
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
  }

  login = async (email, password) => {
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      this.handleFirebaseError(err);
    }
  }

  loginOrRegisterWithGoogle = async () => {
    try {
      const { idToken, accessToken } = await GoogleSignin.signIn();
      const credential = firebase.authProviders.GoogleAuthProvider.credential(idToken, accessToken);
      await this.loginToFirebase(credential);
    } catch (err) {
      this.handleExternalError(err);
    }
  }

  loginOrRegisterWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        return;
      }

      const { accessToken } = await AccessToken.getCurrentAccessToken();
      const credential = firebase.authProviders.FacebookAuthProvider.credential(accessToken);
      await this.loginToFirebase(credential);
    } catch (err) {
      this.handleExternalError(err);
    }
  }

  handleUserCreation = (user, displayName, photoUrl) => {
    return Promise.all([
      firebase.firestore.collection('users').doc(user.uid).set({
        vehicles: [],
      }),
      user.updateProfile({
        displayName,
        photoUrl,
      })
    ]);
  }

  loginToFirebase = async (credential) => {
    try {
      const { user, additionalUserInfo: {
        isNewUser,
        profile: {
          name = '',
          picture = '',
        } = {},
      } } = await firebase.auth.signInWithCredential(credential);
      if (isNewUser) {
        await this.handleUserCreation(user, name, picture);
      }
    } catch (err) {
      this.handleFirebaseError(err);
    }
  }

  handleExternalError = err => {
    Toast.show({
      text: I18n.t('login.genericError'),
      duration: 5000,
    });
  }

  handleFirebaseError = err => {
    const { code, message } = err;
    const translated = I18n.t(`firebase.${code}`);
    Toast.show({
      text: translated === code ? message : translated,
      duration: 5000,
    });
  }

  render() {
    return (
      <LoginStack
        screenProps={{
          login: this.login,
          loginOrRegisterWithGoogle: this.loginOrRegisterWithGoogle,
          loginOrRegisterWithFacebook: this.loginOrRegisterWithFacebook,
        }}
      />
    );
  }
}

export default Login;
