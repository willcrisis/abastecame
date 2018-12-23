import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  viewContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    flex: 1,
  },
  odometerContainer: {
    flex: 3,
  },
  odometerText: {
    fontSize: 25,
  },
  odometerDigit: {
    width: 20,
  },
  fuelName: {
    paddingTop: 20,
  },
  fullTankIconCheck: {
    fontSize: 40,
    color: '#0c0'
  },
  fullTankIconCross: {
    fontSize: 40,
    color: '#c00'
  },
});

export default styles;
