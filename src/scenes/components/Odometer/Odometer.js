import React from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import styles from './Odometer.styles';

const Odometer = ({ value, style, textStyle, digitStyle }) => (
  <View style={[styles.container, style]}>
    {[...value.toString()].map((digit, index) => (
      <View key={index} style={[styles.digit, digitStyle]}>
        <Text style={[styles.text, textStyle]}>
        {digit}
      </Text>
      </View>
    ))}
  </View>
);

export default Odometer;
