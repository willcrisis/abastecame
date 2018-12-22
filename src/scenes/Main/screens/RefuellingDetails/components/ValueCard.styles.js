import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    color: '#aaa',
    fontSize: 16,
  },
  label: {
    flex: 1,
    fontSize: 12,
  },
});

export default styles;
