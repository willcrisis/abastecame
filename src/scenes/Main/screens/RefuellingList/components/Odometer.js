import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import styles from './Odometer.styles';

const Odometer = ({ value, style }) => (
  <View style={[style, styles.container]}>
    {[...value.toString()].map((digit, index) => (
      <View key={index} style={styles.digit}>
        <Text style={styles.text}>
        {digit}
      </Text>
      </View>
    ))}
  </View>
);

export default Odometer;
