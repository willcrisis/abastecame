import React, { Component } from 'react';
import { Toast } from 'native-base';
import { required } from '../../../../common/validation'
import I18n from '../../../../i18n';
import RegisterForm from './RegisterForm';

export const ROUTE_NAME = 'Register';

class Register extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      confirmation: '',
    },
  };

  updateField = field => value =>
    this.setState(({ user }) => ({
      user: {
        ...user,
        [field]: value
      }
    }));

  register = () => {
    const { user } = this.state;
    const { isValid, failures } = required(user, [
      'name',
      'email',
      'password',
      'confirmation',
    ]);
    if (!isValid) {
      Toast.show({
        text: I18n.t('validation.required', failures.map(field => I18n.t(`register.${field}`)).join(', ')),
        duration: 5000,
      })
      return;
    }
    if (user.password !== user.confirmation) {
      Toast.show({
        text: I18n.t('register.passwordsMustMatch'),
        duration: 5000,
      })
      return;
    }

    const register = this.props.navigation.getParam('register');
    return register(user);
  }

  render() {
    const { user } = this.state;
    const registerWithGoogle = this.props.navigation.getParam('registerWithGoogle');
    const registerWithFacebook = this.props.navigation.getParam('registerWithFacebook');
    const goToLogin = this.props.navigation.getParam('goToLogin');
    return (
      <RegisterForm
        user={user}
        updateField={this.updateField}
        registerWithGoogle={registerWithGoogle}
        registerWithFacebook={registerWithFacebook}
        register={this.register}
        goToLogin={goToLogin}
      />
    )
  }
}

export default Register;
