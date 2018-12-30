import React, { Component } from 'react';
import { Toast } from 'native-base';
import { required } from '../../../../common/validation'
import I18n from '../../../../i18n';
import LoginForm from './LoginForm';

export const ROUTE_NAME = 'Login';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  updateField = field => value =>
    this.setState({ [field]: value });

  login = () => {
    const { email, password } = this.state;
    const { isValid, failures } = required({ email, password }, ['email', 'password']);
    if (!isValid) {
      Toast.show({
        text: I18n.t('validation.required', failures.map(field => I18n.t(`login.${field}`)).join(', ')),
        duration: 5000,
      })
      return;
    }

    const { login } = this.props.screenProps;
    return login(email, password);
  }

  render() {
    const { email, password } = this.state;
    const {
      loginWithGoogle,
      loginWithFacebook,
      goToRegister
    } = this.props.screenProps;
    return (
      <LoginForm
        email={email}
        password={password}
        updateField={this.updateField}
        login={this.login}
        loginWithGoogle={loginWithGoogle}
        loginWithFacebook={loginWithFacebook}
        goToRegister={goToRegister}
      />
    )
  }
};

export default Login;
