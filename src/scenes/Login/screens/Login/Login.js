import React from 'react';
import { View, ImageBackground } from 'react-native';
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
import styles from './Login.styles';
import background from '../../../../../assets/login-background.jpg';

export const ROUTE_NAME = 'Login';

const Login = () => (
  <ImageBackground source={background} style={styles.background}>
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <Form style={styles.form}>
          <View style={styles.logo}>
            <Text>Abasteça.me</Text>
          </View>
          <TextInput
            style={styles.field}
            label={I18n.t('login.email')}
          />
          <TextInput
            label={I18n.t('login.password')}
          />
          <Text />
          <Text style={styles.forgotPassword}>{I18n.t('login.forgotPassword')}</Text>
          <Text />
          <Button onPress={() => null} full>
            <Text>{I18n.t('actions.login')}</Text>
          </Button>
          <Text />
          <Text style={styles.enterWith}>{I18n.t('login.connectWith')}</Text>
          <Text />
          <View style={styles.socialLogin}>
            <Button danger onPress={() => null} style={styles.socialButton} full>
              <Icon type="FontAwesome" name="google" />
              <Text>{I18n.t('login.google')}</Text>
            </Button>
            <Button info onPress={() => null} style={styles.socialButton} full>
              <Icon type="FontAwesome" name="facebook" />
              <Text>{I18n.t('login.facebook')}</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  </ImageBackground>
);

export default Login;
