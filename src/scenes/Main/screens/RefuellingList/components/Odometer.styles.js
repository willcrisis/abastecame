import { StyleSheet } from 'react-native';
import { hidden } from 'ansi-colors';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  digit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 1,
    marginRight: 1,
    padding: 2,
    width: 15,
    borderRadius: 2,
    backgroundColor: '#4c4c4c',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default styles;
