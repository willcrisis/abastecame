import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    padding: 10
  },
  day: {
    fontWeight: 'bold',
  },
  month: {
    textTransform: 'uppercase',
    color: '#f00',
    fontSize: 10,
  },
  year: {
    color: '#555',
    fontSize: 10,
  }
});

export default styles;
