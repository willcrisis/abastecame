import React from 'react';
import { Switch as NativeSwitch, View, Text } from 'react-native';

const Switch = ({ label, ...rest }) => (
  <View>
    <Text>{label}</Text>
    <NativeSwitch {...rest} />
  </View>
);

export default Switch;
