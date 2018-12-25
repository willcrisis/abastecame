import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    opacity: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 30,
  },
  content: {
    height: '100%',
  },
  forgotPassword: {
    textAlign: 'right',
  },
  enterWith: {
    textAlign: 'center',
  },
  socialLogin: {
    display: 'flex',
    flexDirection: 'row',
  },
  socialButton: {
    flex: 1,
  },
});

export default styles;
