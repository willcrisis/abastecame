import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { Toast } from 'native-base';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager , GraphRequestManager, GraphRequest } from 'react-native-fbsdk';
import I18n from '../../i18n';
import firebase from '../../firebase';
import NavigationService from '../../services/Navigation';

import LoginScreen, { ROUTE_NAME as LOGIN_ROUTE } from './screens/Login/Login';
import RegisterScreen, { ROUTE_NAME as REGISTER_ROUTE } from './screens/Register/Register';

const LoginStack = createStackNavigator(
  {
    [LOGIN_ROUTE]: LoginScreen,
    [REGISTER_ROUTE]: RegisterScreen,
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
      const { idToken, accessToken, user: { email } } = await GoogleSignin.signIn();
      const credential = firebase.authProviders.GoogleAuthProvider.credential(idToken, accessToken);
      await this.loginToFirebase(credential, email);
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

      const { email } = await this.getUserEmailFromFacebook(accessToken);

      const credential = firebase.authProviders.FacebookAuthProvider.credential(accessToken);
      await this.loginToFirebase(credential, email);
    } catch (err) {
      this.handleExternalError(err);
    }
  }

  getUserEmailFromFacebook = (accessToken) => {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      }

      const graphRequest = new GraphRequest('/me', {
        parameters: { fields: { string: 'email' } },
        accessToken,
      }, callback)

      const graphManager = new GraphRequestManager();
      graphManager.addRequest(graphRequest).start();
    });
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

  loginToFirebase = async (credential, email) => {
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
      this.handleFirebaseError(err, email);
    }
  }

  register = async ({ name, email, password }) => {
    try {
      const { user } = await firebase.auth.createUserWithEmailAndPassword(email, password);

      await this.handleUserCreation(user, name, '');
    } catch (err) {
      this.handleFirebaseError(err, email);
    }
  }

  handleExternalError = () => {
    Toast.show({
      text: I18n.t('login.genericError'),
      duration: 5000,
    });
  }

  handleFirebaseError = (err, email) => {
    const { code, message } = err;

    if (code === 'auth/account-exists-with-different-credential') {
      return this.checkOtherMethods(email, code);
    }

    const translated = I18n.t(`firebase.${code}`);
    Toast.show({
      text: translated === code ? message : translated,
      duration: 5000,
    });
  }

  checkOtherMethods = async (email, code) => {
    const methods = await firebase.auth.fetchSignInMethodsForEmail(email);
    Toast.show({
      text: I18n.t(`firebase.${code}`, methods.join(', ')),
      duration: 5000,
    });
  }

  goTo = (routeName, params) => {
    let allowNavigation = false;
    let defaultParams;

    switch (routeName) {
      case REGISTER_ROUTE:
        allowNavigation = true;
        defaultParams = {
          registerWithGoogle: this.loginOrRegisterWithGoogle,
          registerWithFacebook: this.loginOrRegisterWithFacebook,
          register: this.register,
          goToLogin: () => this.goTo(LOGIN_ROUTE),
        };
        break;
      case LOGIN_ROUTE:
        allowNavigation = true;
        break;
    }

    if (allowNavigation) {
      return NavigationService.navigate(routeName, params || defaultParams);
    }
  }

  render() {
    return (
      <LoginStack
        ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef)}
        screenProps={{
          login: this.login,
          loginWithGoogle: this.loginOrRegisterWithGoogle,
          loginWithFacebook: this.loginOrRegisterWithFacebook,
          goToRegister: () => this.goTo(REGISTER_ROUTE),
        }}
      />
    );
  }
}

export default Login;
