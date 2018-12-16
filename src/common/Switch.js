import React from 'react';
import { Switch as NativeSwitch, View, Text } from 'react-native';
import labelStyle from './Label.styles';
import switchStyle from './Switch.styles';

const Switch = ({ label, ...rest }) => (
  <View>
    <Text style={labelStyle}>{label}</Text>
    <View style={switchStyle}>
      <NativeSwitch {...rest} />
    </View>
  </View>
);

export default Switch;
