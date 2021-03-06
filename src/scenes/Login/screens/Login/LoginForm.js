import React from 'react';
import { View, ImageBackground, Image } from 'react-native';
import {
  Container,
  Content,
  Form,
  Text,
  Button,
  Icon,
} from 'native-base';
import { TextInput } from '../../../../common';
import I18n from '../../../../i18n';
import styles from '../../styles/styles';
import background from '../../../../../assets/login-background.jpg';
import logo from '../../../../../assets/logo.png'

const LoginForm = ({
  email,
  password,
  updateField,
  login,
  loginWithGoogle,
  loginWithFacebook,
  goToRegister,
}) => (
  <ImageBackground source={background} style={styles.background}>
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <Form style={styles.form}>
          <View style={styles.logo}>
            <Image source={logo} />
          </View>
          <TextInput
            label={I18n.t('login.email')}
            value={email}
            keyboardType="email-address"
            textContentType="username"
            onChangeText={updateField('email')}
          />
          <TextInput
            label={I18n.t('login.password')}
            value={password}
            onChangeText={updateField('password')}
            textContentType="password"
            secureTextEntry
          />
          <Text />
          <Text style={styles.forgotPassword}>{I18n.t('login.forgotPassword')}</Text>
          <Text />
          <Button onPress={login} full>
            <Text>{I18n.t('actions.login')}</Text>
          </Button>
          <Text />
          <Text style={styles.enterWith}>{I18n.t('login.connectWith')}</Text>
          <Text />
          <View style={styles.socialLogin}>
            <Button danger onPress={loginWithGoogle} style={styles.socialButton} full>
              <Icon type="FontAwesome" name="google" />
              <Text>{I18n.t('social.google')}</Text>
            </Button>
            <Button info onPress={loginWithFacebook} style={styles.socialButton} full>
              <Icon type="FontAwesome" name="facebook" />
              <Text>{I18n.t('social.facebook')}</Text>
            </Button>
          </View>
          <Text />
          <Text style={styles.enterWith}>{I18n.t('login.dontHaveAnAccount')}</Text>
          <Text />
          <Button light onPress={goToRegister} full>
            <Text>{I18n.t('actions.register')}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  </ImageBackground>
);

export default LoginForm;
