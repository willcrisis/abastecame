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

const RegisterForm = ({
  user,
  updateField,
  register,
  registerWithGoogle,
  registerWithFacebook,
  goToLogin,
}) => (
  <ImageBackground source={background} style={styles.background}>
    <Container style={styles.container}>
      <Content padder contentContainerStyle={styles.content}>
        <Form style={styles.form}>
          <View style={styles.logo}>
            <Image source={logo} />
          </View>
          <TextInput
            label={I18n.t('register.name')}
            value={user.name}
            onChangeText={updateField('name')}
          />
          <TextInput
            label={I18n.t('register.email')}
            value={user.email}
            keyboardType="email-address"
            textContentType="username"
            onChangeText={updateField('email')}
          />
          <TextInput
            label={I18n.t('register.password')}
            value={user.password}
            onChangeText={updateField('password')}
            textContentType="password"
            secureTextEntry
          />
          <TextInput
            label={I18n.t('register.confirmation')}
            value={user.confirmation}
            onChangeText={updateField('confirmation')}
            textContentType="password"
            secureTextEntry
          />
          <Text />
          <Button onPress={register} full>
            <Text>{I18n.t('actions.register')}</Text>
          </Button>
          <Text />
          <Text style={styles.enterWith}>{I18n.t('register.registerWith')}</Text>
          <Text />
          <View style={styles.socialLogin}>
            <Button danger onPress={registerWithGoogle} style={styles.socialButton} full>
              <Icon type="FontAwesome" name="google" />
              <Text>{I18n.t('social.google')}</Text>
            </Button>
            <Button info onPress={registerWithFacebook} style={styles.socialButton} full>
              <Icon type="FontAwesome" name="facebook" />
              <Text>{I18n.t('social.facebook')}</Text>
            </Button>
          </View>
          <Text />
          <Text style={styles.enterWith}>{I18n.t('register.alreadyHaveAnAccount')}</Text>
          <Text />
          <Button light onPress={goToLogin} full>
            <Text>{I18n.t('actions.login')}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  </ImageBackground>
);

export default RegisterForm;
